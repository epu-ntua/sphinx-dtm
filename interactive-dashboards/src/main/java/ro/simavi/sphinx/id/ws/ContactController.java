package ro.simavi.sphinx.id.ws;

import com.sun.mail.util.MailSSLSocketFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import ro.simavi.sphinx.id.jpa.repositories.ContactRepository;
import ro.simavi.sphinx.id.model.Alert;
import ro.simavi.sphinx.id.model.Contact;
import ro.simavi.sphinx.id.model.IDResponse;
import ro.simavi.sphinx.id.services.impl.ContactServiceImpl;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
@RestController
@RequestMapping("email")
@Configuration
public class ContactController extends SpringBootServletInitializer {


    @Autowired
    ContactServiceImpl contactServiceImpl;

    @Autowired
    ContactRepository contactRepository;

    @Autowired
    AlertController alertController;

    // E-mail
    @Value(value = "${email.username}")
    String username;

    @Value(value = "${email.password}")
    String password;

    @Value(value = "${email.host}")
    String host;

    @Value(value = "${email.port}")
    String port;

    @Value(value = "${starttls.enable}")
    Boolean startTls;

    @Value(value = "${smtp.auth}")
    Boolean smtpAuth;

    @Value(value = "${smtp.debug}")
    Boolean smtpDebug;

    @Value(value = "${socketFactory.class}")
    String socketFactoryClass;

    @Value(value = "${socketFactory.fallback}")
    Boolean socketFactoryFallback;

    @Value(value = "${setTrustAllHosts}")
    Boolean trustAllHosts;

    @CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity<IDResponse> addContact(@RequestBody Map<String, String> payload) {
        IDResponse response = new IDResponse();
        Contact contact = new Contact(payload.get("email"), payload.get("name"), payload.get("phone"));
        if (contactServiceImpl.addContact(contact)) {
            response.setMessage("E-mail succesfully added.");
        } else {
            response.setMessage("E-mail could not be added.");
        }
        return ResponseEntity.ok().body(response);
    }

    @CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity<IDResponse> deleteContact(@RequestBody Map<String, String> payload) {
        IDResponse response = new IDResponse();
        if (contactServiceImpl.deleteContact(payload.get("email"))) {
            response.setMessage("E-mail succesfully deleted.");
        } else {
            response.setMessage("E-mail could not be deleted.");
        }
        return ResponseEntity.ok().body(response);
    }

    @CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000", "http://interactive-dashboards:3000"})
    @RequestMapping(value = "/show-contacts", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity<List<Contact>> showEmails() {
        List<Contact> contacts = contactServiceImpl.showContacts();
        List<Contact> list = new ArrayList<>();
        list.addAll(contacts);
        return ResponseEntity.ok().body(list);
    }

    @Scheduled(fixedRate = 60000)
    public void sendEmails() throws GeneralSecurityException {
        List<Alert> alerts = alertController.getNewAlerts();
        StringBuilder msg = new StringBuilder("<table style=\"  width: 100%; text-align:center; font-family: \"Trebuchet MS\", Arial, Helvetica, sans-serif;\n" +
                "  border: 1px solid black; border-collapse: collapse;\n" +
                "  width: 100%;\">\n" +
                "  <tr style=\"border: 1px solid black;\">\n" +
                "    <th style=\"  padding-top: 12px;\n" +
                "  padding-bottom: 12px;\n" +
                "  text-align: center;\n" +
                "  background-color: #4CAF50;\n" +
                "  color: white;\">Description</th>\n" +
                "    <th  style=\"padding-top: 12px;\n" +
                "  padding-bottom: 12px;\n" +
                "  text-align: center;\n" +
                "  background-color: #4CAF50;\n" +
                "  color: white;\">TIMESTAMP</th> \n" +
                "    <th  style=\"  padding-top: 12px;\n" +
                "  padding-bottom: 12px;\n" +
                "  text-align: center;\n" +
                "  background-color: #4CAF50;\n" +
                "  color: white;\">LOCATION</th>\n" +
                "    <th  style=\"  padding-top: 12px;\n" +
                "  padding-bottom: 12px;\n" +
                "  text-align: center;\n" +
                "  background-color: #4CAF50;\n" +
                "  color: white;\">TOOL</th>\n" +
                "    <th  style=\"  padding-top: 12px;\n" +
                "  padding-bottom: 12px;\n" +
                "  text-align: center;\n" +
                "  background-color: #4CAF50;\n" +
                "  color: white;\">SEVERITY</th>\n" +
                "    <th  style=\"  padding-top: 12px;\n" +
                "  padding-bottom: 12px;\n" +
                "  text-align: center;\n" +
                "  background-color: #4CAF50;\n" +
                "  color: white;\">ACTION</th>\n" +
                "  </tr>\n");
        if (alerts.size() > 0) {
            for (Alert alert : alerts) {
                msg.append(alert.toString());
            }
            msg.append("</table>");

            List<Contact> contacts = contactServiceImpl.showContacts();
            List<String> emailList = new ArrayList<>();
            for (Contact contact : contacts) {
                emailList.add(contact.getEmail());
            }
            // Mention the Sender's email address

//            String from = "sphinxidalerting@gmail.com";

            // Mention the SMTP server address. Below Gmail's SMTP server is being used to send email
//            String host = "smtp.gmail.com";
//            String port = "587";
//
            MailSSLSocketFactory sf = new MailSSLSocketFactory();
            sf.setTrustAllHosts(trustAllHosts);
            // or
            // sf.setTrustedHosts(new String[] { "my-server" });

            // Get system properties
            Properties properties = System.getProperties();

            // Setup mail server
            properties.put("mail.smtp.host", host);
            properties.put("mail.smtp.port", port);
            properties.put("mail.smtp.starttls.enable", startTls);
            properties.put("mail.smtp.auth", smtpAuth);
            properties.put("mail.smtp.ssl.socketFactory", sf);
            properties.put("mail.smtp.debug", smtpDebug);
            properties.put("mail.smtp.socketFactory.port", port);
            properties.put("mail.smtp.socketFactory.class", socketFactoryClass);
            properties.put("mail.smtp.socketFactory.fallback", socketFactoryFallback);

            // Get the Session object.// and pass username and password
            Session session = Session.getInstance(properties, new javax.mail.Authenticator() {

                protected PasswordAuthentication getPasswordAuthentication() {

//                    return new PasswordAuthentication("sphinxidalerting@gmail.com", "grafana2020");
                    return new PasswordAuthentication(username, password);

                }

            });

            // Used to debug SMTP issues
            session.setDebug(true);

            for (String email : emailList) {
                try {
                    // Create a default MimeMessage object.
                    MimeMessage message = new MimeMessage(session);

                    // Set From: header field of the header.
                    message.setFrom(new InternetAddress(username, "SPHINX Alerting"));

                    // Set To: header field of the header.
                    message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));

                    // Set Subject: header field
                    message.setSubject("Alerts detected");

                    // Now set the actual message
                    //message.setText()
                    message.setContent("You have " + alerts.size() + " alerts:\n" + msg, "text/html");

                    System.out.println("sending...");
                    // Send message
                    Transport.send(message);
                    System.out.println("Sent message successfully....");
                } catch (MessagingException | UnsupportedEncodingException mex) {
                    mex.printStackTrace();
                }
            }
            alertController.updateAlerts(alerts);
        }
    }

}
