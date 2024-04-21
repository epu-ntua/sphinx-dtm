package ro.simavi.sphinx.id.jpa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import ro.simavi.sphinx.id.model.Alert;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Integer> {
    List<Alert> findAllBySENT(String send);

    Alert getAlertById(Integer id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE sphinx.\"kafka_ID_ALERTS\" SET \"SENT\" = true WHERE id = :alertId",nativeQuery = true)
    void sentToEmail(@Param("alertId") int alertId);

}
