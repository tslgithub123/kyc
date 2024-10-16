package com.tsl.kyc.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.tsl.kyc.entity.Address;
import com.tsl.kyc.repository.AddressRepository;

@Service
public class AddressService {
	
	private final AddressRepository addressRepository;
	private final static Logger logger=LoggerFactory.getLogger(AddressService.class);

	public AddressService(AddressRepository addressRepository) {
		super();
		this.addressRepository = addressRepository;
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
	
	
}
