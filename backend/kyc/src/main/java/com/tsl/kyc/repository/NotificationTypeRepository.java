package com.tsl.kyc.repository;

import com.tsl.kyc.entity.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NotificationTypeRepository extends JpaRepository<NotificationType, UUID> {

    NotificationType findByName(String name);
}