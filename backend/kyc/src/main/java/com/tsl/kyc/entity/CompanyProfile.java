package com.tsl.kyc.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "company_profile")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CompanyProfile {
//    @Id
//    @ColumnDefault("uuid_generate_v4()")
//    @Column(name = "id", nullable = false)
//    private UUID id;

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contact_person_id")
    private ContactPerson contactPerson;

    @Column(name = "mpcbid")
    private Long mpcbid;

    @Size(max = 255)
    @Column(name = "name")
    private String name;

    @Size(max = 255)
    @Column(name = "email")
    private String email;

    @Size(max = 255)
    @Column(name = "fax")
    private String fax;

    @Size(max = 20)
    @Column(name = "last_environment", length = 20)
    private String lastEnvironment;

    @Size(max = 255)
    @Column(name = "phone_number")
    private String phoneNumber;

    @Size(max = 255)
    @Column(name = "website")
    private String website;

    @Column(name = "year_established")
    private Integer yearEstablished;

    @OneToMany(mappedBy = "companyProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("companyProfile")
    @JsonBackReference
    private List<CompanyUnit> companyUnits;

    @Column(name = "com_registration_no")
    private String registrationNo;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public ContactPerson getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(ContactPerson contactPerson) {
        this.contactPerson = contactPerson;
    }

    public Long getMpcbid() {
        return mpcbid;
    }

    public void setMpcbid(Long mpcbid) {
        this.mpcbid = mpcbid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getLastEnvironment() {
        return lastEnvironment;
    }

    public void setLastEnvironment(String lastEnvironment) {
        this.lastEnvironment = lastEnvironment;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public Integer getYearEstablished() {
        return yearEstablished;
    }

    public void setYearEstablished(Integer yearEstablished) {
        this.yearEstablished = yearEstablished;
    }

    public List<CompanyUnit> getCompanyUnits() {
        return companyUnits;
    }

    public void setCompanyUnits(List<CompanyUnit> companyUnits) {
        this.companyUnits = companyUnits;
    }

    public String getRegistrationNo() {
        return registrationNo;
    }

    public void setRegistrationNo(String registrationNo) {
        this.registrationNo = registrationNo;
    }
}