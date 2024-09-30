package com.tsl.kyc.repository;

import com.tsl.kyc.entity.CompanyProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CompanyProfileRepository extends JpaRepository<CompanyProfile, UUID> {
}
