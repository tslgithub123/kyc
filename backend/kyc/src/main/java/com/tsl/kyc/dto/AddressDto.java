package com.tsl.kyc.dto;

import jakarta.validation.constraints.Size;

public class AddressDto {
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

	public AddressDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AddressDto(@Size(max = 255) String street, @Size(max = 255) String line2, @Size(max = 255) String line3,
			@Size(max = 255) String city, @Size(max = 255) String state, @Size(max = 255) String district,
			@Size(max = 255) String country, @Size(max = 20) String pincode, @Size(max = 255) String village,
			@Size(max = 255) String taluka, @Size(max = 255) String plotNumber, @Size(max = 255) String ro,
			@Size(max = 255) String sro) {
		super();
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
	}

	public String getStreet() {
		return street;
	}

	public String getLine2() {
		return line2;
	}

	public String getLine3() {
		return line3;
	}

	public String getCity() {
		return city;
	}

	public String getState() {
		return state;
	}

	public String getDistrict() {
		return district;
	}

	public String getCountry() {
		return country;
	}

	public String getPincode() {
		return pincode;
	}

	public String getVillage() {
		return village;
	}

	public String getTaluka() {
		return taluka;
	}

	public String getPlotNumber() {
		return plotNumber;
	}

	public String getRo() {
		return ro;
	}

	public String getSro() {
		return sro;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public void setLine2(String line2) {
		this.line2 = line2;
	}

	public void setLine3(String line3) {
		this.line3 = line3;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setState(String state) {
		this.state = state;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public void setVillage(String village) {
		this.village = village;
	}

	public void setTaluka(String taluka) {
		this.taluka = taluka;
	}

	public void setPlotNumber(String plotNumber) {
		this.plotNumber = plotNumber;
	}

	public void setRo(String ro) {
		this.ro = ro;
	}

	public void setSro(String sro) {
		this.sro = sro;
	}
    
    
}
