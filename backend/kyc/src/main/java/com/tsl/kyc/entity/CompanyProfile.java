package com.tsl.kyc.entity;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "company_profile")
public class CompanyProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long mpcbid;
    private String branch;
    private String category;
    private String city;
    private String compName;
    private String contPerDesig;
    private String contPerName;
    private String contPerNo;
    private String country;
    private String district;
    private String email;
    private String fax;
    private String indPrimary;
    private String indSecondary;
    private String industryType;
    private String lastEnv;
    private Integer noWorkDays;
    private String phoneNo;
    private String pincode;
    private String plotNo;
    private String ro;
    private String sro;
    private String state;
    private String street;
    private String taluka;
    private String uan;
    private String village;
    private String website;
    private Integer workingHour;
    private Integer yearEstb;
    private String compEmail;

    public CompanyProfile() {
		super();
		// TODO Auto-generated constructor stub
	}
    
	public CompanyProfile(Long id, Long mpcbid, String branch, String category, String city, String compName,
			String contPerDesig, String contPerName, String contPerNo, String country, String district, String email,
			String fax, String indPrimary, String indSecondary, String industryType, String lastEnv, Integer noWorkDays,
			String phoneNo, String pincode, String plotNo, String ro, String sro, String state, String street,
			String taluka, String uan, String village, String website, Integer workingHour, Integer yearEstb, String compEmail, Set<User> users) {
		super();
		this.id = id;
		this.mpcbid = mpcbid;
		this.branch = branch;
		this.category = category;
		this.city = city;
		this.compName = compName;
		this.contPerDesig = contPerDesig;
		this.contPerName = contPerName;
		this.contPerNo = contPerNo;
		this.country = country;
		this.district = district;
		this.email = email;
		this.fax = fax;
		this.indPrimary = indPrimary;
		this.indSecondary = indSecondary;
		this.industryType = industryType;
		this.lastEnv = lastEnv;
		this.noWorkDays = noWorkDays;
		this.phoneNo = phoneNo;
		this.pincode = pincode;
		this.plotNo = plotNo;
		this.ro = ro;
		this.sro = sro;
		this.state = state;
		this.street = street;
		this.taluka = taluka;
		this.uan = uan;
		this.village = village;
		this.website = website;
		this.workingHour = workingHour;
		this.yearEstb = yearEstb;

		this.compEmail = compEmail;
//		this.users = users;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMpcbid() {
		return mpcbid;
	}

	public void setMpcbid(Long mpcbid) {
		this.mpcbid = mpcbid;
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

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCompName() {
		return compName;
	}

	public void setCompName(String compName) {
		this.compName = compName;
	}

	public String getContPerDesig() {
		return contPerDesig;
	}

	public void setContPerDesig(String contPerDesig) {
		this.contPerDesig = contPerDesig;
	}

	public String getContPerName() {
		return contPerName;
	}

	public void setContPerName(String contPerName) {
		this.contPerName = contPerName;
	}

	public String getContPerNo() {
		return contPerNo;
	}

	public void setContPerNo(String contPerNo) {
		this.contPerNo = contPerNo;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
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

	public String getIndPrimary() {
		return indPrimary;
	}

	public void setIndPrimary(String indPrimary) {
		this.indPrimary = indPrimary;
	}

	public String getIndSecondary() {
		return indSecondary;
	}

	public void setIndSecondary(String indSecondary) {
		this.indSecondary = indSecondary;
	}

	public String getIndustryType() {
		return industryType;
	}

	public void setIndustryType(String industryType) {
		this.industryType = industryType;
	}

	public String getLastEnv() {
		return lastEnv;
	}

	public void setLastEnv(String lastEnv) {
		this.lastEnv = lastEnv;
	}

	public Integer getNoWorkDays() {
		return noWorkDays;
	}

	public void setNoWorkDays(Integer noWorkDays) {
		this.noWorkDays = noWorkDays;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getPlotNo() {
		return plotNo;
	}

	public void setPlotNo(String plotNo) {
		this.plotNo = plotNo;
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

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getTaluka() {
		return taluka;
	}

	public void setTaluka(String taluka) {
		this.taluka = taluka;
	}

	public String getUan() {
		return uan;
	}

	public void setUan(String uan) {
		this.uan = uan;
	}

	public String getVillage() {
		return village;
	}

	public void setVillage(String village) {
		this.village = village;
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

	public Integer getYearEstb() {
		return yearEstb;
	}

	public void setYearEstb(Integer yearEstb) {
		this.yearEstb = yearEstb;
	}


	public String getCompEmail() {
		return compEmail;
	}

	public void setCompEmail(String compEmail) {
		this.compEmail = compEmail;
	}

//	public Set<User> getUsers() {
//		return users;
//	}
//
//	public void setUsers(Set<User> users) {
//		this.users = users;
//	}

//    @OneToMany(mappedBy = "companyProfile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private Set<User> users;

}
