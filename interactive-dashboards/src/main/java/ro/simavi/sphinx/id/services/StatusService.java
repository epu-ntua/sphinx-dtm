package ro.simavi.sphinx.id.services;

public interface StatusService {
    boolean create(Integer alertId, String email, String lastValue, String updatedValue, String timestamp);
}
