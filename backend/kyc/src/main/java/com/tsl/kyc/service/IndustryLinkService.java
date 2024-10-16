package com.tsl.kyc.service;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.tsl.kyc.entity.IndustryCategory;
import com.tsl.kyc.entity.IndustryLink;
import com.tsl.kyc.entity.IndustryScale;
import com.tsl.kyc.entity.IndustryType;
import com.tsl.kyc.exception.ResourceNotFoundException;
import com.tsl.kyc.repository.IndustryLinkRepository;

@Service
public class IndustryLinkService {
	
	private final IndustryLinkRepository industryLinkRepository;
	private final IndustryScaleService industryScaleService;
	private final IndustryTypeService industryTypeService;
	private final IndustryCategoryService industryCategoryService;
	private final static Logger logger=LoggerFactory.getLogger(IndustryLinkService.class);
	
	
	public IndustryLinkService(IndustryScaleService industryScaleService, IndustryTypeService industryTypeService,IndustryCategoryService industryCategoryService,IndustryLinkRepository industryLinkRepository) {
		super();
		this.industryScaleService = industryScaleService;
		this.industryTypeService = industryTypeService;
		this.industryCategoryService=industryCategoryService;
		this.industryLinkRepository=industryLinkRepository;
	}
	
	public IndustryLink getIndustryData(String scaleName, String typeName,String categoryName) {
		IndustryScale scale=industryScaleService.getIndustryScale(scaleName);
		IndustryType type=industryTypeService.getIndustryType(typeName);
		IndustryCategory category=industryCategoryService.getIndustryCategory(categoryName);
		
		IndustryLink industryLink=new IndustryLink();
		industryLink.setIndustryScale(scale);
		industryLink.setIndustryType(type);
		industryLink.setIndustryCategory(category);
		try {
			IndustryLink industryLink2=industryLinkRepository.save(industryLink);
			logger.info("IndustryLink info saved successfully with ID: " + industryLink2.getId());
            return industryLink2;
        } catch (Exception e) {
            logger.error("Error saving Company Unit", e);
            throw new RuntimeException("Could not save Company Unit", e);
        }
		
	}

	public IndustryLink updateIndustryLink(UUID uuid, String indCatName, String indScaleName) {
		IndustryLink industryLink=industryLinkRepository.findById(uuid).orElseThrow(()->new ResourceNotFoundException("IndustryLink Not Found of Id :"+uuid));
		
		IndustryCategory category=industryCategoryService.getIndustryCategory(indCatName);
		IndustryScale industryScale=industryScaleService.getIndustryScale(indScaleName);
		
		industryLink.setIndustryCategory(category);
		industryLink.setIndustryScale(industryScale);
		
		try {
			industryLink=industryLinkRepository.save(industryLink);
			logger.info("Industry Link Saved Successfully of Id :"+uuid);
			return industryLink;
		}catch (Exception e) {
			logger.error("Error at Saving the IndustryLink ",e);
			throw new RuntimeException("Could not save Company Unit :",e);
		}
	}
}
