package ro.simavi.sphinx.id.model;

import javax.persistence.*;

@Entity
@Table(name = "suggestions_applied", schema = "sphinx")
public class SuggestionApplied {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "alert_src_id")
    private String alertSrc;

    @Column(name = "dss_alert_id")
    private String dssAlert;

    @Column(name = "suggestion_applied")
    private String suggestion;

    @Column(name = "timestamp")
    private String timestamp;

    public SuggestionApplied() {
    }

    public SuggestionApplied(String alertSrc, String dssAlert, String suggestion, String timestamp) {
        this.alertSrc = alertSrc;
        this.dssAlert = dssAlert;
        this.suggestion = suggestion;
        this.timestamp = timestamp;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAlertSrc() {
        return alertSrc;
    }

    public void setAlertSrc(String alertSrc) {
        this.alertSrc = alertSrc;
    }

    public String getDssAlert() {
        return dssAlert;
    }

    public void setDssAlert(String dssAlert) {
        this.dssAlert = dssAlert;
    }

    public String getSuggestion() {
        return suggestion;
    }

    public void setSuggestion(String suggestion) {
        this.suggestion = suggestion;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "SuggestionApplied{" +
                "id=" + id +
                ", alertSrc='" + alertSrc + '\'' +
                ", dssAlert='" + dssAlert + '\'' +
                ", suggestion='" + suggestion + '\'' +
                ", timestamp='" + timestamp + '\'' +
                '}';
    }
}
