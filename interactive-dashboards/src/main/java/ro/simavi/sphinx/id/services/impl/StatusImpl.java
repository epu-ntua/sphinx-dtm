package ro.simavi.sphinx.id.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.simavi.sphinx.id.jpa.repositories.StatusRepository;
import ro.simavi.sphinx.id.model.Status;
import ro.simavi.sphinx.id.services.StatusService;

@Service
public class StatusImpl implements StatusService {
    @Autowired
    StatusRepository statusRepository;

    @Override
    public boolean create(Integer alertId, String email, String lastValue, String updatedValue, String timestamp) {
        Status status = new Status(alertId, email, lastValue, updatedValue, timestamp);
        if (statusRepository.getStatusByAlertIdAndEmailAndLastValueAndUpdatedValueAndTimestamp(alertId, email, lastValue, updatedValue, timestamp) == null) {
            statusRepository.save(status);
            return statusRepository.getStatusByAlertIdAndEmailAndLastValueAndUpdatedValueAndTimestamp(alertId, email, lastValue, updatedValue, timestamp) != null;
        } else {
            return false;
        }
    }
}
