package ro.simavi.sphinx.id.model;

import javax.persistence.*;

@Entity
@Table(name = "contact_list", schema = "sphinx")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    public Contact() {
    }

    public Contact(Integer id, String email) {
        this.id = id;
        this.email = email;
    }

    public Contact(String email) {
        this.email = email;
    }

    public Contact(String email, String name, String phone) {
        this.email = email;
        this.name = name;
        this.phone = phone;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
