package ro.simavi.sphinx.id.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.simavi.sphinx.id.jpa.repositories.AlertRepository;
import ro.simavi.sphinx.id.model.Alert;
import ro.simavi.sphinx.id.services.AlertService;

import java.util.List;

@Service
public class AlertServiceImpl implements AlertService {

    @Autowired
    AlertRepository alertRepository;

    @Override
    public boolean updateAlert(String status, Integer id) {
        Alert alert = alertRepository.getOne(id);
        alert.setSTATUS(status);
        alertRepository.save(alert);
        return alertRepository.getAlertById(id).getSTATUS().equals(status);
    }

    @Override
    public boolean updateAlertTimestamp(String timestamp, Integer id) {
        Alert alert = alertRepository.getOne(id);
        alert.setTIMESTAMP(timestamp);
        alertRepository.save(alert);
        return alertRepository.getAlertById(id).getTIMESTAMP().equals(timestamp);
    }

    @Override
    public void sentToEmail(Alert alert) {
        System.out.println("SERVICE " + alert.toString());
        alertRepository.sentToEmail(alert.getId());
    }

    public List<Alert> getAlerts() {
        List<Alert> alerts;
        alerts = alertRepository.findAllBySENT("false");
        return alerts;
    }

}
