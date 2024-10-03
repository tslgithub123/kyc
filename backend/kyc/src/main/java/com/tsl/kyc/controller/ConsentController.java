package com.tsl.kyc.controller;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.tsl.kyc.dto.ConsentDto;
//import com.tsl.kyc.entity.Consent;
//import com.tsl.kyc.service.ConsentService;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//import java.util.stream.Collectors;
//
//@RestController
//@RequestMapping("/api/consents")
//public class ConsentController {
//
//    @Autowired
//    private ConsentService consentService;
//
//    @GetMapping
//    public List<ConsentDto> getAllConsents() {
//        return consentService.findAll().stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<ConsentDto> getConsentById(@PathVariable UUID id) {
//        Optional<Consent> consent = consentService.findById(id);
//        return consent.map(this::convertToDTO)
//                      .map(ResponseEntity::ok)
//                      .orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    @PostMapping
//    public ResponseEntity<ConsentDto> createConsent(@RequestBody ConsentDto consentDTO) {
//        Consent consent = convertToEntity(consentDTO);
//        Consent savedConsent = consentService.save(consent);
//        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedConsent));
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<ConsentDto> updateConsent(@PathVariable UUID id, @RequestBody ConsentDto consentDTO) {
//        if (!consentService.findById(id).isPresent()) {
//            return ResponseEntity.notFound().build();
//        }
//        consentDTO.setId(id);
//        Consent updatedConsent = consentService.save(convertToEntity(consentDTO));
//        return ResponseEntity.ok(convertToDTO(updatedConsent));
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteConsent(@PathVariable UUID id) {
//        consentService.delete(id);
//        return ResponseEntity.noContent().build();
//    }
//
//    // Helper methods for conversion between entity and DTO
//    private ConsentDto convertToDTO(Consent consent) {
//        ConsentDto dto = new ConsentDto();
//        dto.setId(consent.getId());
//        dto.setCompanyProfileId(consent.getCompanyProfile().getId());
//        dto.setUserId(consent.getUser().getId());
//        dto.setConsNo(consent.getConsNo());
//        dto.setConsType(consent.getConsType());
//        dto.setConsStatus(consent.getConsStatus());
//        dto.setExpansionStatus(consent.getExpansionStatus());
//        dto.setIssueDate(consent.getIssueDate());
//        dto.setValidUpto(consent.getValidUpto());
//        dto.setGrossCi(consent.getGrossCi());
//        dto.setNoStaff(consent.getNoStaff());
//        dto.setNoWorker(consent.getNoWorker());
//        dto.setTotPlotArea(consent.getTotPlotArea());
//        dto.setTotPlotAreaUnit(consent.getTotPlotAreaUnit());
//        dto.setTotBuildArea(consent.getTotBuildArea());
//        dto.setTotBuildAreaUnit(consent.getTotBuildAreaUnit());
//        dto.setOpenSpaceArea(consent.getOpenSpaceArea());
//        dto.setOpenSpaceAreaUnit(consent.getOpenSpaceAreaUnit());
//        dto.setTotGreenArea(consent.getTotGreenArea());
//        dto.setTotGreenAreaUnit(consent.getTotGreenAreaUnit());
//        dto.setConsentFilePath(consent.getConsentFilePath());
//        dto.setConsentFileName(consent.getConsentFileName());
//        dto.setCreatedDate(consent.getCreatedDate());
//        dto.setGrossCiUnits(consent.getGrossCiUnits());
//        return dto;
//    }
//
//    private Consent convertToEntity(ConsentDto dto) {
//        Consent consent = new Consent();
//        consent.setId(dto.getId());
//        // Set relationships here using service or repository if needed
//        consent.setConsNo(dto.getConsNo());
//        consent.setConsType(dto.getConsType());
//        consent.setConsStatus(dto.getConsStatus());
//        consent.setExpansionStatus(dto.getExpansionStatus());
//        consent.setIssueDate(dto.getIssueDate());
//        consent.setValidUpto(dto.getValidUpto());
//        consent.setGrossCi(dto.getGrossCi());
//        consent.setNoStaff(dto.getNoStaff());
//        consent.setNoWorker(dto.getNoWorker());
//        consent.setTotPlotArea(dto.getTotPlotArea());
//        consent.setTotPlotAreaUnit(dto.getTotPlotAreaUnit());
//        consent.setTotBuildArea(dto.getTotBuildArea());
//        consent.setTotBuildAreaUnit(dto.getTotBuildAreaUnit());
//        consent.setOpenSpaceArea(dto.getOpenSpaceArea());
//        consent.setOpenSpaceAreaUnit(dto.getOpenSpaceAreaUnit());
//        consent.setTotGreenArea(dto.getTotGreenArea());
//        consent.setTotGreenAreaUnit(dto.getTotGreenAreaUnit());
//        consent.setConsentFilePath(dto.getConsentFilePath());
//        consent.setConsentFileName(dto.getConsentFileName());
//        consent.setCreatedDate(dto.getCreatedDate());
//        consent.setGrossCiUnits(dto.getGrossCiUnits());
//        return consent;
//    }
//}



import com.tsl.kyc.dto.ConsentDto;
import com.tsl.kyc.entity.Consent;
import com.tsl.kyc.entity.CompanyProfile;
import com.tsl.kyc.entity.User;
import com.tsl.kyc.exception.ResourceNotFoundException;
import com.tsl.kyc.service.ConsentService;
import com.tsl.kyc.repository.CompanyProfileRepository;
import com.tsl.kyc.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/consents")
public class ConsentController {

    @Autowired
    private ConsentService consentService;

    @Autowired
    private CompanyProfileRepository companyProfileRepository;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ConsentDto> createConsent(@RequestBody ConsentDto consentDTO) {
        CompanyProfile companyProfile = companyProfileRepository.findById(consentDTO.getCompanyProfileId())
                .orElseThrow(() -> new ResourceNotFoundException("CompanyProfile not found"));
        User user = userRepository.findById(consentDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Consent consent = new Consent();
        consent.setCompanyProfile(companyProfile);
        consent.setUser(user);
        consent.setConsNo(consentDTO.getConsNo());
        consent.setConsType(consentDTO.getConsType());
        consent.setConsStatus(consentDTO.getConsStatus());
        consent.setExpansionStatus(consentDTO.getExpansionStatus());
        consent.setIssueDate(consentDTO.getIssueDate());
        consent.setValidUpto(consentDTO.getValidUpto());
        consent.setGrossCi(consentDTO.getGrossCi());
        consent.setNoStaff(consentDTO.getNoStaff());
        consent.setNoWorker(consentDTO.getNoWorker());
        consent.setTotPlotArea(consentDTO.getTotPlotArea());
        consent.setTotPlotAreaUnit(consentDTO.getTotPlotAreaUnit());
        consent.setTotBuildArea(consentDTO.getTotBuildArea());
        consent.setTotBuildAreaUnit(consentDTO.getTotBuildAreaUnit());
        consent.setOpenSpaceArea(consentDTO.getOpenSpaceArea());
        consent.setOpenSpaceAreaUnit(consentDTO.getOpenSpaceAreaUnit());
        consent.setTotGreenArea(consentDTO.getTotGreenArea());
        consent.setTotGreenAreaUnit(consentDTO.getTotGreenAreaUnit());
        consent.setConsentFilePath(consentDTO.getConsentFilePath());
        consent.setConsentFileName(consentDTO.getConsentFileName());
        consent.setCreatedDate(consentDTO.getCreatedDate());
        consent.setGrossCiUnits(consentDTO.getGrossCiUnits());

        Consent savedConsent = consentService.save(consent);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDto(savedConsent));
    }

    private ConsentDto convertToDto(Consent consent) {
        ConsentDto dto = new ConsentDto();
        dto.setId(consent.getId());
        dto.setCompanyProfileId(consent.getCompanyProfile().getId());
        dto.setUserId(consent.getUser().getId());
        dto.setConsNo(consent.getConsNo());
        dto.setConsType(consent.getConsType());
        dto.setConsStatus(consent.getConsStatus());
        dto.setExpansionStatus(consent.getExpansionStatus());
        dto.setIssueDate(consent.getIssueDate());
        dto.setValidUpto(consent.getValidUpto());
        dto.setGrossCi(consent.getGrossCi());
        dto.setNoStaff(consent.getNoStaff());
        dto.setNoWorker(consent.getNoWorker());
        dto.setTotPlotArea(consent.getTotPlotArea());
        dto.setTotPlotAreaUnit(consent.getTotPlotAreaUnit());
        dto.setTotBuildArea(consent.getTotBuildArea());
        dto.setTotBuildAreaUnit(consent.getTotBuildAreaUnit());
        dto.setOpenSpaceArea(consent.getOpenSpaceArea());
        dto.setOpenSpaceAreaUnit(consent.getOpenSpaceAreaUnit());
        dto.setTotGreenArea(consent.getTotGreenArea());
        dto.setTotGreenAreaUnit(consent.getTotGreenAreaUnit());
        dto.setConsentFilePath(consent.getConsentFilePath());
        dto.setConsentFileName(consent.getConsentFileName());
        dto.setCreatedDate(consent.getCreatedDate());
        dto.setGrossCiUnits(consent.getGrossCiUnits());
        return dto;
    }

    @GetMapping
    public List<ConsentDto> getAllConsents() {
        return consentService.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsentDto> getConsentById(@PathVariable UUID id) {
        Optional<Consent> consent = consentService.findById(id);
        return consent.map(this::convertToDto)
                      .map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

//    @PostMapping
//    public ResponseEntity<ConsentDto> createConsent(@RequestBody ConsentDto consentDTO) {
//        Consent consent = convertToEntity(consentDTO);
//        Consent savedConsent = consentService.save(consent);
//        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedConsent));
//    }

//    @PutMapping("/{id}")
//    public ResponseEntity<ConsentDto> updateConsent(@PathVariable UUID id, @RequestBody ConsentDto consentDTO) {
//        // Check if the consent exists
//        Consent existingConsent = consentService.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Consent not found"));
//
//        // Fetch the associated CompanyProfile and User, similar to the create method
//        CompanyProfile companyProfile = companyProfileRepository.findById(consentDTO.getCompanyProfileId())
//                .orElseThrow(() -> new ResourceNotFoundException("CompanyProfile not found"));
//        User user = userRepository.findById(consentDTO.getUserId())
//                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//
//        // Update the existing consent with new values
//        existingConsent.setCompanyProfile(companyProfile);
//        existingConsent.setUser(user);
//        existingConsent.setConsNo(consentDTO.getConsNo());
//        existingConsent.setConsType(consentDTO.getConsType());
//        existingConsent.setConsStatus(consentDTO.getConsStatus());
//        existingConsent.setExpansionStatus(consentDTO.getExpansionStatus());
//        existingConsent.setIssueDate(consentDTO.getIssueDate());
//        existingConsent.setValidUpto(consentDTO.getValidUpto());
//        existingConsent.setGrossCi(consentDTO.getGrossCi());
//        existingConsent.setNoStaff(consentDTO.getNoStaff());
//        existingConsent.setNoWorker(consentDTO.getNoWorker());
//        existingConsent.setTotPlotArea(consentDTO.getTotPlotArea());
//        existingConsent.setTotPlotAreaUnit(consentDTO.getTotPlotAreaUnit());
//        existingConsent.setTotBuildArea(consentDTO.getTotBuildArea());
//        existingConsent.setTotBuildAreaUnit(consentDTO.getTotBuildAreaUnit());
//        existingConsent.setOpenSpaceArea(consentDTO.getOpenSpaceArea());
//        existingConsent.setOpenSpaceAreaUnit(consentDTO.getOpenSpaceAreaUnit());
//        existingConsent.setTotGreenArea(consentDTO.getTotGreenArea());
//        existingConsent.setTotGreenAreaUnit(consentDTO.getTotGreenAreaUnit());
//        existingConsent.setConsentFilePath(consentDTO.getConsentFilePath());
//        existingConsent.setConsentFileName(consentDTO.getConsentFileName());
//        existingConsent.setCreatedDate(consentDTO.getCreatedDate());
//        existingConsent.setGrossCiUnits(consentDTO.getGrossCiUnits());
//
//        // Save the updated consent
//        Consent updatedConsent = consentService.save(existingConsent);
//        return ResponseEntity.ok(convertToDto(updatedConsent));
//    }

//    @PutMapping("/{id}")
//    public ResponseEntity<ConsentDto> updateConsent(@PathVariable UUID id, @RequestBody ConsentDto consentDTO) {
//        if (!consentService.findById(id).isPresent()) {
//            return ResponseEntity.notFound().build();
//        }
//        consentDTO.setId(id);
//        Consent updatedConsent = consentService.save(convertToDto(consentDTO));
//        return ResponseEntity.ok(convertToDto(updatedConsent));
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsent(@PathVariable UUID id) {
        consentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
