package com.tsl.kyc.repository;

import com.tsl.kyc.entity.CompanyUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CompanyUnitRepository extends JpaRepository<CompanyUnit, UUID>, JpaSpecificationExecutor<CompanyUnit> {
    List<CompanyUnit> findByCompanyProfileId(UUID companyProfileId);
}