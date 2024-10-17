package com.tsl.kyc.service;

import com.tsl.kyc.dto.CompanyProfileAddDto;
import com.tsl.kyc.entity.CompanyProfile;
import com.tsl.kyc.entity.ContactPerson;
import com.tsl.kyc.exception.ResourceNotFoundException;
import com.tsl.kyc.repository.CompanyProfileRepository;
import jakarta.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CompanyProfileService {

    private final CompanyProfileRepository companyProfileRepository;
    private final ContactPersonService contactPersonService;
    private static final Logger logger = LoggerFactory.getLogger(CompanyUnitService.class);
    private final ModelMapper modelMapper; 

    public CompanyProfileService(CompanyProfileRepository companyProfileRepository,ContactPersonService contactPersonService,ModelMapper modelMapper) {
        this.companyProfileRepository = companyProfileRepository;
        this.contactPersonService=contactPersonService;
        this.modelMapper = modelMapper;
    }

    public CompanyProfile findById(UUID id) {
        return companyProfileRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("CompanyProfile not found with id: " + id));
    }
    
    public List<CompanyProfile> getAll(){
    	return companyProfileRepository.findAll();
    }
    

    public CompanyProfile createCompanyProfile(CompanyProfile companyProfileDto) {
        CompanyProfile companyProfile = new CompanyProfile();

//        companyProfile.getAddresses().setCity(companyProfileDto.getCity());
//        companyProfile.setCompName(companyProfileDto.getCompName());
//        companyProfile.setContPerDesig(companyProfileDto.getContPerDesig());
//        companyProfile.setContPerName(companyProfileDto.getContPerName());
//        companyProfile.setContPerNo(companyProfileDto.getContPerNo());
//        companyProfile.setCountry(companyProfileDto.getCountry());
//        companyProfile.setDistrict(companyProfileDto.getDistrict());
//        companyProfile.setEmail(companyProfileDto.getEmail());
//        companyProfile.setFax(companyProfileDto.getFax());
//        companyProfile.setIndPrimary(companyProfileDto.getIndPrimary());
//        companyProfile.setIndSecondary(companyProfileDto.getIndSecondary());
//        companyProfile.setIndustryType(companyProfileDto.getIndustryType());
//        companyProfile.setLastEnv(companyProfileDto.getLastEnv());
//        companyProfile.setNoWorkDays(companyProfileDto.getNoWorkDays());
//        companyProfile.setPhoneNo(companyProfileDto.getPhoneNo());
//        companyProfile.setPincode(companyProfileDto.getPincode());
//        companyProfile.setPlotNo(companyProfileDto.getPlotNo());
//        companyProfile.setRo(companyProfileDto.getRo());
//        companyProfile.setSro(companyProfileDto.getSro());
//        companyProfile.setState(companyProfileDto.getState());
//        companyProfile.setStreet(companyProfileDto.getStreet());
//        companyProfile.setTaluka(companyProfileDto.getTaluka());
//        companyProfile.setUan(companyProfileDto.getUan());
//        companyProfile.setVillage(companyProfileDto.getVillage());
//        companyProfile.setWebsite(companyProfileDto.getWebsite());
//        companyProfile.setWorkingHour(companyProfileDto.getWorkingHour());
//        companyProfile.setYearEstb(companyProfileDto.getYearEstb());
//        companyProfile.setCompEmail(companyProfileDto.getCompEmail());

        // Save CompanyProfile
        CompanyProfile savedCompanyProfile = companyProfileRepository.save(companyProfile);

        return savedCompanyProfile;
    }

    public CompanyProfile updateCompanyProfile(UUID id, CompanyProfileAddDto cDto) {
        CompanyProfile companyProfile = companyProfileRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("CompanyProfile not found"));

        	companyProfile.getContactPerson().setName(cDto.getPersonName());
        	companyProfile.getContactPerson().setDesignation(cDto.getPersonDesignation());
        	companyProfile.getContactPerson().setPhone(cDto.getPersonPhone());
        	companyProfile.getContactPerson().setEmail(cDto.getPersonEmail());
        	companyProfile.setMpcbid(cDto.getMpcbId());
        	companyProfile.setName(cDto.getCompanyName());
        	companyProfile.setEmail(cDto.getCompanyEmail());
        	companyProfile.setFax(cDto.getCompanyFax());
        	companyProfile.setLastEnvironment(cDto.getLastEnvironment());
        	companyProfile.setPhoneNumber(cDto.getCompanyPhoneNumber());
        	companyProfile.setWebsite(cDto.getCompanyWebsite());
        	companyProfile.setYearEstablished(cDto.getYearEstalished());

        try {
        	CompanyProfile updatedCompanyProfile = companyProfileRepository.save(companyProfile);
        	logger.info("Data Updated Successfully with ID :"+updatedCompanyProfile.getId());
        	return updatedCompanyProfile;
		} catch (Exception e) {
			logger.error("Error at Update Company Profile", e);
            throw new RuntimeException("Could not Update Company Profile :", e);
		}
    }
    
    
    
    public CompanyProfile getCompanyProfileById(UUID id) {
        return companyProfileRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("CompanyProfile not found with id: " + id));
    }

    private CompanyProfile convertToDto(CompanyProfile companyProfile) {
        CompanyProfile dto = new CompanyProfile();
        dto.setId(companyProfile.getId());

//        dto.setCity(companyProfile.getCity());
//        dto.setCompName(companyProfile.getCompName());
//        dto.setContPerDesig(companyProfile.getContPerDesig());
//        dto.setContPerName(companyProfile.getContPerName());
//        dto.setContPerNo(companyProfile.getContPerNo());
//        dto.setCountry(companyProfile.getCountry());
//        dto.setDistrict(companyProfile.getDistrict());
//        dto.setEmail(companyProfile.getEmail());
//        dto.setFax(companyProfile.getFax());
//        dto.setIndPrimary(companyProfile.getIndPrimary());
//        dto.setIndSecondary(companyProfile.getIndSecondary());
//        dto.setIndustryType(companyProfile.getIndustryType());
//        dto.setLastEnv(companyProfile.getLastEnv());
//        dto.setNoWorkDays(companyProfile.getNoWorkDays());
//        dto.setPhoneNo(companyProfile.getPhoneNo());
//        dto.setPincode(companyProfile.getPincode());
//        dto.setPlotNo(companyProfile.getPlotNo());
//        dto.setRo(companyProfile.getRo());
//        dto.setSro(companyProfile.getSro());
//        dto.setState(companyProfile.getState());
//        dto.setStreet(companyProfile.getStreet());
//        dto.setTaluka(companyProfile.getTaluka());
//        dto.setUan(companyProfile.getUan());
//        dto.setVillage(companyProfile.getVillage());
//        dto.setWebsite(companyProfile.getWebsite());
//        dto.setWorkingHour(companyProfile.getWorkingHour());
//        dto.setYearEstb(companyProfile.getYearEstb());
//        dto.setCompEmail(companyProfile.getCompEmail());
        return dto;
    }

    @Transactional
    public CompanyProfile saveCompanyProfile(CompanyProfileAddDto cdto) {
        
        ContactPerson contactPerson=new ContactPerson();
        CompanyProfile companyProfile = new CompanyProfile();
        
        //Fetch Contact Person
        contactPerson.setName(cdto.getPersonName());
        contactPerson.setDesignation(cdto.getPersonDesignation());
        contactPerson.setPhone(cdto.getPersonPhone());
        contactPerson.setEmail(cdto.getPersonEmail());
        
        contactPerson=contactPersonService.saveContactPerson(contactPerson);
        
        // Fetch CompanyProfile
        companyProfile.setContactPerson(contactPerson);
        companyProfile.setMpcbid(cdto.getMpcbId());
        companyProfile.setName(cdto.getCompanyName());
        companyProfile.setEmail(cdto.getCompanyEmail());
        companyProfile.setFax(cdto.getCompanyFax());
        companyProfile.setLastEnvironment(cdto.getLastEnvironment());
        companyProfile.setPhoneNumber(cdto.getCompanyPhoneNumber());
        companyProfile.setWebsite(cdto.getCompanyWebsite());
        companyProfile.setYearEstablished(cdto.getYearEstalished());
        
        // Save CompanyUnit and return the saved instance
        try {
            CompanyProfile savedCompanyProfile= companyProfileRepository.save(companyProfile);
            logger.info("Company Unit saved successfully with ID: " );
            return savedCompanyProfile;
        } catch (Exception e) {
            logger.error("Error saving Company Unit", e);
            throw new RuntimeException("Could not save Company Unit", e);
        }
    }
    
    
}
