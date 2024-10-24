package com.tsl.kyc.service;

import com.tsl.kyc.entity.Notification;
import com.tsl.kyc.handler.NotificationHandler;
import com.tsl.kyc.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationHandler notificationHandler;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository,
                               NotificationHandler notificationHandler) {
        this.notificationRepository = notificationRepository;
        this.notificationHandler = notificationHandler;
    }

    public Notification createNotification(Notification notification, boolean broadcast) {
        Notification savedNotification = notificationRepository.save(notification);

        if (broadcast) {
            notificationHandler.broadcastNotification(savedNotification);
        } else {
            notificationHandler.sendNotificationToUser(
                    notification.getUserId().toString(),
                    savedNotification
            );
        }

        return savedNotification;
    }
}