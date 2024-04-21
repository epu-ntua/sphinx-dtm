package ro.simavi.sphinx.id.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.simavi.sphinx.id.exception.CustomException;
import ro.simavi.sphinx.id.jpa.repositories.SuggestionAppliedRepository;
import ro.simavi.sphinx.id.model.SuggestionApplied;
import ro.simavi.sphinx.id.services.SuggestionAppliedService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Map;

@Service
public class SuggestionAppliedImpl implements SuggestionAppliedService {

    @Autowired
    SuggestionAppliedRepository suggestionAppliedRepository;

    @Override
    public boolean create(String alertSrc, String dssAlert, String suggestion, String timestamp) {
        SuggestionApplied suggestionApplied = new SuggestionApplied(alertSrc, dssAlert, suggestion, timestamp);
        if (suggestionAppliedRepository.getSuggestionAppliedByAlertSrcAndDssAlert(alertSrc, dssAlert) == null) {
            suggestionAppliedRepository.save(suggestionApplied);
            return suggestionAppliedRepository.getSuggestionAppliedByAlertSrcAndDssAlert(alertSrc, dssAlert) != null;
        } else {
            return false;
        }
    }

    @Override
    public boolean delete(String alertSrc, String dssAlert) {
        SuggestionApplied suggestionApplied = suggestionAppliedRepository.getSuggestionAppliedByAlertSrcAndDssAlert(alertSrc, dssAlert);
        if (suggestionApplied != null) {
            suggestionAppliedRepository.delete(suggestionApplied);
            return suggestionAppliedRepository.getSuggestionAppliedByAlertSrcAndDssAlert(alertSrc, dssAlert) == null;
        } else {
            throw new CustomException("Suggestion missing from database.");
        }
    }

    public void checkCreate(Map<String, Object> suggestion) {
        String checkOrigin = suggestion.get("origin").toString();
        if (checkOrigin.equals("Grafana")) {
            String alertSrc = suggestion.get("alertSrc").toString();
            if (alertSrc == null || alertSrc.trim().isEmpty()) throw new CustomException("Alert Source is empty");
            String dssAlert = suggestion.get("dssAlert").toString();
            if (dssAlert == null || dssAlert.trim().isEmpty()) throw new CustomException("DSS Alert is empty");
            String suggestion_ = suggestion.get("suggestion").toString();
            if (suggestion_ == null || suggestion_.trim().isEmpty()) throw new CustomException("Suggestion is empty");
            String timestamp = suggestion.get("timestamp").toString();
            if (isTimeStampValid(timestamp)) throw new CustomException("Invalid timestamp");
        } else {
            throw new CustomException("Access denied");
        }
    }

    public void checkDelete(Map<String, Object> suggestion) {
        String checkOrigin = suggestion.get("origin").toString();
        if (checkOrigin.equals("Grafana")) {
            String alertSrc = suggestion.get("alertSrc").toString();
            if (alertSrc == null || alertSrc.trim().isEmpty()) throw new CustomException("Alert Source is empty");
            String dssAlert = suggestion.get("dssAlert").toString();
            if (dssAlert == null || dssAlert.trim().isEmpty()) throw new CustomException("DSS Alert is empty");
        } else {
            throw new CustomException("Access denied");
        }
    }

    private static Boolean isTimeStampValid(String inputString) {
        SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSSS");
        try {
            format.parse(inputString);
            return true;
        } catch (ParseException e) {
            return false;
        }
    }
}
