package com.tsl.kyc.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "company_profile")
public class CompanyProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;

	@OneToOne
	@JoinColumn(name = "contact_person_id")
	private ContactPerson contactPerson;

	@Column(name = "mpcbid", unique = true)
	private Long mpcbId;

	@ManyToOne
	@JoinColumn(name = "industry_link_id")
	private IndustryLink industryLink;

	@Column(name = "branch")
	private String branch;

	@Column(name = "category")
	private String category;

	@Column(name = "name")
	private String name;

	@Column(name = "email")
	private String email;

	@Column(name = "fax")
	private String fax;

	@Column(name = "last_environment", length = 20)
	private String lastEnvironment;

	@Column(name = "work_day")
	private Integer workDay;

	@Column(name = "phone_number")
	private String phoneNumber;

	@Column(name = "website")
	private String website;

	@Column(name = "working_hour")
	private Integer workingHour;

	@Column(name = "year_established")
	private Integer yearEstablished;

	@JsonIgnore
	@OneToMany(mappedBy = "companyProfile", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Address> addresses;

	@JsonIgnore
	@OneToMany(mappedBy = "companyProfile", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Employee> employees;

	@OneToMany(mappedBy = "companyProfile", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference // Manages the forward part of the reference
	private Set<User> users;

	// Getters and setters

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

	public Long getMpcbId() {
		return mpcbId;
	}

	public void setMpcbId(Long mpcbId) {
		this.mpcbId = mpcbId;
	}

	public IndustryLink getIndustryLink() {
		return industryLink;
	}

	public void setIndustryLink(IndustryLink industryLink) {
		this.industryLink = industryLink;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
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

	public Integer getWorkDay() {
		return workDay;
	}

	public void setWorkDay(Integer workDay) {
		this.workDay = workDay;
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

	public Integer getWorkingHour() {
		return workingHour;
	}

	public void setWorkingHour(Integer workingHour) {
		this.workingHour = workingHour;
	}

	public Integer getYearEstablished() {
		return yearEstablished;
	}

	public void setYearEstablished(Integer yearEstablished) {
		this.yearEstablished = yearEstablished;
	}

	public Set<Address> getAddresses() {
		return addresses;
	}

	public void setAddresses(Set<Address> addresses) {
		this.addresses = addresses;
	}

	public Set<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(Set<Employee> employees) {
		this.employees = employees;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}
}
