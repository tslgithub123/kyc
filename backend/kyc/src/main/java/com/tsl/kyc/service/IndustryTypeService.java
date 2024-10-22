package com.tsl.kyc.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.tsl.kyc.dto.IndustryTypeDto;
import com.tsl.kyc.entity.IndustryType;
import com.tsl.kyc.exception.ResourceNotFoundException;
import com.tsl.kyc.repository.IndustryScaleRepository;
import com.tsl.kyc.repository.IndustryTypeRepository;

@Service
public class IndustryTypeService {
	
	private final IndustryTypeRepository industryTypeRepository;
	private static final Logger logger=LoggerFactory.getLogger(IndustryTypeService.class);
	

	public IndustryTypeService(IndustryTypeRepository industryTypeRepository) {
		super();
		this.industryTypeRepository = industryTypeRepository;
	}


	public IndustryType getIndustryType(String typeName) {
		Optional<IndustryType> industryType=industryTypeRepository.getIndustryType(typeName);
		return industryType.orElseThrow(()->new ResourceNotFoundException("Industry Type : '" + typeName + "' not found"));
	}


	public IndustryType saveIndustryType(IndustryTypeDto typeDto) {
		try {
			IndustryType industryType=new IndustryType();
			industryType.setName(typeDto.getIndustryType());
			
			IndustryType savedIndustryType=industryTypeRepository.save(industryType);
			logger.info("IndustryType saved successfully :"+savedIndustryType);
			return savedIndustryType;
		} catch (Exception e) {
			logger.error("Error at the Saving IndustryType",e);
			throw new RuntimeException("Error at the Saving IndustryType", e);
		}
	}

}
