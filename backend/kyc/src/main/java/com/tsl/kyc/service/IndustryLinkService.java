package com.tsl.kyc.service;

import java.util.Optional;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tsl.kyc.dto.IndustryCategoryDto;
import com.tsl.kyc.dto.IndustryLinkDto;
import com.tsl.kyc.dto.IndustryScaleDto;
import com.tsl.kyc.dto.IndustryTypeDto;
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
	private final ModelMapper mapper;
	private final static Logger logger=LoggerFactory.getLogger(IndustryLinkService.class);
	
	
	public IndustryLinkService(IndustryScaleService industryScaleService, IndustryTypeService industryTypeService,IndustryCategoryService industryCategoryService,IndustryLinkRepository industryLinkRepository,ModelMapper mapper) {
		super();
		this.industryScaleService = industryScaleService;
		this.industryTypeService = industryTypeService;
		this.industryCategoryService=industryCategoryService;
		this.industryLinkRepository=industryLinkRepository;
		this.mapper=mapper;
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

	@Transactional
	public IndustryLink saveIndustryLink(IndustryLinkDto dto) {
		//IndustryCategory
		IndustryCategoryDto categoryDto=new IndustryCategoryDto();
		categoryDto.setIndustryCategory(dto.getCategory());
		IndustryCategory category=industryCategoryService.saveIndustryCategory(categoryDto);
		
		//IndustryScale
		IndustryScaleDto scaleDto=new IndustryScaleDto();
		scaleDto.setIndustryScale(dto.getScale());
		IndustryScale industryScale=industryScaleService.saveIndustryScale(scaleDto);
		
		//IndustryType
		IndustryTypeDto typeDto=new IndustryTypeDto();
		typeDto.setIndustryType(dto.getType());
		IndustryType industryType=industryTypeService.saveIndustryType(typeDto);
		
		//IndustryLink
		IndustryLink industryLink=new IndustryLink();
		industryLink.setIndustryCategory(category);
		industryLink.setIndustryScale(industryScale);
		industryLink.setIndustryType(industryType);
		
		try {
			IndustryLink savedIndustryLink=industryLinkRepository.save(industryLink);
			logger.info("IndustryLink saved successfully",savedIndustryLink);
			return savedIndustryLink;
		} catch (Exception e) {
			logger.error("Error at saving IndustryLink"+e);
			throw new RuntimeException("Error at saving IndustryLink"+e);
		}
	}

	public ResponseEntity<String> deleteById(UUID id) {
		try {
	        // Check if the entity exists by id
	        Optional<IndustryLink> industryLink = industryLinkRepository.findById(id);
	        
	        if (industryLink.isPresent()) {
	            // Delete the entity
	            industryLinkRepository.deleteById(id);
	            return ResponseEntity.ok("IndustryLink deleted successfully.");
	        } else {
	            // If entity doesn't exist
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                                 .body("IndustryLink with ID " + id + " not found.");
	        }
	    } catch (Exception e) {
	        // Handle any exceptions
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("An error occurred while deleting the IndustryLink.");
	    }
	}
}
