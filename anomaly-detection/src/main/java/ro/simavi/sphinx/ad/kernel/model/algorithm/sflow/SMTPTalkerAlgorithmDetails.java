package ro.simavi.sphinx.ad.kernel.model.algorithm.sflow;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ro.simavi.sphinx.ad.kernel.model.algorithm.SFlowAlgorithmDetails;

@Getter
@Setter
@ToString
public class SMTPTalkerAlgorithmDetails extends SFlowAlgorithmDetails {

    private String hostname;

    private String bytesUp;

    private String bytesDown;

    private String numberPkts;

    private String connections;

    private String stringFlows;

    public SMTPTalkerAlgorithmDetails(String hostname, String bytesUp, String bytesDown, String numberPkts, String stringFlows, String connections){
        super("SMTPTalker_sflow");
        setHostname(hostname);
        setBytesUp(bytesUp);
        setBytesDown(bytesDown);
        setNumberPkts(numberPkts);
        setStringFlows(stringFlows);
        setConnections(connections);
    }

}
