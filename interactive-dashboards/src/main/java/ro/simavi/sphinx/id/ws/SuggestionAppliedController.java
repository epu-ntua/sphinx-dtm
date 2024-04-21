package ro.simavi.sphinx.id.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.simavi.sphinx.id.exception.CustomException;
import ro.simavi.sphinx.id.jpa.repositories.AlertRepository;
import ro.simavi.sphinx.id.model.IDResponse;
import ro.simavi.sphinx.id.model.SuggestionApplied;
import ro.simavi.sphinx.id.services.impl.AlertServiceImpl;
import ro.simavi.sphinx.id.services.impl.SuggestionAppliedImpl;

import java.util.ArrayList;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
@RestController
@RequestMapping("suggestion")
public class SuggestionAppliedController extends SpringBootServletInitializer {

    @Autowired
    SuggestionAppliedImpl suggestionApplied;

    @CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity<IDResponse> create(@RequestBody ArrayList<Map<String, Object>> payload) {
        IDResponse response = new IDResponse();
        ArrayList<SuggestionApplied> suggestions = new ArrayList<>();
        int countCheck = 0;

        // Checkings
        for (Map<String, Object> suggestion : payload) {
            suggestionApplied.checkCreate(suggestion);
            SuggestionApplied tempSuggestion = new SuggestionApplied(suggestion.get("alertSrc").toString(), suggestion.get("dssAlert").toString(), suggestion.get("suggestion").toString(), suggestion.get("timestamp").toString());
            suggestions.add(tempSuggestion);
        }

        // Send to database
        for (SuggestionApplied suggestion : suggestions) {
            if (suggestionApplied.create(suggestion.getAlertSrc(), suggestion.getDssAlert(), suggestion.getSuggestion(), suggestion.getTimestamp())) {
                countCheck++;
            }
        }

        if (countCheck == payload.size()) {
            response.setMessage("All suggestions were saved");
        } else {
            response.setMessage("Some suggestions could not be saved");
        }

        return ResponseEntity.ok().body(response);
    }

    @CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity<IDResponse> delete(@RequestBody Map<String, Object> payload) {
        IDResponse response = new IDResponse();
        int countCheck = 0;

        // Checkings
        suggestionApplied.checkDelete(payload);

        if (suggestionApplied.delete(payload.get("alertSrc").toString(), payload.get("dssAlert").toString())) {
            response.setMessage("Suggestion deleted");
        } else {
            response.setMessage("Suggestion could not be deleted");
        }

        return ResponseEntity.ok().body(response);
    }

}
