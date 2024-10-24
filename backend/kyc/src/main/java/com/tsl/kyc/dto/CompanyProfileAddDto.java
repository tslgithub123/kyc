package com.tsl.kyc.dto;

public class CompanyProfileAddDto {
	
	private String personName;
	
	private String personDesignation;
	
	private String personPhone;
	
	private String personEmail;
	
	private Long mpcbId;
	
	private String companyName;
	
	private String companyEmail;
	
	private String companyFax;
	
	private String lastEnvironment;
	
	private String companyPhoneNumber;
	
	private String companyWebsite;
	
	private Integer yearEstalished;

	private String registrationNo;

	public CompanyProfileAddDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CompanyProfileAddDto(String personName, String personDesignation, String personPhone, String personEmail,
			Long mpcbId, String companyName, String companyEmail, String companyFax, String lastEnvironment,
			String companyPhoneNumber, String companyWebsite, Integer yearEstalished, String registrationNo) {
		super();
		this.personName = personName;
		this.personDesignation = personDesignation;
		this.personPhone = personPhone;
		this.personEmail = personEmail;
		this.mpcbId = mpcbId;
		this.companyName = companyName;
		this.companyEmail = companyEmail;
		this.companyFax = companyFax;
		this.lastEnvironment = lastEnvironment;
		this.companyPhoneNumber = companyPhoneNumber;
		this.companyWebsite = companyWebsite;
		this.yearEstalished = yearEstalished;
		this.registrationNo = registrationNo;
	}

	public String getPersonName() {
		return personName;
	}

	public String getPersonDesignation() {
		return personDesignation;
	}

	public String getPersonPhone() {
		return personPhone;
	}

	public String getPersonEmail() {
		return personEmail;
	}

	public Long getMpcbId() {
		return mpcbId;
	}

	public String getCompanyName() {
		return companyName;
	}

	public String getCompanyEmail() {
		return companyEmail;
	}

	public String getCompanyFax() {
		return companyFax;
	}

	public String getLastEnvironment() {
		return lastEnvironment;
	}

	public String getCompanyPhoneNumber() {
		return companyPhoneNumber;
	}

	public String getCompanyWebsite() {
		return companyWebsite;
	}

	public Integer getYearEstalished() {
		return yearEstalished;
	}

	public void setPersonName(String personName) {
		this.personName = personName;
	}

	public void setPersonDesignation(String personDesignation) {
		this.personDesignation = personDesignation;
	}

	public void setPersonPhone(String personPhone) {
		this.personPhone = personPhone;
	}

	public void setPersonEmail(String personEmail) {
		this.personEmail = personEmail;
	}

	public void setMpcbId(Long mpcbId) {
		this.mpcbId = mpcbId;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public void setCompanyEmail(String companyEmail) {
		this.companyEmail = companyEmail;
	}

	public void setCompanyFax(String companyFax) {
		this.companyFax = companyFax;
	}

	public void setLastEnvironment(String lastEnvironment) {
		this.lastEnvironment = lastEnvironment;
	}

	public void setCompanyPhoneNumber(String companyPhoneNumber) {
		this.companyPhoneNumber = companyPhoneNumber;
	}

	public void setCompanyWebsite(String companyWebsite) {
		this.companyWebsite = companyWebsite;
	}

	public void setYearEstalished(Integer yearEstalished) {
		this.yearEstalished = yearEstalished;
	}

	public String getRegistrationNo() {
		return registrationNo;
	}

	public void setRegistrationNo(String registrationNo) {
		this.registrationNo = registrationNo;
	}
}
