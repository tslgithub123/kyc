package com.tsl.kyc.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.tsl.kyc.entity.IndustryScale;
import com.tsl.kyc.exception.ResourceNotFoundException;
import com.tsl.kyc.repository.IndustryScaleRepository;

@Service
public class IndustryScaleService {
	
	private final IndustryScaleRepository industryScaleRepository;

	

	public IndustryScaleService(IndustryScaleRepository industryScaleRepository) {
		this.industryScaleRepository = industryScaleRepository;
	}



	public IndustryScale getIndustryScale(String scaleName) {
		Optional<IndustryScale> industryScale=industryScaleRepository.getscaleName(scaleName);
		return industryScale.orElseThrow(()->new ResourceNotFoundException("Industry with name '" + scaleName + "' not found"));
	}
	

}
