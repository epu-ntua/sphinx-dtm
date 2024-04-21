package ro.simavi.sphinx.id.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.simavi.sphinx.id.exception.CustomException;
import ro.simavi.sphinx.id.jpa.repositories.ContactRepository;
import ro.simavi.sphinx.id.model.Contact;
import ro.simavi.sphinx.id.services.ContactService;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    ContactRepository contactRepository;

    @Override
    public List<Contact> showContacts() {
        return contactRepository.findAll();
    }

    public boolean addContact(Contact contact) {
        if (contact.getEmail() == null) {
            throw new CustomException("Please provide an e-mail.");
        } else if (contactRepository.getContactByEmail(contact.getEmail()) != null) {
            throw new CustomException("E-mail already added in the list.");
        } else if (!checkFullname(contact.getName())) {
            throw new CustomException("First and last name should contain letters and space only.");
        } else if (!contact.getName().contains(" ")) {
            throw new CustomException("First and last name should pe provided.");
        } else if (!contact.getPhone().matches("[0-9]+")) {
            throw new CustomException("Phone number must contain digits only.");
        } else {
            contactRepository.save(contact);
            return contactRepository.getContactByEmail(contact.getEmail()) != null;
        }
    }

    @Override
    public boolean deleteContact(String email) {
        if (email == null) {
            throw new CustomException("Please provide an e-mail.");
        } else if (contactRepository.getContactByEmail(email) == null) {
            throw new CustomException("E-mail does not exist.");
        } else {
            Contact contact = contactRepository.getContactByEmail(email);
            contactRepository.delete(contact);
            return contactRepository.getContactByEmail(contact.getEmail()) == null;
        }
    }

    private boolean checkFullname(String fullName){
        CharSequence inputStr = fullName;
        Pattern pattern = Pattern.compile(new String ("^[a-zA-Z\\s]*$"));
        Matcher matcher = pattern.matcher(inputStr);
        return matcher.matches();
    }
}
