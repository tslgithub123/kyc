package com.tsl.kyc.controller;

import com.tsl.kyc.dto.CompanyUnitDto;
import com.tsl.kyc.entity.CompanyUnit;
import com.tsl.kyc.service.CompanyUnitService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/company-unit")
public class CompanyUnitController {

    private final CompanyUnitService companyUnitService;
    private static final Logger logger=LoggerFactory.getLogger(CompanyUnitController.class);

    public CompanyUnitController(CompanyUnitService companyUnitService) {
        this.companyUnitService = companyUnitService;
    }

    @GetMapping("/all")
    public List<CompanyUnit> getAllCompanyUnits() {
        return companyUnitService.getAllCompanyUnits();
    }

    @GetMapping("/byprofile/{id}")
    public List<CompanyUnit> getCompanyUnitsByCompanyProfileId(@PathVariable UUID id){
    	System.out.println("In Controller");
    	return companyUnitService.getCompanyUnitsByCompanyProfileId(id);
    }
    
    @GetMapping("/byunit/{companyUnitId}")
    public ResponseEntity<CompanyUnit> getCompanyUnitById(@PathVariable UUID companyUnitId){
    	CompanyUnit companyUnit=companyUnitService.getCompanyUnitById(companyUnitId);
    	return new ResponseEntity<CompanyUnit>(companyUnit, HttpStatus.OK);
    }
    
    @PostMapping("/create")
    public ResponseEntity<CompanyUnit> saveCompanyUnit(@RequestBody CompanyUnitDto cdto) {
        System.out.println("In Controller");
        CompanyUnit companyUnit=companyUnitService.saveUnit(cdto);
        return new ResponseEntity<CompanyUnit>(companyUnit, HttpStatus.CREATED);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<CompanyUnit> editCompanyUnit(@PathVariable UUID id,@RequestBody CompanyUnitDto dto) {
    	logger.info("In Controller");
    	CompanyUnit companyUnit=companyUnitService.updateCompanyUnit(id,dto);
        return new ResponseEntity<CompanyUnit>(companyUnit, HttpStatus.OK);
		
    }
    
    
}
