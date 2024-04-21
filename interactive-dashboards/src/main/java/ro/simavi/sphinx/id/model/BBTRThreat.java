package ro.simavi.sphinx.id.model;

public class BBTRThreat {

    private String key;
    private String assetId;
    private String assetIp;
    private String assetType;
    private String assetValue;
    private String recordId;
    private String reliability;
    private String sourceHospitalId;
    private String threatDescription;
    private String threatId;
    private String threatPriority;
    private String threatTimestamp;

    public BBTRThreat() {}

    public BBTRThreat(String key, String assetId, String assetIp, String assetType, String assetValue, String recordId, String reliability, String sourceHospitalId, String threatDescription, String threatId, String threatPriority, String threatTimestamp) {
        this.key = key;
        this.assetId = assetId;
        this.assetIp = assetIp;
        this.assetType = assetType;
        this.assetValue = assetValue;
        this.recordId = recordId;
        this.reliability = reliability;
        this.sourceHospitalId = sourceHospitalId;
        this.threatDescription = threatDescription;
        this.threatId = threatId;
        this.threatPriority = threatPriority;
        this.threatTimestamp = threatTimestamp;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getAssetId() {
        return assetId;
    }

    public void setAssetId(String assetId) {
        this.assetId = assetId;
    }

    public String getAssetIp() {
        return assetIp;
    }

    public void setAssetIp(String assetIp) {
        this.assetIp = assetIp;
    }

    public String getAssetType() {
        return assetType;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType;
    }

    public String getAssetValue() {
        return assetValue;
    }

    public void setAssetValue(String assetValue) {
        this.assetValue = assetValue;
    }

    public String getRecordId() {
        return recordId;
    }

    public void setRecordId(String recordId) {
        this.recordId = recordId;
    }

    public String getReliability() {
        return reliability;
    }

    public void setReliability(String reliability) {
        this.reliability = reliability;
    }

    public String getSourceHospitalId() {
        return sourceHospitalId;
    }

    public void setSourceHospitalId(String sourceHospitalId) {
        this.sourceHospitalId = sourceHospitalId;
    }

    public String getThreatDescription() {
        return threatDescription;
    }

    public void setThreatDescription(String threatDescription) {
        this.threatDescription = threatDescription;
    }

    public String getThreatId() {
        return threatId;
    }

    public void setThreatId(String threatId) {
        this.threatId = threatId;
    }

    public String getThreatPriority() {
        return threatPriority;
    }

    public void setThreatPriority(String threatPriority) {
        this.threatPriority = threatPriority;
    }

    public String getThreatTimestamp() {
        return threatTimestamp;
    }

    public void setThreatTimestamp(String threatTimestamp) {
        this.threatTimestamp = threatTimestamp;
    }

    @Override
    public String toString() {
        return "BBTRThreat{" +
                "key='" + key + '\'' +
                ", assetId='" + assetId + '\'' +
                ", assetIp='" + assetIp + '\'' +
                ", assetType='" + assetType + '\'' +
                ", assetValue='" + assetValue + '\'' +
                ", recordId='" + recordId + '\'' +
                ", reliability='" + reliability + '\'' +
                ", sourceHospitalId='" + sourceHospitalId + '\'' +
                ", threatDescription='" + threatDescription + '\'' +
                ", threatId='" + threatId + '\'' +
                ", threatPriority='" + threatPriority + '\'' +
                ", threatTimestamp='" + threatTimestamp + '\'' +
                '}';
    }
}
