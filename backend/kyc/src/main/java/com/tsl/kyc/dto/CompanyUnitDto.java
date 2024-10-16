package com.tsl.kyc.dto;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;

public class CompanyUnitDto {
	
	private UUID companyUuid;
	
	@Size(max = 255)
    private String street;

    @Size(max = 255)
    private String line2;

    @Size(max = 255)
    private String line3;

    @Size(max = 255)
    private String city;

    @Size(max = 255)
    private String state;

    @Size(max = 255)
    private String district;

    @Size(max = 255)
    @Column(name = "country")
    private String country;

    @Size(max = 20)
    private String pincode;

    @Size(max = 255)
    private String village;

    @Size(max = 255)
    private String taluka;

    @Size(max = 255)
    private String plotNumber;

    @Size(max = 255)
    private String ro;

    @Size(max = 255)
    private String sro;
    
    private String indScaleName;
    
    private String indTypeName;
    
    private String indCatName;
    
    private String name;

    private String type;

    private String email;

    private String fax;

    private Integer workDay;

    private Integer workingHour;

	public String unitPhoneNumber;

	public CompanyUnitDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CompanyUnitDto(UUID companyUuid, @Size(max = 255) String street, @Size(max = 255) String line2,
			@Size(max = 255) String line3, @Size(max = 255) String city, @Size(max = 255) String state,
			@Size(max = 255) String district, @Size(max = 255) String country, @Size(max = 20) String pincode,
			@Size(max = 255) String village, @Size(max = 255) String taluka, @Size(max = 255) String plotNumber,
			@Size(max = 255) String ro, @Size(max = 255) String sro, String indScaleName, String indTypeName,
			String indCatName, String name, String type, String email, String fax, Integer workDay,
			Integer workingHour, String unitPhoneNumber) {
		super();
		this.companyUuid = companyUuid;
		this.street = street;
		this.line2 = line2;
		this.line3 = line3;
		this.city = city;
		this.state = state;
		this.district = district;
		this.country = country;
		this.pincode = pincode;
		this.village = village;
		this.taluka = taluka;
		this.plotNumber = plotNumber;
		this.ro = ro;
		this.sro = sro;
		this.indScaleName = indScaleName;
		this.indTypeName = indTypeName;
		this.indCatName = indCatName;
		this.name = name;
		this.type = type;
		this.email = email;
		this.fax = fax;
		this.workDay = workDay;
		this.workingHour = workingHour;
		this.unitPhoneNumber=unitPhoneNumber;
	}

	public UUID getCompanyUuid() {
		return companyUuid;
	}

	public void setCompanyUuid(UUID companyUuid) {
		this.companyUuid = companyUuid;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getLine2() {
		return line2;
	}

	public void setLine2(String line2) {
		this.line2 = line2;
	}

	public String getLine3() {
		return line3;
	}

	public void setLine3(String line3) {
		this.line3 = line3;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getVillage() {
		return village;
	}

	public void setVillage(String village) {
		this.village = village;
	}

	public String getTaluka() {
		return taluka;
	}

	public void setTaluka(String taluka) {
		this.taluka = taluka;
	}

	public String getPlotNumber() {
		return plotNumber;
	}

	public void setPlotNumber(String plotNumber) {
		this.plotNumber = plotNumber;
	}

	public String getRo() {
		return ro;
	}

	public void setRo(String ro) {
		this.ro = ro;
	}

	public String getSro() {
		return sro;
	}

	public void setSro(String sro) {
		this.sro = sro;
	}

	public String getIndScaleName() {
		return indScaleName;
	}

	public void setIndScaleName(String indScaleName) {
		this.indScaleName = indScaleName;
	}

	public String getIndTypeName() {
		return indTypeName;
	}

	public void setIndTypeName(String indTypeName) {
		this.indTypeName = indTypeName;
	}

	public String getIndCatName() {
		return indCatName;
	}

	public void setIndCatName(String indCatName) {
		this.indCatName = indCatName;
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
	 
	public void setUnitPhoneNumber(String unitPhoneNumber) {
		this.unitPhoneNumber=unitPhoneNumber;
	}
	
	public String getUnitPhoneNumber() {
		return unitPhoneNumber;
	}
	
    
    
}
