package ro.simavi.sphinx.id.model;

import javax.persistence.*;

@Entity
@Table(name = "alerts_status_history", schema = "sphinx")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "alert_id")
    private Integer alertId;

    @Column(name = "email")
    private String email;

    @Column(name = "lastValue")
    private String lastValue;

    @Column(name = "updatedValue")
    private String updatedValue;

    @Column(name = "timestamp")
    private String timestamp;

    public Status(Integer alertId, String email, String lastValue, String updatedValue, String timestamp) {
        this.alertId = alertId;
        this.email = email;
        this.lastValue = lastValue;
        this.updatedValue = updatedValue;
        this.timestamp = timestamp;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAlertId() {
        return alertId;
    }

    public void setAlertId(Integer alertId) {
        this.alertId = alertId;
    }

    public String getLastValue() {
        return lastValue;
    }

    public void setLastValue(String lastValue) {
        this.lastValue = lastValue;
    }

    public String getUpdatedValue() {
        return updatedValue;
    }

    public void setUpdatedValue(String updatedValue) {
        this.updatedValue = updatedValue;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
