package com.tsl.kyc.controller;

import com.tsl.kyc.dto.CompanyProfileDto;
import com.tsl.kyc.service.CompanyProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/company-profile")
public class CompanyProfileController {

    @Autowired
    private CompanyProfileService companyProfileService;
    
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
}
