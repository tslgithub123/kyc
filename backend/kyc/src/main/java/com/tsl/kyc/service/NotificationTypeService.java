package com.tsl.kyc.service;

import com.tsl.kyc.entity.NotificationType;
import com.tsl.kyc.repository.NotificationTypeRepository;
import org.springframework.stereotype.Service;

@Service
public class NotificationTypeService {

    private final NotificationTypeRepository notificationTypeRepository;

    public NotificationTypeService(NotificationTypeRepository notificationTypeRepository) {
        this.notificationTypeRepository = notificationTypeRepository;
    }

    public NotificationType getNotificationTypeByName(String name) {
        return notificationTypeRepository.findByName(name);
    }
}
