package com.tsl.kyc.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tsl.kyc.entity.HazardousWaste;
import com.tsl.kyc.service.HazardousWasteService;


@RestController
@RequestMapping("/api/hazardouswaste")
public class HazardousWasteController {
	
	 	@Autowired
	    private HazardousWasteService hazardousWasteService;

	    @GetMapping
	    public List<HazardousWaste> getAllHazardousWaste() {
	        return hazardousWasteService.findAll();
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<HazardousWaste> getHazardousWasteById(@PathVariable UUID id) {
	        Optional<HazardousWaste> hazardousWaste = hazardousWasteService.findById(id);
	        return hazardousWaste.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	    }

	    @PostMapping
	    public ResponseEntity<HazardousWaste> createHazardousWaste(@RequestBody HazardousWaste hazardousWaste) {
	        HazardousWaste savedHazardousWaste = hazardousWasteService.save(hazardousWaste);
	        System.out.println(hazardousWaste);
	        return ResponseEntity.status(HttpStatus.CREATED).body(savedHazardousWaste);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<HazardousWaste> updateHazardousWaste(@PathVariable UUID id, @RequestBody HazardousWaste hazardousWaste) {
	        if (!hazardousWasteService.findById(id).isPresent()) {
	            return ResponseEntity.notFound().build();
	        }
	        hazardousWaste.setId(id);
	        HazardousWaste updatedHazardousWaste = hazardousWasteService.save(hazardousWaste);
	        return ResponseEntity.ok(updatedHazardousWaste);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteHazardousWaste(@PathVariable UUID id) {
	        if (!hazardousWasteService.findById(id).isPresent()) {
	            return ResponseEntity.notFound().build();
	        }
	        hazardousWasteService.deleteById(id);
	        System.out.println("Deleted");
	        return ResponseEntity.noContent().build();
	    }

}
