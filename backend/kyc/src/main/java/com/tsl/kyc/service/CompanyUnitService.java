package com.tsl.kyc.service;

import com.tsl.kyc.dto.CompanyUnitDto;
import com.tsl.kyc.entity.Address;
import com.tsl.kyc.entity.CompanyProfile;
import com.tsl.kyc.entity.CompanyUnit;
import com.tsl.kyc.entity.IndustryLink;
import com.tsl.kyc.exception.ResourceNotFoundException;
import com.tsl.kyc.repository.CompanyUnitRepository;
import com.tsl.kyc.security.IdorSecurityService;

import jakarta.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CompanyUnitService {

    private final CompanyUnitRepository companyUnitRepository;
    private final CompanyProfileService companyProfileService;
    private final AddressService addressService;
    private final IndustryLinkService industryLinkService;
    private static final Logger logger = LoggerFactory.getLogger(CompanyUnitService.class);

    public CompanyUnitService(CompanyUnitRepository companyUnitRepository, IdorSecurityService idorSecurityService,CompanyProfileService companyProfileService,AddressService addressService,IndustryLinkService industryLinkService) {
        this.companyUnitRepository = companyUnitRepository;
        this.companyProfileService=companyProfileService;
        this.addressService=addressService;
        this.industryLinkService=industryLinkService;
    }

    public List<CompanyUnit> getAllCompanyUnits() {
        return companyUnitRepository.findAll();
    }

    public CompanyUnit getCompanyUnitById(UUID id) {
        return companyUnitRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Company Unit not found By Id :"+id));
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

    @Transactional
    public CompanyUnit saveUnit(CompanyUnitDto cdto) {
        IndustryLink industryLink = new IndustryLink();
        Address address = new Address();
        CompanyUnit companyUnit = new CompanyUnit();

        // Set Industry Link
        industryLink=industryLinkService.getIndustryData(cdto.getIndScaleName(),cdto.getIndTypeName(),cdto.getIndCatName());

        // Set Address fields
        address.setStreet(cdto.getStreet());
        address.setLine2(cdto.getLine2());
        address.setLine3(cdto.getLine3());
        address.setCity(cdto.getCity());	
        address.setState(cdto.getState());
        address.setDistrict(cdto.getDistrict());
        address.setCountry(cdto.getCountry());
        address.setPincode(cdto.getPincode());
        address.setVillage(cdto.getVillage());
        address.setTaluka(cdto.getTaluka());
        address.setPlotNumber(cdto.getPlotNumber());
        address.setRo(cdto.getRo());
        address.setSro(cdto.getSro());
        Address saveAddress=addressService.saveAddress(address);
        
       
        
        // Fetch CompanyProfile
        CompanyProfile companyProfile = companyProfileService.getCompanyProfileById(cdto.getCompanyUuid());

        // Set CompanyUnit fields
        companyUnit.setAddress(saveAddress);
        companyUnit.setCompanyProfile(companyProfile);
        companyUnit.setIndustryLink(industryLink);
        companyUnit.setName(cdto.getName());
        companyUnit.setType(cdto.getType());
        companyUnit.setEmail(cdto.getEmail());
        companyUnit.setFax(cdto.getFax());
        companyUnit.setWorkDay(cdto.getWorkDay());
        companyUnit.setUnitphoneNumber(cdto.getUnitPhoneNumber());
        companyUnit.setWorkingHour(cdto.getWorkingHour());

        // Save CompanyUnit and return the saved instance
        try {
            CompanyUnit savedCompanyUnit = companyUnitRepository.save(companyUnit);
            logger.info("Company Unit saved successfully with ID: " + savedCompanyUnit.getId());
            return savedCompanyUnit;
        } catch (Exception e) {
            logger.error("Error saving Company Unit", e);
            throw new RuntimeException("Could not save Company Unit", e);
        }
    }

	
}
