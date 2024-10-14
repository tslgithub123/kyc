package com.tsl.kyc.dto;

import java.util.UUID;

public class CompanyUnitOptionsDto {
    UUID companyUnitId;
    String companyUnitName;

    public CompanyUnitOptionsDto() {
    }

    public CompanyUnitOptionsDto(UUID companyUnitId, String companyUnitName) {
        this.companyUnitId = companyUnitId;
        this.companyUnitName = companyUnitName;
    }

    public UUID getCompanyUnitId() {
        return companyUnitId;
    }

    public void setCompanyUnitId(UUID companyUnitId) {
        this.companyUnitId = companyUnitId;
    }

    public String getCompanyUnitName() {
        return companyUnitName;
    }

    public void setCompanyUnitName(String companyUnitName) {
        this.companyUnitName = companyUnitName;
    }
}
