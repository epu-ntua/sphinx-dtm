package ro.simavi.sphinx.id.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.simavi.sphinx.id.exception.CustomException;
import ro.simavi.sphinx.id.jpa.repositories.AlertRepository;
import ro.simavi.sphinx.id.model.Alert;
import ro.simavi.sphinx.id.model.IDResponse;
import ro.simavi.sphinx.id.services.impl.AlertServiceImpl;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
@RestController
@RequestMapping("alert")
public class AlertController extends SpringBootServletInitializer {

    @Autowired
    AlertServiceImpl alertServiceImpl;

    @Autowired
    AlertRepository alertRepository;

    @CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity<IDResponse> update(@RequestBody Map<String, Object> payload) {
        IDResponse response = new IDResponse();
        String checkOrigin = payload.get("origin").toString();
        if (checkOrigin.equals("Grafana")) {
            String status = payload.get("status").toString();
            Integer id = Integer.parseInt(payload.get("id").toString());
            if(alertServiceImpl.updateAlert(status, id)){
                response.setMessage("Alert updated!");
            }
            else {
                response.setMessage("Alert could not be updated!");
            }
        }
        else {
            response.setMessage("Access denied!");
        }
        return ResponseEntity.ok().body(response);
    }

    @CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
    @RequestMapping(value = "/updateTimestamp", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity<IDResponse> updateTimestamp(@RequestBody Map<String, Object> payload) {
        IDResponse response = new IDResponse();
        String checkOrigin = payload.get("origin").toString();
        if (checkOrigin.equals("Grafana")) {
            String timestamp = payload.get("timestamp").toString();
            Integer id = Integer.parseInt(payload.get("id").toString());
            if(alertServiceImpl.updateAlertTimestamp(timestamp, id)){
                response.setMessage("Alert updated!");
            }
            else {
                response.setMessage("Alert could not be updated!");
            }
        }
        else {
            response.setMessage("Access denied!");
        }
        return ResponseEntity.ok().body(response);
    }

    @CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
    @RequestMapping(value = "/get-alerts", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.CREATED)
    public List<Alert> getAlerts(@RequestBody Map<String, String> payload) {
        return alertServiceImpl.getAlerts();
    }

    public List<Alert> getNewAlerts() {
        return alertServiceImpl.getAlerts();
    }

    public void updateAlerts(List<Alert> alerts) {
        for (Alert alert : alerts) {
            System.out.println("CONTROLLER " + alert.toString());
            alertServiceImpl.sentToEmail(alert);
        }
    }

    @CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
    @RequestMapping(value = "/testdata", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void testData(@RequestHeader Map<String, String> headers) {
        headers.forEach((key, value) -> {
            System.out.println(String.format("Header '%s' = %s", key, value));
        });;
    }

}
