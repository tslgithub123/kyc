package com.tsl.kyc.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tsl.kyc.entity.IndustryScale;
@Repository
public interface IndustryScaleRepository extends JpaRepository<IndustryScale, UUID> {

	@Query("SELECT i FROM IndustryScale i WHERE i.name = :scaleName")
	Optional<IndustryScale> getscaleName(String scaleName);
}
