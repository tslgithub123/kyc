package com.tsl.kyc.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.tsl.kyc.entity.IndustryCategory;

public interface IndustryCategoryRepository extends JpaRepository<IndustryCategory, UUID> {
	@Query("SELECT i FROM IndustryCategory i WHERE i.name = :categoryName")
	Optional<IndustryCategory> getByName(String categoryName);


}
