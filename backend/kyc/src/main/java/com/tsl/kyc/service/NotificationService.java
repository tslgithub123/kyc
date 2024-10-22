package com.tsl.kyc.service;

import com.tsl.kyc.entity.Notification;
import com.tsl.kyc.handler.NotificationHandler;
import com.tsl.kyc.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    private NotificationHandler notificationHandler;

    public void createNotification(Notification notification) {
        notificationRepository.save(notification);
        notificationHandler.sendNotification(notification.getMessage());
    }

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

//    public Notification getNotificationById(UUID id) {
//        return notificationRepository.findByUserId(id);
//    }
    public List<Notification> getNotificationsForUser(UUID userId) {
        return notificationRepository.findMultipleByUserId(userId);
    }
}
