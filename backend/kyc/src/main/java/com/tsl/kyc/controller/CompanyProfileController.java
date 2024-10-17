package com.tsl.kyc.controller;

import com.tsl.kyc.dto.CompanyProfileAddDto;
import com.tsl.kyc.entity.CompanyProfile;
import com.tsl.kyc.entity.User;
import com.tsl.kyc.service.CompanyProfileService;
import com.tsl.kyc.service.UserService;

import java.util.List;
import java.util.UUID;

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
    public ResponseEntity<CompanyProfile> getCompanyProfileById(@PathVariable("id") UUID id) {
        CompanyProfile companyProfile = companyProfileService.getCompanyProfileById(id);
        return ResponseEntity.ok(companyProfile);
    }

    @PostMapping("/create")
    public ResponseEntity<CompanyProfile> createCompanyProfile(@RequestBody CompanyProfile companyProfile) {
        CompanyProfile createdCompanyProfile = companyProfileService.createCompanyProfile(companyProfile);
        return new ResponseEntity<>(createdCompanyProfile, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CompanyProfile> updateCompanyProfile(@PathVariable UUID id, @RequestBody CompanyProfileAddDto companyProfileAddDto) {
        CompanyProfile updatedCompanyProfile = companyProfileService.updateCompanyProfile(id, companyProfileAddDto);
        return new ResponseEntity<>(updatedCompanyProfile, HttpStatus.OK);
    }
    
    @GetMapping("/users/{id}")
    public List<User> getUsersByCompanyProfileId(@PathVariable UUID id){
    	return userService.getUserByCompanyProfileId(id);
    }
    
    @PostMapping("/save")
    public ResponseEntity<CompanyProfile> saveCompanyUnit(@RequestBody CompanyProfileAddDto cdto) {
        System.out.println("In Controller");
        CompanyProfile companyProfile=companyProfileService.saveCompanyProfile(cdto);
        return new ResponseEntity<CompanyProfile>(companyProfile, HttpStatus.CREATED);
    }
}
