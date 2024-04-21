package ro.simavi.sphinx.dtm.manager.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import ro.simavi.sphinx.dtm.model.ProcessModel;
import ro.simavi.sphinx.dtm.model.ToolModel;
import ro.simavi.sphinx.dtm.model.ToolProcessStatusModel;
import ro.simavi.sphinx.dtm.services.ToolCollectorService;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class SuricataOneProcessImpl extends ToolProcessAbstract {

    private static final Logger logger = LoggerFactory.getLogger(SuricataOneProcessImpl.class);

    private String error;

    private String info;

    private boolean starting = false;

    boolean tryAgain = false;

    public List<ProcessModel> processModelList;

    public SuricataOneProcessImpl(ToolCollectorService tsharkCollectorService, ToolModel toolModel, List<ProcessModel> processModelList){
        super(tsharkCollectorService, toolModel);
        this.processModelList = processModelList;
    }

    public List<ProcessModel> getProcessModelList(){
        return processModelList;
    }

    @Override
    protected String collectInputStreamProcess() {
        try {
            StringBuilder inputStreamStringBuilder = new StringBuilder();
            BufferedReader br = new BufferedReader(new InputStreamReader(getProcess().getInputStream()), 1);
            String line = null;
            while (this.starting && (line = br.readLine()) != null) {
                inputStreamStringBuilder.append(line + "<br/>");
                this.info = inputStreamStringBuilder.toString();
                logger.info("[suricata]/[info]:" + line);
                if (this.info.contains("running in SYSTEM mode")) {
                    this.starting = false;
                }
            }
            this.starting = false;
            this.info = inputStreamStringBuilder.toString();
            //logger.info("[suricata]/[command]:" + getCommandAndArgs().toString() + " " + info);
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return this.info;
    }

    @Override
    protected String collectErrorStreamProcess() {
        try {
            StringBuilder stringBuilder = new StringBuilder();
            BufferedReader br = new BufferedReader(new InputStreamReader(getProcess().getErrorStream()), 1);
            String line = null;
            while ((line = br.readLine()) != null) {
                stringBuilder.append(line+"<br/>");
                logger.error("[suricata]/[error]:"+line);
                String ip = getIP(line);
                if (ip!=null){
                    this.tryAgain = true;
                    deactivateIP(ip, processModelList);
                    logger.error("[suricata]/[deactivate]:"+ip + " and try again!");
                }
            }
            this.error = stringBuilder.toString();
            //logger.error("[suricata]/[error]:"+error);
        } catch(Exception e){
            logger.error("[suricata]/[error]:"+e.getMessage());
        }
        return this.error;
    }

    public void collectProcess() throws IOException {
        this.starting = true;
        this.info = null;
        this.error = null;

        this.tryAgain = false;

        collectInputStreamProcess();
        collectErrorStreamProcess();

        if (this.tryAgain){
            this.starting = true;
            // try again
            logger.info("[suricata]/[try again]");
            this.initAndStartProcess();
        }

        this.starting = false;
    }

    private void deactivateIP(String ip, List<ProcessModel> processModelList){
        for(ProcessModel processModel: processModelList){
            if (("/"+ip).equals(processModel.getInterfaceName())){
                processModel.setActive(Boolean.FALSE);
            }
        }
    }

    private String getIP(String line){
        String marker = "failed to find a pcap device for IP";
        if (line!=null && line.contains(marker)){
            String ip = line.substring(line.indexOf(marker)+marker.length()).trim();
            return ip;
        }
        return null;
    }

    protected List<String> getCommandAndArgs(){

        List<String> commandAndArgs = new ArrayList<>();

        String command = getToolModel().getPath() + File.separator + "suricata";
        commandAndArgs.add(command);
        commandAndArgs.add("-l");

        commandAndArgs.add(getToolModel().getProperties().get("log"));
        commandAndArgs.add("-c");
        commandAndArgs.add(getToolModel().getProperties().get("yaml"));

        /* multiple -i arguments, and capturing on multiple interfaces at once*/
        /* ex:
                suricata -l c:\tools\Suricata\log -c c:\tools\Suricata\Suricata.yaml -i 192.168.56.1 -i 192.168.1.6
                suricata -l c:\tools\Suricata\log -c c:\tools\Suricata\Suricata.yaml -i 192.168.56.1 -i 192.168.1.6 -i 172.17.93.49 -i 172.18.32.1 -i 172.18.252.213 -i 169.254.210.119
         */

        for(ProcessModel processModel: processModelList) {
            if (processModel.getActive() && processModel.getEnabled()) {
                String interfaceName = processModel.getInterfaceName();
                commandAndArgs.add("-i");
                /*
                9/7/2021 -- 17:19:07 - - translated 172.18.252.159 to pcap device \Device\NPF_{FC51F805-8104-456F-95F7-58214DDCDF40}
                9/7/2021 -- 17:19:08 - - translated 172.31.64.1 to pcap device \Device\NPF_{11079A9B-2020-43F1-8BF8-E9E0B8EF98E0}
                9/7/2021 -- 17:19:08 - - translated 192.168.1.8 to pcap device \Device\NPF_{05F38A86-2E62-4ACF-A1FF-80D5CE84914D}

                 */
                //commandAndArgs.add("\\Device\\NPF_{05F38A86-2E62-4ACF-A1FF-80D5CE84914D}");
                commandAndArgs.add(interfaceName);
                String excludeIP = getToolModel().getProperties().get("excludeIP");

                if(!excludeIP.equals("")){
                    commandAndArgs.add("-v");
                    commandAndArgs.add(excludeIP);
                }

                logger.info("Command suricata + " + commandAndArgs );
            }
        }


        return commandAndArgs;

    }

    @Override
    public ToolProcessStatusModel statusProcess() {
        String info = StringUtils.isEmpty(this.error) ?this.info:this.error;
        if (starting){
            info = "Starting...";
        }
        ProcessModel processModel = new ProcessModel();
        processModel.setPid(1L);
        return new ToolProcessStatusModel(
                getProcess()!=null?getProcess().isAlive():false,
                0,
                info,
                null,
                this.processModelList,
                this.starting);
    }
}
