package com.tsl.kyc.dto;
import java.util.Date;
import java.util.UUID;

public class ConsentDto {

    private UUID id;
    private UUID companyProfileId; 
    private UUID userId;            
    private Integer consNo;
    private String consType;
    private String consStatus;
    private String expansionStatus;
    private Date issueDate;
    private Date validUpto;
    private String grossCi;
    private Integer noStaff;
    private Integer noWorker;
    private String totPlotArea;
    private String totPlotAreaUnit;
    private String totBuildArea;
    private String totBuildAreaUnit;
    private String openSpaceArea;
    private String openSpaceAreaUnit;
    private String totGreenArea;
    private String totGreenAreaUnit;
    private String consentFilePath;
    private String consentFileName;
    private Date createdDate;
    private String grossCiUnits;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getCompanyProfileId() {
        return companyProfileId;
    }

    public void setCompanyProfileId(UUID companyProfileId) {
        this.companyProfileId = companyProfileId;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
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
