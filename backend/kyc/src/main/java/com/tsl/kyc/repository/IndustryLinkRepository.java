package com.tsl.kyc.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tsl.kyc.entity.IndustryLink;

public interface IndustryLinkRepository extends JpaRepository<IndustryLink, UUID> {

}
