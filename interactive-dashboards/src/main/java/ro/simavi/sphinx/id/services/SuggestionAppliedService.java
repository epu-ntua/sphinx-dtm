package ro.simavi.sphinx.id.services;

public interface SuggestionAppliedService {
    boolean create(String alertSrc, String dssAlert, String suggestion, String timestamp);
    boolean delete(String alertSrc, String dssAlert);
}
