package com.tsl.kyc.repository;

import com.tsl.kyc.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {
//    @Query("SELECT n FROM Notification n WHERE n.user.id = :id")
//    Notification findByUserId(UUID id);

    @Query("SELECT n FROM Notification n WHERE n.user.id = :userId")
    List<Notification> findMultipleByUserId(UUID userId);
}
