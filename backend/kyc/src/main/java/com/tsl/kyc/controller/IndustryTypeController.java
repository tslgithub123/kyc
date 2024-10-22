package com.tsl.kyc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tsl.kyc.dto.IndustryTypeDto;
import com.tsl.kyc.entity.IndustryType;
import com.tsl.kyc.service.IndustryTypeService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/industry-type")
public class IndustryTypeController {
	private final IndustryTypeService industryTypeService;
	
	public IndustryTypeController(IndustryTypeService industryTypeService) {
		this.industryTypeService=industryTypeService;
	}
	
	@PostMapping("/save")
	public ResponseEntity<IndustryType> saveIndustryType(@RequestBody IndustryTypeDto dto) {
		return new ResponseEntity<IndustryType>(industryTypeService.saveIndustryType(dto),HttpStatus.CREATED);
	}
	
	
}
