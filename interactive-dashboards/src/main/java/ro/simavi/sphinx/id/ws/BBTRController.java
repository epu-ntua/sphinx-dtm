package ro.simavi.sphinx.id.ws;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.simavi.sphinx.id.exception.CustomException;
import ro.simavi.sphinx.id.model.BBTRThreat;

import javax.net.ssl.*;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;

import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
@RestController
@RequestMapping("bbtr")
public class BBTRController {


    // SM IP
    @Value(value = "${sm.ip}")
    String SM_IP;

    // BBTR IP
    @Value(value = "${bbtr.ip}")
    String BBTR_IP;

    // BBTR USERNAME
    @Value(value = "${bbtr.username}")
    String BBTR_USERNAME;

    // BBTR SECRET
    @Value(value = "${bbtr.secret}")
    String BBTR_SECRET;

    // BBTR NETWORK
    @Value(value = "${bbtr.network}")
    String BBTR_NETWORK;

    // BBTR ORGANIZATION
    @Value(value = "${bbtr.organization}")
    String BBTR_ORGANIZATION;

    @CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
    @RequestMapping(value = "/threats", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public ResponseEntity<List<BBTRThreat>> getThreats(@RequestHeader Map<String, String> headers) throws IOException, KeyManagementException, NoSuchAlgorithmException, JSONException {
        List<BBTRThreat> bbtr_response = new ArrayList<>();

        JSONArray jsonArray = null;
        // check SM token for BBTR
        String SM_endpoint = SM_IP;
        try {
            SM_endpoint += "/Authorization?requestedservice=BBTR&requestedticket=" + headers.get("authorization").replace("Bearer ", "");
        } catch (Exception e){
            throw new CustomException("Service manager token missing");
        }

        String bbtr_auth_endpoint = BBTR_IP + "/auth/signin";
        String bbtr_threats_endpoint = BBTR_IP + "/blockchain/channel/threat/chaincode/trcc/query/get_by_query";
        String BBTR_token = "";

        // SSL fix
        // Create a trust manager that does not validate certificate chains
        TrustManager[] trustAllCerts = new TrustManager[]{new X509TrustManager() {
            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                return null;
            }

            public void checkClientTrusted(X509Certificate[] certs, String authType) {
            }

            public void checkServerTrusted(X509Certificate[] certs, String authType) {
            }
        }
        };

        // Install the all-trusting trust manager
        SSLContext sc = SSLContext.getInstance("SSL");
        sc.init(null, trustAllCerts, new java.security.SecureRandom());
        HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

        // Create all-trusting host name verifier
        HostnameVerifier allHostsValid = new HostnameVerifier() {
            public boolean verify(String hostname, SSLSession session) {
                return true;
            }
        };

        // Install the all-trusting host verifier
        HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);


        // Check if the user has access to BBTR
        URL sm_url = new URL(SM_endpoint);
        HttpURLConnection sm_http = (HttpURLConnection) sm_url.openConnection();
        System.out.println(sm_http.getResponseMessage());
        BufferedReader sm_reader = new BufferedReader(new InputStreamReader(sm_http.getInputStream()));
        StringBuilder sm_response = new StringBuilder();

