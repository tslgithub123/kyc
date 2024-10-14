package com.tsl.kyc.controller;

import com.tsl.kyc.dto.CompanyUnitOptionsDto;
import com.tsl.kyc.entity.CompanyUnit;
import com.tsl.kyc.service.CompanyUnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/company-unit")
public class CompanyUnitController {

    private final CompanyUnitService companyUnitService;

    public CompanyUnitController(CompanyUnitService companyUnitService) {
        this.companyUnitService = companyUnitService;
    }

    @GetMapping("/{id}")
    public CompanyUnit getCompanyUnitById(@PathVariable UUID id) {
        return companyUnitService.getCompanyUnitById(id);
    }

    @GetMapping("/all")
    public List<CompanyUnit> getAllCompanyUnits() {
        return companyUnitService.getAllCompanyUnits();
    }

    @GetMapping("/company-profile/{id}")
    public List<CompanyUnit> getCompanyUnitsByCompanyProfileId(@PathVariable UUID id){
    	return companyUnitService.getCompanyUnitsByCompanyProfileId(id);
    }

    @GetMapping("/company-profile/options/{id}")
    public List<CompanyUnitOptionsDto> getCompanyUnitsOptionsByCompanyProfileId(@PathVariable UUID id){
        List<CompanyUnit> companyUnit = companyUnitService.getCompanyUnitsByCompanyProfileId(id);
        List<CompanyUnitOptionsDto> companyUnitOptionsDto = new ArrayList<>();
        for(CompanyUnit cu : companyUnit){
            CompanyUnitOptionsDto dto = new CompanyUnitOptionsDto();
            dto.setCompanyUnitId(cu.getId());
            dto.setCompanyUnitName(cu.getName());
            companyUnitOptionsDto.add(dto);
        }
        return companyUnitOptionsDto;
    }
}
