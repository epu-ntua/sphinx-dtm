package ro.simavi.sphinx.id.model;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;


@Entity
@Table(name = "\"kafka_ID_ALERTS\"", schema = "sphinx")
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "\"DESCRIPTION\"")
    private String DESCRIPTION;

    @Column(name = "\"TIMESTAMP\"")
    private String TIMESTAMP;

    @Column(name = "\"LOCATION\"")
    private String LOCATION;

    @Column(name = "\"INDICATION\"")
    private String INDICATION;

    @Column(name = "\"TOOL\"")
    private String TOOL;

    @Column(name = "\"STATUS\"")
    private String STATUS;

    @Column(name = "\"ACTION\"")
    private String ACTION;

    @Column(name = "\"DETAILS\"")
    private String DETAILS;

    @Column(name = "\"SENT\"")
    private String SENT;

    @Column(name = "\"ALERTID\"")
    private String ALERTID;


    public Alert() {
    }

    public Alert(String DESCRIPTION, String TIMESTAMP, String LOCATION, String INDICATION, String TOOL, String STATUS, String ACTION, String DETAILS, String SENT, int id, String ALERTID) {
        this.DESCRIPTION = DESCRIPTION;
        this.TIMESTAMP = TIMESTAMP;
        this.LOCATION = LOCATION;
        this.INDICATION = INDICATION;
        this.TOOL = TOOL;
        this.STATUS = STATUS;
        this.ACTION = ACTION;
        this.DETAILS = DETAILS;
        this.SENT = SENT;
        this.id = id;
        this.ALERTID = ALERTID;
    }

    public String getTOOL() {
        return TOOL;
    }

    public void setTOOL(String TOOL) {
        this.TOOL = TOOL;
    }

    public String getDETAILS() {
        return DETAILS;
    }

    public void setDETAILS(String DETAILS) {
        this.DETAILS = DETAILS;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDESCRIPTION() {
        return DESCRIPTION;
    }

    public void setDESCRIPTION(String DESCRIPTION) {
        this.DESCRIPTION = DESCRIPTION;
    }

    public String getTIMESTAMP() {
        return TIMESTAMP;
    }

    public void setTIMESTAMP(String TIMESTAMP) {
        this.TIMESTAMP = TIMESTAMP;
    }

    public String getLOCATION() {
        return LOCATION;
    }

    public void setLOCATION(String LOCATION) {
        this.LOCATION = LOCATION;
    }

    public String getINDICATION() {
        return INDICATION;
    }

    public void setINDICATION(String INDICATION) {
        this.INDICATION = INDICATION;
    }

    public String getACTION() {
        return ACTION;
    }

    public void setACTION(String ACTION) {
        this.ACTION = ACTION;
    }

    public String getSTATUS() {
        return STATUS;
    }

    public void setSTATUS(String STATUS) {
        this.STATUS = STATUS;
    }

    public String getSENT() {
        return SENT;
    }

    public void setSENT(String SENT) {
        this.SENT = SENT;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getALERTID() {
        return ALERTID;
    }

    public void setALERTID(String ALERTID) {
        this.ALERTID = ALERTID;
    }

    @Override
    public String toString() {
        return
                "<tr style=\"background-color: #f2f2f2; border: 1px solid black;\"> <td style=\"padding: 15px;\">" +
                        DESCRIPTION + "</td><td style=\"padding: 15px;\">" +
                        TIMESTAMP + "</td><td style=\"padding: 15px;\">" +
                        LOCATION + "</td><td style=\"padding: 15px;\">" +
                        TOOL + "</td><td style=\"padding: 15px;\">" +
                        INDICATION + "</td><td style=\"padding: 15px;\">" +
                        ACTION + "</td></tr>";
    }
}
