package com.tsl.kyc.service;

import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.tsl.kyc.dto.AddressDto;
import com.tsl.kyc.entity.Address;
import com.tsl.kyc.exception.ResourceNotFoundException;
import com.tsl.kyc.repository.AddressRepository;

@Service
public class AddressService {
	
	private final AddressRepository addressRepository;
	private final ModelMapper mapper;
	private final static Logger logger=LoggerFactory.getLogger(AddressService.class);

	public AddressService(AddressRepository addressRepository,ModelMapper mapper) {
		super();
		this.addressRepository = addressRepository;
		this.mapper=mapper;
	}

	public Address saveAddress(Address address) {
		try {
			Address companyAddress=addressRepository.save(address);
			logger.info("Address of Comapny Saved Successfully of ID :"+companyAddress.getId());
			return companyAddress;
		}catch (Exception e) {

            logger.error("Error saving Company Address :", e);
            throw new RuntimeException("Could not save Company Address", e);
		}
		
	}

	public Address updateAddress(UUID id, AddressDto addressDto) {
	    // Fetch the existing Address from the repository
	    Address address = addressRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Address not found with ID: " + id));

	    // Use ModelMapper to map the AddressDto to the existing Address entity
	    mapper.map(addressDto, address);

	    // Save and return the updated Address entity
	    return addressRepository.save(address);
	}


	
	
	
}
