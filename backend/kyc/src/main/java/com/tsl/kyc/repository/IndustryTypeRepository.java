package com.tsl.kyc.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tsl.kyc.entity.IndustryType;

public interface IndustryTypeRepository extends JpaRepository<IndustryType, UUID> {
	@Query("SELECT u FROM IndustryType u  WHERE u.name=:typeName")
	Optional<IndustryType> getIndustryType(String typeName);

}
