package com.tsl.kyc.service;

import com.tsl.kyc.dto.AddressDto;
import com.tsl.kyc.dto.CompanyUnitDto;
import com.tsl.kyc.entity.Address;
import com.tsl.kyc.entity.CompanyProfile;
import com.tsl.kyc.entity.CompanyUnit;
import com.tsl.kyc.entity.IndustryLink;
import com.tsl.kyc.exception.ResourceNotFoundException;
import com.tsl.kyc.repository.CompanyUnitRepository;
import com.tsl.kyc.security.IdorSecurityService;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class CompanyUnitService {

    private final CompanyUnitRepository companyUnitRepository;
    private final CompanyProfileService companyProfileService;
    private final AddressService addressService;
    private final IndustryLinkService industryLinkService;
    private final ModelMapper modelMapper;
    private static final Logger logger = LoggerFactory.getLogger(CompanyUnitService.class);

    public CompanyUnitService(CompanyUnitRepository companyUnitRepository, IdorSecurityService idorSecurityService,CompanyProfileService companyProfileService,AddressService addressService,IndustryLinkService industryLinkService,ModelMapper modelMapper) {
        this.companyUnitRepository = companyUnitRepository;
        this.companyProfileService=companyProfileService;
        this.addressService=addressService;
        this.industryLinkService=industryLinkService;
        this.modelMapper=modelMapper;
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

    @Transactional
    public CompanyUnit updateCompanyUnit(UUID id, CompanyUnitDto cdto) {
        CompanyUnit existingCompanyUnit = companyUnitRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Company Unit Not Exit In System of Id :"+id));
        
 //     CompanyProfile companyProfile=companyProfileService.getCompanyProfileById(cdto.getCompanyUuid());
//      Address address=addressService.getAddressById(existingCompanyUnit.getAddress().getId());
        AddressDto addressDto=new AddressDto();
        addressDto.setStreet(cdto.getStreet());
        addressDto.setLine2(cdto.getLine2());
        addressDto.setCity(cdto.getCity());
        addressDto.setState(cdto.getState());
        addressDto.setDistrict(cdto.getDistrict());
        addressDto.setCountry(cdto.getCountry());
        addressDto.setPincode(cdto.getPincode());
        addressDto.setVillage(cdto.getVillage());
        addressDto.setTaluka(cdto.getTaluka());
        addressDto.setPlotNumber(cdto.getPlotNumber());
        addressDto.setRo(cdto.getRo());
        addressDto.setSro(cdto.getSro());
        
        Address address=addressService.updateAddress(existingCompanyUnit.getAddress().getId(),addressDto);
        
        IndustryLink industryLink=industryLinkService.updateIndustryLink(existingCompanyUnit.getIndustryLink().getId(),cdto.getIndCatName(),cdto.getIndScaleName());
        //Set the Data.
        existingCompanyUnit.setIndustryLink(industryLink);
        existingCompanyUnit.setAddress(address);
        existingCompanyUnit.setName(cdto.getName());
        existingCompanyUnit.setType(cdto.getType());
        existingCompanyUnit.setEmail(cdto.getEmail());
        existingCompanyUnit.setFax(cdto.getFax());
        existingCompanyUnit.setUnitphoneNumber(cdto.getUnitPhoneNumber());
        existingCompanyUnit.setWorkDay(cdto.getWorkDay());
        existingCompanyUnit.setWorkingHour(cdto.getWorkingHour());
        
        return companyUnitRepository.save(existingCompanyUnit);
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
