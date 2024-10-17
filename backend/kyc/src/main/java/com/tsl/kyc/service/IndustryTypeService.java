package com.tsl.kyc.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.tsl.kyc.entity.IndustryType;
import com.tsl.kyc.exception.ResourceNotFoundException;
import com.tsl.kyc.repository.IndustryScaleRepository;
import com.tsl.kyc.repository.IndustryTypeRepository;

@Service
public class IndustryTypeService {
	
	private final IndustryTypeRepository industryTypeRepository;
	

	public IndustryTypeService(IndustryTypeRepository industryTypeRepository) {
		super();
		this.industryTypeRepository = industryTypeRepository;
	}


	public IndustryType getIndustryType(String typeName) {
		Optional<IndustryType> industryType=industryTypeRepository.getIndustryType(typeName);
		return industryType.orElseThrow(()->new ResourceNotFoundException("Industry Type : '" + typeName + "' not found"));
	}

}
