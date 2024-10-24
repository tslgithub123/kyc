package com.tsl.kyc.factory;

import com.tsl.kyc.entity.Notification;
import com.tsl.kyc.dto.NotificationTriggerDto;

public interface NotificationFactory {
    Notification createNotification(NotificationTriggerDto dto);
}
