package com.tsl.kyc.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.tsl.kyc.dto.IndustryScaleDto;
import com.tsl.kyc.entity.IndustryScale;
import com.tsl.kyc.exception.ResourceNotFoundException;
import com.tsl.kyc.repository.IndustryScaleRepository;

@Service
public class IndustryScaleService {
	
	private final IndustryScaleRepository industryScaleRepository;
	private static final Logger logger=LoggerFactory.getLogger(IndustryScaleService.class);
	

	public IndustryScaleService(IndustryScaleRepository industryScaleRepository) {
		this.industryScaleRepository = industryScaleRepository;
	}



	public IndustryScale getIndustryScale(String scaleName) {
		Optional<IndustryScale> industryScale=industryScaleRepository.getscaleName(scaleName);
		return industryScale.orElseThrow(()->new ResourceNotFoundException("Industry with name '" + scaleName + "' not found"));
	}



	public IndustryScale saveIndustryScale(IndustryScaleDto scaleDto) {
		try {
			IndustryScale industryScale=new IndustryScale();
			industryScale.setName(scaleDto.getIndustryScale());
			IndustryScale SavedIndustryScale=industryScaleRepository.save(industryScale);
			
			logger.info("IndustryScale saved Successfully"+SavedIndustryScale);
			
			return industryScale;
		} catch (Exception e) {
			logger.error("Error at Saving the IndustryScale"+e);
			throw new RuntimeException("Error at Saving the IndustryScale", e);
		}
		
	}
	

}
