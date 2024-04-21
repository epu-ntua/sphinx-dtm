package ro.simavi.sphinx.id.jpa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.simavi.sphinx.id.model.SuggestionApplied;

public interface SuggestionAppliedRepository extends JpaRepository<SuggestionApplied, Integer> {
    SuggestionApplied getSuggestionAppliedByid(Integer id);
    SuggestionApplied getSuggestionAppliedByAlertSrcAndDssAlert(String alertSrc, String dssAlert);
}
