package com.tsl.kyc.service;

import com.tsl.kyc.entity.CompanyUnit;
import com.tsl.kyc.repository.CompanyUnitRepository;
import com.tsl.kyc.security.IdorSecurityService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CompanyUnitService {

    private final CompanyUnitRepository companyUnitRepository;


    public CompanyUnitService(CompanyUnitRepository companyUnitRepository, IdorSecurityService idorSecurityService) {
        this.companyUnitRepository = companyUnitRepository;
    }

    public List<CompanyUnit> getAllCompanyUnits() {
        return companyUnitRepository.findAll();
    }

    public CompanyUnit getCompanyUnitById(UUID id) {
        return companyUnitRepository.findById(id).orElse(null);
    }

    public CompanyUnit createCompanyUnit(CompanyUnit companyUnit) {
        return companyUnitRepository.save(companyUnit);
    }

    public CompanyUnit updateCompanyUnit(UUID id, CompanyUnit companyUnit) {
        CompanyUnit existingCompanyUnit = companyUnitRepository.findById(id).orElse(null);
        if (existingCompanyUnit == null) {
            return null;
        }
        companyUnit.setId(id);
        return companyUnitRepository.save(companyUnit);
    }

    public void deleteCompanyUnit(UUID id) {
        companyUnitRepository.deleteById(id);
    }

    @PreAuthorize("@idorSecurityService.hasAccessToCompany(#companyProfileId)")
    public List<CompanyUnit> getCompanyUnitsByCompanyProfileId(UUID companyProfileId) {
        return companyUnitRepository.findByCompanyProfileId(companyProfileId);
    }
}
