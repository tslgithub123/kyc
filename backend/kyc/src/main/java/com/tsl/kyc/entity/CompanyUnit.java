package com.tsl.kyc.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.UUID;

@Entity
@Table(name = "company_unit")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CompanyUnit {
//    @Id
//    @ColumnDefault("uuid_generate_v4()")
//    @Column(name = "id", nullable = false)
//    private UUID id;
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
	 
	
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "company_profile_id")
    private CompanyProfile companyProfile;

    @ManyToOne(fetch = FetchType.LAZY  ,cascade = CascadeType.PERSIST)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "address_id")
    private Address address;

    @ManyToOne(fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "industry_link_id")
    private IndustryLink industryLink;

    @Size(max = 50)
    @Column(name = "name", length = 50)
    private String name;

    @Size(max = 50)
    @Column(name = "type", length = 50)
    private String type;

    @Size(max = 255)
    @Column(name = "unit_email")
    private String email;

    @Size(max = 255)
    @Column(name = "unit_fax")
    private String fax;
    
    @Column(name = "unit_phone_number")
    private String unitphoneNumber;
     
    @Column(name = "work_day")
    private Integer workDay;

    @Column(name = "working_hour")
    private Integer workingHour;

	public CompanyUnit() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CompanyUnit(UUID id, CompanyProfile companyProfile, Address address, IndustryLink industryLink,
			@Size(max = 50) String name, @Size(max = 50) String type, @Size(max = 255) String email,
			@Size(max = 255) String fax, String unitphoneNumber, Integer workDay, Integer workingHour) {
		super();
		this.id = id;
		this.companyProfile = companyProfile;
		this.address = address;
		this.industryLink = industryLink;
		this.name = name;
		this.type = type;
		this.email = email;
		this.fax = fax;
		this.unitphoneNumber = unitphoneNumber;
		this.workDay = workDay;
		this.workingHour = workingHour;
	}

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

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public IndustryLink getIndustryLink() {
		return industryLink;
	}

	public void setIndustryLink(IndustryLink industryLink) {
		this.industryLink = industryLink;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public String getUnitphoneNumber() {
		return unitphoneNumber;
	}

	public void setUnitphoneNumber(String unitphoneNumber) {
		this.unitphoneNumber = unitphoneNumber;
	}

	public Integer getWorkDay() {
		return workDay;
	}

	public void setWorkDay(Integer workDay) {
		this.workDay = workDay;
	}

	public Integer getWorkingHour() {
		return workingHour;
	}

	public void setWorkingHour(Integer workingHour) {
		this.workingHour = workingHour;
	}
    
    

}