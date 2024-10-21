package com.tsl.kyc.service;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.tsl.kyc.entity.ContactPerson;
import com.tsl.kyc.repository.ContactPersonRepository;

@Service
public class ContactPersonService {

	private final ContactPersonRepository contactPersonRepository;
	private final static Logger logger=LoggerFactory.getLogger(ContactPersonService.class);
	
	
	
	public ContactPersonService(ContactPersonRepository contactPersonRepository) {
		super();
		this.contactPersonRepository = contactPersonRepository;
	}

	public  ContactPerson saveContactPerson(ContactPerson contPerson) {
		try {
			ContactPerson contactPerson=contactPersonRepository.save(contPerson);
			logger.info("Contact Person Saved Successfully of Id :"+contactPerson.getId());
			return contactPerson;
		}catch (Exception e) {
			logger.error("Error Saving at Contact Person :"+e);
			throw new RuntimeException("Could not save Contact Person :", e);
		}
	}

}
