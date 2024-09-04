package com.tsl.kyc.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "emp_data")
public class Employee {

    public Employee() {
    }

    public Employee(Long id, User user, CompanyProfile companyProfile, String employeeName, String gender, String birthday, String address, String address2, String address3, String contactPersonDesignation, String contactPersonNumber, String email, String status, String emailStatus, String profileStatus, String profilePic, String maritalStatus) {
        this.id = id;
        this.user = user;
        this.companyProfile = companyProfile;
        this.employeeName = employeeName;
        this.gender = gender;
        this.birthday = birthday;
        this.address = address;
        this.address2 = address2;
        this.address3 = address3;
        this.contactPersonDesignation = contactPersonDesignation;
        this.contactPersonNumber = contactPersonNumber;
        this.email = email;
        this.status = status;
        this.emailStatus = emailStatus;
        this.profileStatus = profileStatus;
        this.profilePic = profilePic;
        this.maritalStatus = maritalStatus;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = false)
    private CompanyProfile companyProfile;

    @Column(name = "employee_name", length = 500)
    private String employeeName;

    @Column(name = "gender", length = 20)
    private String gender;

    @Column(name = "birthday", length = 40)
    private String birthday;

    @Column(name = "address", length = 500)
    private String address;

    @Column(name = "address2", length = 500)
    private String address2;

    @Column(name = "address3", length = 500)
    private String address3;

    @Column(name = "cont_per_desig", length = 500)
    private String contactPersonDesignation;

    @Column(name = "cont_per_no", length = 500)
    private String contactPersonNumber;

    @Column(name = "email", length = 500)
    private String email;

    @Column(name = "status", length = 20, nullable = false)
    private String status = "active";

    @Column(name = "email_status", length = 20)
    private String emailStatus;

    @Column(name = "profile_status", length = 100)
    private String profileStatus;

    @Column(name = "profile_pic", length = 30)
    private String profilePic;

    @Column(name = "marital_status", length = 255)
    private String maritalStatus;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public CompanyProfile getCompanyProfile() {
        return companyProfile;
    }

    public void setCompanyProfile(CompanyProfile companyProfile) {
        this.companyProfile = companyProfile;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getAddress3() {
        return address3;
    }

    public void setAddress3(String address3) {
        this.address3 = address3;
    }

    public String getContactPersonDesignation() {
        return contactPersonDesignation;
    }

    public void setContactPersonDesignation(String contactPersonDesignation) {
        this.contactPersonDesignation = contactPersonDesignation;
    }

    public String getContactPersonNumber() {
        return contactPersonNumber;
    }

    public void setContactPersonNumber(String contactPersonNumber) {
        this.contactPersonNumber = contactPersonNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
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

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }
}
