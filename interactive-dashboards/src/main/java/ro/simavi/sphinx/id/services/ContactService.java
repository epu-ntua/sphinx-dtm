package ro.simavi.sphinx.id.services;

import ro.simavi.sphinx.id.model.Contact;

import java.util.List;

public interface ContactService {
    List<Contact> showContacts();
    boolean addContact(Contact contact);
    boolean deleteContact(String email);
}
