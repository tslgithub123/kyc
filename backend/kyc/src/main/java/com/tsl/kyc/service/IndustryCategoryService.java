package com.tsl.kyc.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.tsl.kyc.entity.IndustryCategory;
import com.tsl.kyc.exception.ResourceNotFoundException;
import com.tsl.kyc.repository.IndustryCategoryRepository;

@Service
public class IndustryCategoryService {

	private final IndustryCategoryRepository industryCategoryRepository;
	
	public IndustryCategoryService(IndustryCategoryRepository industryCategoryRepository) {
		super();
		this.industryCategoryRepository = industryCategoryRepository;
	}


	public IndustryCategory getIndustryCategory(String categoryName) {
	    Optional<IndustryCategory> category = industryCategoryRepository.getByName(categoryName);
	    return category.orElseThrow(() -> new ResourceNotFoundException("Category with name '" + categoryName + "' not found"));
	}


}
