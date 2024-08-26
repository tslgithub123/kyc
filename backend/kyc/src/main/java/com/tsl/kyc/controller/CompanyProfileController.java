package com.tsl.kyc.controller;

import com.tsl.kyc.dto.CompanyProfileDto;
import com.tsl.kyc.dto.UserDto;
import com.tsl.kyc.entity.CompanyProfile;
import com.tsl.kyc.entity.User;
import com.tsl.kyc.service.CompanyProfileService;
import com.tsl.kyc.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/company-profile")
public class CompanyProfileController {

    private final CompanyProfileService companyProfileService;
    
    private final UserService userService;

    public CompanyProfileController(CompanyProfileService companyProfileService, UserService userService) {
        this.companyProfileService = companyProfileService;
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<CompanyProfile> getAllCompanyProfiles() {
        return companyProfileService.getAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CompanyProfileDto> getCompanyProfileById(@PathVariable("id") Long id) {
        CompanyProfileDto companyProfileDTO = companyProfileService.getCompanyProfileById(id);
        return ResponseEntity.ok(companyProfileDTO);
    }

    @PostMapping("/create")
    public ResponseEntity<CompanyProfileDto> createCompanyProfile(@RequestBody CompanyProfileDto companyProfileDto) {
        CompanyProfileDto createdCompanyProfile = companyProfileService.createCompanyProfile(companyProfileDto);
        return new ResponseEntity<>(createdCompanyProfile, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CompanyProfileDto> updateCompanyProfile(@PathVariable Long id, @RequestBody CompanyProfileDto companyProfileDto) {
        CompanyProfileDto updatedCompanyProfile = companyProfileService.updateCompanyProfile(id, companyProfileDto);
        return new ResponseEntity<>(updatedCompanyProfile, HttpStatus.OK);
    }
    
    @GetMapping("/users/{id}")
    public List<UserDto> getUsersByCompanyProfileId(@PathVariable Integer id){
    	System.out.println("cf id: "+id);
    	return userService.getUserByCompanyProfileId(id);
    }
}
