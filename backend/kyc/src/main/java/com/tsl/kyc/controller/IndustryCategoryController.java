package com.tsl.kyc.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tsl.kyc.dto.IndustryCategoryDto;
import com.tsl.kyc.entity.IndustryCategory;
import com.tsl.kyc.service.IndustryCategoryService;

@RestController
@RequestMapping("/api/industry-category")
public class IndustryCategoryController {
	private final IndustryCategoryService industryCategoryService;
	
	public IndustryCategoryController(IndustryCategoryService industryCategoryService) {
		this.industryCategoryService=industryCategoryService;
	}
	
	@PostMapping("/save")
	public ResponseEntity<IndustryCategory> saveIndustryCategory(@RequestBody IndustryCategoryDto dto) {
		return new ResponseEntity<IndustryCategory>(industryCategoryService.saveIndustryCategory(dto),HttpStatus.OK);
	}
}
