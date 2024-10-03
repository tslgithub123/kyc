package com.tsl.kyc.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tsl.kyc.entity.Consent;
import com.tsl.kyc.repository.ConsentRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ConsentService {

    @Autowired
    private ConsentRepository consentRepository;

    public List<Consent> findAll() {
        return consentRepository.findAll();
    }

    public Optional<Consent> findById(UUID id) {
        return consentRepository.findById(id);
    }

    public Consent save(Consent consent) {
        return consentRepository.save(consent);
    }

    public void delete(UUID id) {
        consentRepository.deleteById(id);
    }
}
