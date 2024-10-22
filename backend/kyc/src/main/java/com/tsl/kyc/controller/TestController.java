package com.tsl.kyc.controller;

import com.tsl.kyc.service.NotificationService;
import com.tsl.kyc.entity.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/notify")
    public void sendTestNotification() {
        Notification notification = new Notification();
        notification.setUserId(UUID.fromString("6413a162-927f-434f-8e6f-52527524b580"));
        notification.setMessage("Test Notification");
        notification.setNotificationType("ACCOUNT CREATION");
        notification.setTriggerDate(LocalDate.now());

        notificationService.createNotification(notification);
    }
}