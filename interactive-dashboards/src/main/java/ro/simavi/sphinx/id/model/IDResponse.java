package ro.simavi.sphinx.id.model;

public class IDResponse {

    private String message;

    public IDResponse(String message) {
        this.message = message;
    }

    public IDResponse() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
