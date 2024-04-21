package ro.simavi.sphinx.id.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.simavi.sphinx.id.model.IDResponse;
import ro.simavi.sphinx.id.services.impl.StatusImpl;

import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
@RestController
@RequestMapping("status")
public class StatusController extends SpringBootServletInitializer {

    @Autowired
    StatusImpl statusImpl;

    @CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity<IDResponse> create(@RequestBody Map<String, Object> payload) {
        IDResponse response = new IDResponse();

        if(payload.get("alertid").toString().length()>0 && payload.get("email").toString().length() > 0 && payload.get("lastValue").toString().length() > 0 && payload.get("updatedValue").toString().length() > 0 && payload.get("timestamp").toString().length() > 0){
            if(statusImpl.create(Integer.parseInt(payload.get("alertid").toString()), payload.get("email").toString(), payload.get("lastValue").toString(), payload.get("updatedValue").toString(), payload.get("timestamp").toString())){
                response.setMessage("Status saved");
            } else {
                response.setMessage("Status could not be saved");
            }
        } else {
            response.setMessage("Fields missing");
        }
        return ResponseEntity.ok().body(response);
    }

}
