package com.tsl.kyc.repository;

import com.tsl.kyc.entity.CompanyUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface CompanyUnitRepository extends JpaRepository<CompanyUnit, UUID> , JpaSpecificationExecutor<CompanyUnit> {
  }