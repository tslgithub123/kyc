package com.tsl.kyc.service;

import com.tsl.kyc.dto.CompanyProfileDto;
import com.tsl.kyc.dto.UserDto;
import com.tsl.kyc.entity.CompanyProfile;
import com.tsl.kyc.entity.User;
import com.tsl.kyc.exception.ResourceNotFoundException;
import com.tsl.kyc.repository.CompanyProfileRepository;
import com.tsl.kyc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyProfileService {

    @Autowired
    private CompanyProfileRepository companyProfileRepository;

    @Autowired
    private UserRepository userRepository;

    public CompanyProfileDto createCompanyProfile(CompanyProfileDto companyProfileDto) {
        CompanyProfile companyProfile = new CompanyProfile();
        companyProfile.setBranch(companyProfileDto.getBranch());
        companyProfile.setCategory(companyProfileDto.getCategory());
        companyProfile.setCity(companyProfileDto.getCity());
        companyProfile.setCompName(companyProfileDto.getCompName());
        companyProfile.setContPerDesig(companyProfileDto.getContPerDesig());
        companyProfile.setContPerName(companyProfileDto.getContPerName());
        companyProfile.setContPerNo(companyProfileDto.getContPerNo());
        companyProfile.setCountry(companyProfileDto.getCountry());
        companyProfile.setDistrict(companyProfileDto.getDistrict());
        companyProfile.setEmail(companyProfileDto.getEmail());
        companyProfile.setFax(companyProfileDto.getFax());
        companyProfile.setIndPrimary(companyProfileDto.getIndPrimary());
        companyProfile.setIndSecondary(companyProfileDto.getIndSecondary());
        companyProfile.setIndustryType(companyProfileDto.getIndustryType());
        companyProfile.setLastEnv(companyProfileDto.getLastEnv());
        companyProfile.setNoWorkDays(companyProfileDto.getNoWorkDays());
        companyProfile.setPhoneNo(companyProfileDto.getPhoneNo());
        companyProfile.setPincode(companyProfileDto.getPincode());
        companyProfile.setPlotNo(companyProfileDto.getPlotNo());
        companyProfile.setRo(companyProfileDto.getRo());
        companyProfile.setSro(companyProfileDto.getSro());
        companyProfile.setState(companyProfileDto.getState());
        companyProfile.setStreet(companyProfileDto.getStreet());
        companyProfile.setTaluka(companyProfileDto.getTaluka());
        companyProfile.setUan(companyProfileDto.getUan());
        companyProfile.setVillage(companyProfileDto.getVillage());
        companyProfile.setWebsite(companyProfileDto.getWebsite());
        companyProfile.setWorkingHour(companyProfileDto.getWorkingHour());
        companyProfile.setYearEstb(companyProfileDto.getYearEstb());
        companyProfile.setIdustryType(companyProfileDto.getIdustryType());
        companyProfile.setCompEmail(companyProfileDto.getCompEmail());

        // Save CompanyProfile
        CompanyProfile savedCompanyProfile = companyProfileRepository.save(companyProfile);

        // Save Users
        //List<UserDto> userDtos = companyProfileDto.getUsers();
//        List<User> users = userDtos.stream().map(dto -> {
//            User user = new User();
//            user.setUsername(dto.getUsername());
//            user.setPassword(dto.getPassword());
//            user.setEnabled(dto.getEnabled());
//            user.setDesignation(dto.getDesignation());
//            user.setCompanyProfile(savedCompanyProfile);
//            user.setFailedLoginCount(dto.getFailedLoginCount());
//            //user.setLastLoginDate(dto.getLastLoginDate());
//            user.setLocked(dto.getLocked());
//            return user;
//        }).collect(Collectors.toList());

//        userRepository.saveAll(users);

        return convertToDto(savedCompanyProfile);
    }

    public CompanyProfileDto updateCompanyProfile(Long id, CompanyProfileDto companyProfileDto) {
        CompanyProfile companyProfile = companyProfileRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("CompanyProfile not found"));

        companyProfile.setBranch(companyProfileDto.getBranch());
        companyProfile.setCategory(companyProfileDto.getCategory());
        companyProfile.setCity(companyProfileDto.getCity());
        companyProfile.setCompName(companyProfileDto.getCompName());
        companyProfile.setContPerDesig(companyProfileDto.getContPerDesig());
        companyProfile.setContPerName(companyProfileDto.getContPerName());
        companyProfile.setContPerNo(companyProfileDto.getContPerNo());
        companyProfile.setCountry(companyProfileDto.getCountry());
        companyProfile.setDistrict(companyProfileDto.getDistrict());
        companyProfile.setEmail(companyProfileDto.getEmail());
        companyProfile.setFax(companyProfileDto.getFax());
        companyProfile.setIndPrimary(companyProfileDto.getIndPrimary());
        companyProfile.setIndSecondary(companyProfileDto.getIndSecondary());
        companyProfile.setIndustryType(companyProfileDto.getIndustryType());
        companyProfile.setLastEnv(companyProfileDto.getLastEnv());
        companyProfile.setNoWorkDays(companyProfileDto.getNoWorkDays());
        companyProfile.setPhoneNo(companyProfileDto.getPhoneNo());
        companyProfile.setPincode(companyProfileDto.getPincode());
        companyProfile.setPlotNo(companyProfileDto.getPlotNo());
        companyProfile.setRo(companyProfileDto.getRo());
        companyProfile.setSro(companyProfileDto.getSro());
        companyProfile.setState(companyProfileDto.getState());
        companyProfile.setStreet(companyProfileDto.getStreet());
        companyProfile.setTaluka(companyProfileDto.getTaluka());
        companyProfile.setUan(companyProfileDto.getUan());
        companyProfile.setVillage(companyProfileDto.getVillage());
        companyProfile.setWebsite(companyProfileDto.getWebsite());
        companyProfile.setWorkingHour(companyProfileDto.getWorkingHour());
        companyProfile.setYearEstb(companyProfileDto.getYearEstb());
        companyProfile.setIdustryType(companyProfileDto.getIdustryType());
        companyProfile.setCompEmail(companyProfileDto.getCompEmail());

        // Update Users
//        List<UserDto> userDtos = companyProfileDto.getUsers();
//        List<User> users = userDtos.stream().map(dto -> {
//            User user = new User();
//            user.setUsername(dto.getUsername());
//            user.setPassword(dto.getPassword());
//            user.setEnabled(dto.getEnabled());
//            user.setDesignation(dto.getDesignation());
//            user.setCompanyProfile(companyProfile);
//            user.setFailedLoginCount(dto.getFailedLoginCount());
//            //user.setLastLoginDate(dto.getLastLoginDate());
//            user.setLocked(dto.getLocked());
//            return user;
//        }).collect(Collectors.toList());
//
//        userRepository.saveAll(users);

        CompanyProfile updatedCompanyProfile = companyProfileRepository.save(companyProfile);

        return convertToDto(updatedCompanyProfile);
    }
    
    public CompanyProfileDto getCompanyProfileById(Long id) {
        CompanyProfile companyProfile = companyProfileRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("CompanyProfile not found with id: " + id));

        return convertToDto(companyProfile);
    }

    private CompanyProfileDto convertToDto(CompanyProfile companyProfile) {
        CompanyProfileDto dto = new CompanyProfileDto();
        dto.setId(companyProfile.getId());
        dto.setBranch(companyProfile.getBranch());
        dto.setCategory(companyProfile.getCategory());
        dto.setCity(companyProfile.getCity());
        dto.setCompName(companyProfile.getCompName());
        dto.setContPerDesig(companyProfile.getContPerDesig());
        dto.setContPerName(companyProfile.getContPerName());
        dto.setContPerNo(companyProfile.getContPerNo());
        dto.setCountry(companyProfile.getCountry());
        dto.setDistrict(companyProfile.getDistrict());
        dto.setEmail(companyProfile.getEmail());
        dto.setFax(companyProfile.getFax());
        dto.setIndPrimary(companyProfile.getIndPrimary());
        dto.setIndSecondary(companyProfile.getIndSecondary());
        dto.setIndustryType(companyProfile.getIndustryType());
        dto.setLastEnv(companyProfile.getLastEnv());
        dto.setNoWorkDays(companyProfile.getNoWorkDays());
        dto.setPhoneNo(companyProfile.getPhoneNo());
        dto.setPincode(companyProfile.getPincode());
        dto.setPlotNo(companyProfile.getPlotNo());
        dto.setRo(companyProfile.getRo());
        dto.setSro(companyProfile.getSro());
        dto.setState(companyProfile.getState());
        dto.setStreet(companyProfile.getStreet());
        dto.setTaluka(companyProfile.getTaluka());
        dto.setUan(companyProfile.getUan());
        dto.setVillage(companyProfile.getVillage());
        dto.setWebsite(companyProfile.getWebsite());
        dto.setWorkingHour(companyProfile.getWorkingHour());
        dto.setYearEstb(companyProfile.getYearEstb());
        dto.setIdustryType(companyProfile.getIdustryType());
        dto.setCompEmail(companyProfile.getCompEmail());
        return dto;
    }
}
