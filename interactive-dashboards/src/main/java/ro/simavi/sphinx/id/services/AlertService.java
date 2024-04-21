package ro.simavi.sphinx.id.services;

import ro.simavi.sphinx.id.model.Alert;

public interface AlertService {
    boolean updateAlert(String status, Integer id);
    boolean updateAlertTimestamp(String timestamp, Integer id);

    void sentToEmail(Alert alert);
}
