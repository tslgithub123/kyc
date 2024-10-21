package com.tsl.kyc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tsl.kyc.dto.IndustryLinkDto;
import com.tsl.kyc.entity.IndustryLink;
import com.tsl.kyc.service.IndustryLinkService;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/industry-link")
public class IndustryLinkController {
	
	private final IndustryLinkService industryLinkService;
	
	public IndustryLinkController(IndustryLinkService industryLinkService) {
		this.industryLinkService=industryLinkService;
	}
	
	@PostMapping("/save")
	public ResponseEntity<IndustryLink> saveIndustryLink(@RequestBody IndustryLinkDto dto) {
		return new ResponseEntity<IndustryLink>(industryLinkService.saveIndustryLink(dto),HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteIndustryLink(@PathVariable UUID id) {
		 return industryLinkService.deleteById(id);
	}
}
