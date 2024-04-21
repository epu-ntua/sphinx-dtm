package ro.simavi.sphinx.id.jpa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.simavi.sphinx.id.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
    Contact getContactByEmail (String email);
}
