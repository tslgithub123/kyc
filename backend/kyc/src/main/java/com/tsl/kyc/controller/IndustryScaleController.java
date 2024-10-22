package com.tsl.kyc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tsl.kyc.dto.IndustryScaleDto;
import com.tsl.kyc.entity.IndustryScale;
import com.tsl.kyc.service.IndustryScaleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/industry-scale")
public class IndustryScaleController {
	private final IndustryScaleService industryScaleService;
	
	public IndustryScaleController(IndustryScaleService industryScaleService) {
		this.industryScaleService=industryScaleService;
	}
	
	@PostMapping("/save")
	public ResponseEntity<IndustryScale> saveIndustryScale(@RequestBody IndustryScaleDto dto) {
		return new ResponseEntity<IndustryScale>(industryScaleService.saveIndustryScale(dto),HttpStatus.CREATED);
	}
	
}
