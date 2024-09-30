package com.tsl.kyc.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tsl.kyc.utils.UserStatus;
import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "company_id")
    @JsonIgnore
    private CompanyProfile companyProfile;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @OneToOne
    @JoinColumn(name = "id")
    private Address address;

    @OneToOne
    @JoinColumn(name = "contact_person_id")
    private ContactPerson contactPerson;

    @Column(name = "name", length = 500)
    private String name;

    @Column(name = "gender", length = 20)
    private String gender;

    @Column(name = "birthday")
    @Temporal(TemporalType.DATE)
    private Date birthday;

    @Column(name = "email", length = 500)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private UserStatus status = UserStatus.active;

    @Column(name = "email_status", length = 20)
    private String emailStatus;

    @Column(name = "profile_status", length = 100)
    private String profileStatus;

    @Column(name = "profile_picture", length = 30)
    private String profilePicture;

    @Column(name = "marital_status")
    private String maritalStatus;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public CompanyProfile getCompanyProfile() {
        return companyProfile;
    }

    public void setCompanyProfile(CompanyProfile companyProfile) {
        this.companyProfile = companyProfile;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public ContactPerson getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(ContactPerson contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    public String getEmailStatus() {
        return emailStatus;
    }

    public void setEmailStatus(String emailStatus) {
        this.emailStatus = emailStatus;
    }

    public String getProfileStatus() {
        return profileStatus;
    }

    public void setProfileStatus(String profileStatus) {
        this.profileStatus = profileStatus;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", companyProfile=" + companyProfile +
                ", user=" + user +
                ", address=" + address +
                ", contactPerson=" + contactPerson +
                ", name='" + name + '\'' +
                ", gender='" + gender + '\'' +
                ", birthday=" + birthday +
                ", email='" + email + '\'' +
                ", status=" + status +
                ", emailStatus='" + emailStatus + '\'' +
                ", profileStatus='" + profileStatus + '\'' +
                ", profilePicture='" + profilePicture + '\'' +
                ", maritalStatus='" + maritalStatus + '\'' +
                '}';
    }
}
