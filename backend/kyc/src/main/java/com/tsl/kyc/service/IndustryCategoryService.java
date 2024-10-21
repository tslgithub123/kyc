package com.tsl.kyc.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.tsl.kyc.dto.IndustryCategoryDto;
import com.tsl.kyc.entity.IndustryCategory;
import com.tsl.kyc.exception.ResourceNotFoundException;
import com.tsl.kyc.repository.IndustryCategoryRepository;

@Service
public class IndustryCategoryService {

	private final IndustryCategoryRepository industryCategoryRepository;
	private static final Logger logger=LoggerFactory.getLogger(IndustryCategoryService.class);
	
	public IndustryCategoryService(IndustryCategoryRepository industryCategoryRepository) {
		super();
		this.industryCategoryRepository = industryCategoryRepository;
	}


	public IndustryCategory getIndustryCategory(String categoryName) {
	    Optional<IndustryCategory> category = industryCategoryRepository.getByName(categoryName);
	    return category.orElseThrow(() -> new ResourceNotFoundException("Category with name '" + categoryName + "' not found"));
	}


	public IndustryCategory saveIndustryCategory(IndustryCategoryDto categoryDto) {
	    try {
	        // Convert DTO to entity
	        IndustryCategory industryCategory = new IndustryCategory();
	        industryCategory.setName(categoryDto.getIndustryCategory());
	        
	        // Save entity
	        IndustryCategory savedCategory = industryCategoryRepository.save(industryCategory);
	        logger.info("IndustryCategory Saved Successfully "+savedCategory);

	        return savedCategory;
	    } catch (Exception e) {
	       logger.error("Errr at saving the IndustryCategory :"+e);
	       throw new RuntimeException("Error at Saving the IndustryCategory"+e);
	    }
	}



}
