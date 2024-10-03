package com.tsl.kyc.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "consent")
public class Consent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "company_profile_id", nullable = false)
    private CompanyProfile companyProfile;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @Column(name = "cons_no")
    private Integer consNo;

    @Column(name = "cons_type")
    private String consType;

    @Column(name = "cons_status")
    private String consStatus;

    @Column(name = "expansion_status")
    private String expansionStatus;

    @Column(name = "issue_date")
    private Date issueDate;

    @Column(name = "valid_upto")
    private Date validUpto;

    @Column(name = "gross_ci")
    private String grossCi;

    @Column(name = "no_staff")
    private Integer noStaff;

    @Column(name = "no_worker")
    private Integer noWorker;

    @Column(name = "tot_plot_area")
    private String totPlotArea;

    @Column(name = "tot_plot_area_unit")
    private String totPlotAreaUnit;

    @Column(name = "tot_build_area")
    private String totBuildArea;

    @Column(name = "tot_build_area_unit")
    private String totBuildAreaUnit;

    @Column(name = "open_space_area")
    private String openSpaceArea;

    @Column(name = "open_space_area_unit")
    private String openSpaceAreaUnit;

    @Column(name = "tot_green_area")
    private String totGreenArea;

    @Column(name = "tot_green_area_unit")
    private String totGreenAreaUnit;

    @Column(name = "consent_file_path")
    private String consentFilePath;

    @Column(name = "consent_file_name")
    private String consentFileName;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "gross_ci_units")
    private String grossCiUnits;

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

	public Integer getConsNo() {
		return consNo;
	}

	public void setConsNo(Integer consNo) {
		this.consNo = consNo;
	}

	public String getConsType() {
		return consType;
	}

	public void setConsType(String consType) {
		this.consType = consType;
	}

	public String getConsStatus() {
		return consStatus;
	}

	public void setConsStatus(String consStatus) {
		this.consStatus = consStatus;
	}

	public String getExpansionStatus() {
		return expansionStatus;
	}

	public void setExpansionStatus(String expansionStatus) {
		this.expansionStatus = expansionStatus;
	}

	public Date getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(Date issueDate) {
		this.issueDate = issueDate;
	}

	public Date getValidUpto() {
		return validUpto;
	}

	public void setValidUpto(Date validUpto) {
		this.validUpto = validUpto;
	}

	public String getGrossCi() {
		return grossCi;
	}

	public void setGrossCi(String grossCi) {
		this.grossCi = grossCi;
	}

	public Integer getNoStaff() {
		return noStaff;
	}

	public void setNoStaff(Integer noStaff) {
		this.noStaff = noStaff;
	}

	public Integer getNoWorker() {
		return noWorker;
	}

	public void setNoWorker(Integer noWorker) {
		this.noWorker = noWorker;
	}

	public String getTotPlotArea() {
		return totPlotArea;
	}

	public void setTotPlotArea(String totPlotArea) {
		this.totPlotArea = totPlotArea;
	}

	public String getTotPlotAreaUnit() {
		return totPlotAreaUnit;
	}

	public void setTotPlotAreaUnit(String totPlotAreaUnit) {
		this.totPlotAreaUnit = totPlotAreaUnit;
	}

	public String getTotBuildArea() {
		return totBuildArea;
	}

	public void setTotBuildArea(String totBuildArea) {
		this.totBuildArea = totBuildArea;
	}

	public String getTotBuildAreaUnit() {
		return totBuildAreaUnit;
	}

	public void setTotBuildAreaUnit(String totBuildAreaUnit) {
		this.totBuildAreaUnit = totBuildAreaUnit;
	}

	public String getOpenSpaceArea() {
		return openSpaceArea;
	}

	public void setOpenSpaceArea(String openSpaceArea) {
		this.openSpaceArea = openSpaceArea;
	}

	public String getOpenSpaceAreaUnit() {
		return openSpaceAreaUnit;
	}

	public void setOpenSpaceAreaUnit(String openSpaceAreaUnit) {
		this.openSpaceAreaUnit = openSpaceAreaUnit;
	}

	public String getTotGreenArea() {
		return totGreenArea;
	}

	public void setTotGreenArea(String totGreenArea) {
		this.totGreenArea = totGreenArea;
	}

	public String getTotGreenAreaUnit() {
		return totGreenAreaUnit;
	}

	public void setTotGreenAreaUnit(String totGreenAreaUnit) {
		this.totGreenAreaUnit = totGreenAreaUnit;
	}

	public String getConsentFilePath() {
		return consentFilePath;
	}

	public void setConsentFilePath(String consentFilePath) {
		this.consentFilePath = consentFilePath;
	}

	public String getConsentFileName() {
		return consentFileName;
	}

	public void setConsentFileName(String consentFileName) {
		this.consentFileName = consentFileName;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getGrossCiUnits() {
		return grossCiUnits;
	}

	public void setGrossCiUnits(String grossCiUnits) {
		this.grossCiUnits = grossCiUnits;
	}

   
}

