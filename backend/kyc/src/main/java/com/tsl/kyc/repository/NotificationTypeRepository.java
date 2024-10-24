package com.tsl.kyc.repository;

import com.tsl.kyc.entity.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface NotificationTypeRepository extends JpaRepository<NotificationType, UUID> , JpaSpecificationExecutor<NotificationType> {
  }