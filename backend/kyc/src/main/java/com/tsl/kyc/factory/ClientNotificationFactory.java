package com.tsl.kyc.factory;

import com.tsl.kyc.dto.NotificationTriggerDto;
import com.tsl.kyc.entity.Notification;
import com.tsl.kyc.entity.NotificationType;
import com.tsl.kyc.service.NotificationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;

@Component
public class ClientNotificationFactory implements NotificationFactory {

    @Autowired
    private NotificationTypeService notificationTypeService;

    @Override
    public Notification createNotification(NotificationTriggerDto dto) {
        Notification notification = new Notification();
        notification.setUserId(dto.getToUserId());
        notification.setMessage(dto.getMessage());
        notification.setPinned(false);
        notification.setIsRead(false);
        notification.setEmailSent(false);
        notification.setCreatedAt(OffsetDateTime.now());
        NotificationType notificationType = notificationTypeService.getNotificationTypeByName(dto.getType());
        notification.setNotificationType(notificationType);
        notification.setTriggerDate(OffsetDateTime.now());
        notification.setFromUserId(dto.getFromUserId());
        return notification;
    }
}