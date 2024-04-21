package ro.simavi.sphinx.id.jpa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.simavi.sphinx.id.model.Status;

public interface StatusRepository extends JpaRepository<Status, Integer> {
    Status getStatusById(Integer id);
    Status getStatusByAlertIdAndEmailAndLastValueAndUpdatedValueAndTimestamp(Integer alertId, String email, String lastValue, String updatedValue, String timestamp);
}
