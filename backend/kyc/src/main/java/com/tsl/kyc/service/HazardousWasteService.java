package com.tsl.kyc.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tsl.kyc.entity.HazardousWaste;
import com.tsl.kyc.repository.HazardousWasteRepository;

@Service
public class HazardousWasteService {

	@Autowired
    private HazardousWasteRepository hazardousWasteRepository;

    public List<HazardousWaste> findAll() {
        return hazardousWasteRepository.findAll();
    }

    public Optional<HazardousWaste> findById(UUID id) {
        return hazardousWasteRepository.findById(id);
    }

    public HazardousWaste save(HazardousWaste hazardousWaste) {
        return hazardousWasteRepository.save(hazardousWaste);
    }

//    public HazardousWaste createHazardousWaste(HazardousWaste hazardousWaste) {
//        return hazardousWasteRepository.save(hazardousWaste);
//    }
    public void deleteById(UUID id) {
        hazardousWasteRepository.deleteById(id);
    }
}
