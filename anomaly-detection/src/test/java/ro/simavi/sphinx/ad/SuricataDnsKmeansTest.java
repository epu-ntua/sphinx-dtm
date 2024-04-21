package ro.simavi.sphinx.ad;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ro.simavi.sphinx.ad.dpi.test.DataSet;
import ro.simavi.sphinx.ad.dpi.test.DataSetUtil;
import ro.simavi.sphinx.ad.handlers.SaveToListAlertHandler;
import ro.simavi.sphinx.ad.kernel.enums.MLAgorithm;
import ro.simavi.sphinx.ad.kernel.hbase.AdmlHBaseRDD;
import ro.simavi.sphinx.ad.kernel.util.AdmlAlgorithm;

import java.util.Date;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SuricataDnsKmeansTest {

    @Autowired
    private AdmlAlgorithm admlAlgorithm;

    @Test
    public void dnsKmennsMean(){
        long start = new Date().getTime();

        boolean justRunAlgorithm = false;

        if (!justRunAlgorithm) {
            // prepare dates
            DataSetUtil.mergeFlows(DataSet.CTU_Normal_4_only_DNS_SURICATA, DataSet.CTU_Malware_Capture_Botnet_45_SURICATA, DataSet.CTU_Normal_4_only_DNS_SURICATA);

            // clear hbase
            AdmlHBaseRDD admlHBaseRDD = AdmlHBaseRDD.getInstance();
            if (!admlHBaseRDD.isOk()) {
                return;
            }
            admlHBaseRDD.truncateAdmlFlows("adml_flows");

            // read from merge file and save in hbase
            DataSetUtil.saveMergeFlowsToHBase(DataSet.CTU_Normal_4_only_DNS_SURICATA);
        }

        // run dns kmeans
//        admlAlgorithm.setAgorithms(new MLAgorithm[]{MLAgorithm.KMEANS_DNS});
//        admlAlgorithm.setTest(Boolean.TRUE);
//        admlAlgorithm.execute(new SaveToListAlertHandler(),Boolean.TRUE);

        long end = new Date().getTime();
        System.out.println("Time:"+(end-start));
    }
}