        String sm_line = null;
        try {
            while ((sm_line = sm_reader.readLine()) != null) {
                sm_response.append(sm_line + "\n");
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                sm_http.getInputStream().close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        String smResponse = sm_response.toString();
        JSONObject sm_jsonObject = null;
        try {
            sm_jsonObject = new JSONObject(smResponse);
            System.out.println(sm_jsonObject);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        sm_http.disconnect();

        JSONObject sm_temp = (JSONObject) sm_jsonObject.get("data");
        if (sm_temp.length() == 0) {
            // BBTR Authentication
            URL bbtr_auth_url = new URL(bbtr_auth_endpoint);
            HttpURLConnection bbtr_auth_http = (HttpURLConnection) bbtr_auth_url.openConnection();
            bbtr_auth_http.setDoOutput(true);
            bbtr_auth_http.setRequestMethod("POST");
            bbtr_auth_http.setRequestProperty("Content-Type", "application/json");
            String bbtr_auth_data = "{\"username\": \"" + BBTR_USERNAME + "\", \"secret\": \"" + BBTR_SECRET + "\", \"network\": \"" + BBTR_NETWORK + "\", \"organization\": \"" + BBTR_ORGANIZATION + "\"}";
            byte[] bbtr_auth_out = bbtr_auth_data.getBytes(StandardCharsets.UTF_8);
            OutputStream stream = bbtr_auth_http.getOutputStream();
            stream.write(bbtr_auth_out);

            System.out.println(bbtr_auth_http.getResponseMessage());
            BufferedReader bbtr_auth_reader = new BufferedReader(new InputStreamReader(bbtr_auth_http.getInputStream()));
            StringBuilder bbtr_auth_response = new StringBuilder();

            String bbtr_auth_line = null;
            try {
                while ((bbtr_auth_line = bbtr_auth_reader.readLine()) != null) {
                    bbtr_auth_response.append(bbtr_auth_line + "\n");
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    bbtr_auth_http.getInputStream().close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            String bbtrAuthResponse = bbtr_auth_response.toString();
            JSONObject bbtr_auth_jsonObject = null;
            try {
                bbtr_auth_jsonObject = new JSONObject(bbtrAuthResponse);
                BBTR_token = bbtr_auth_jsonObject.get("access_token").toString();
            } catch (JSONException e) {
                e.printStackTrace();
            }
            bbtr_auth_http.disconnect();

            // get list of Threats
            if (BBTR_token.length() > 0) {
                // get list of Threats
                URL bbtr_threats_url = new URL(bbtr_threats_endpoint);
                HttpURLConnection bbtr_threats_http = (HttpURLConnection) bbtr_threats_url.openConnection();
                bbtr_threats_http.setDoOutput(true);
                bbtr_threats_http.setRequestMethod("POST");
                bbtr_threats_http.setRequestProperty("Content-Type", "application/json");
                bbtr_threats_http.setRequestProperty("Authorization", "Bearer " + BBTR_token);
                String bbtr_threats_data = "{\"source_hospital_id\":{\"$regex\": \"h2\"}}";
                byte[] bbtr_threats_out = bbtr_threats_data.getBytes(StandardCharsets.UTF_8);
                OutputStream bbtr_threats_stream = bbtr_threats_http.getOutputStream();
                bbtr_threats_stream.write(bbtr_threats_out);

                System.out.println(bbtr_threats_http.getResponseMessage());
                BufferedReader bbtr_threats_reader = new BufferedReader(new InputStreamReader(bbtr_threats_http.getInputStream()));
                StringBuilder bbtr_threats_response = new StringBuilder();

                String bbtr_threats_line = null;
                try {
                    while ((bbtr_threats_line = bbtr_threats_reader.readLine()) != null) {
                        bbtr_threats_response.append(bbtr_threats_line + "\n");
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    try {
                        bbtr_threats_http.getInputStream().close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                String bbtrThreatsResponse = bbtr_threats_response.toString();
                JSONArray bbtr_threats_jsonObject = null;
                System.out.println(bbtrThreatsResponse);
                try {
                    bbtr_threats_jsonObject = new JSONArray(bbtrThreatsResponse);
                    System.out.println(bbtr_threats_jsonObject);
                    jsonArray = bbtr_threats_jsonObject;
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                bbtr_threats_http.disconnect();

                // return threats
                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject tempJson = jsonArray.getJSONObject(i);
                    JSONObject tempObject = new JSONObject(tempJson.get("Record").toString());
                    BBTRThreat tempThreat = new BBTRThreat(
                            tempJson.get("Key").toString(),
                            tempObject.get("asset_ID").toString(),
                            tempObject.get("asset_IP").toString(),
                            tempObject.get("asset_type").toString(),
                            tempObject.get("asset_value").toString(),
                            tempObject.get("id").toString(),
                            tempObject.get("reliability").toString(),
                            tempObject.get("source_hospital_id").toString(),
                            tempObject.get("threat_description").toString(),
                            tempObject.get("threat_id").toString(),
                            tempObject.get("threat_priority").toString(),
                            tempObject.get("threat_timestamp").toString()
                    );
                    bbtr_response.add(tempThreat);
                }
            } else {
                throw new CustomException("BBTR credentials not correct.");
            }
        } else {
            throw new CustomException("Access Denied");
        }
        return ResponseEntity.ok().body(bbtr_response);
    }

}
