package com.tsl.kyc.service;

import com.tsl.kyc.entity.CompanyProfile;
import com.tsl.kyc.exception.ResourceNotFoundException;
import com.tsl.kyc.repository.CompanyProfileRepository;
import com.tsl.kyc.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CompanyProfileService {

    private final CompanyProfileRepository companyProfileRepository;

    private final UserRepository userRepository;

    public CompanyProfileService(CompanyProfileRepository companyProfileRepository, UserRepository userRepository) {
        this.companyProfileRepository = companyProfileRepository;
        this.userRepository = userRepository;
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
        companyProfile.setBranch(companyProfileDto.getBranch());
        companyProfile.setCategory(companyProfileDto.getCategory());
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

    public CompanyProfile updateCompanyProfile(UUID id, CompanyProfile companyProfileDto) {
        CompanyProfile companyProfile = companyProfileRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("CompanyProfile not found"));

        companyProfile.setBranch(companyProfileDto.getBranch());
        companyProfile.setCategory(companyProfileDto.getCategory());

//        companyProfile.setCity(companyProfileDto.getCity());
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

        CompanyProfile updatedCompanyProfile = companyProfileRepository.save(companyProfile);

        return updatedCompanyProfile;
    }
    
    public CompanyProfile getCompanyProfileById(UUID id) {
        return companyProfileRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("CompanyProfile not found with id: " + id));
    }

    private CompanyProfile convertToDto(CompanyProfile companyProfile) {
        CompanyProfile dto = new CompanyProfile();
        dto.setId(companyProfile.getId());
        dto.setBranch(companyProfile.getBranch());
        dto.setCategory(companyProfile.getCategory());
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
}
