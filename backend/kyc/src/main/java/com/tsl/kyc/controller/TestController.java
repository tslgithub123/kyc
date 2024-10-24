package com.tsl.kyc.controller;

import com.tsl.kyc.service.NotificationService;
import com.tsl.kyc.entity.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    @SendTo("/notifications/topic/admin")
    public void sendTestNotification(@RequestBody UUID uuid) {
        System.out.println("Sending test notification to user: " + uuid);
        Notification notification = new Notification();
        notification.setUserId(uuid);
        notification.setMessage("Test Notification");
        notification.setPinned(false);
        notification.setNotificationType("ACCOUNT CREATION");
        notification.setTriggerDate(LocalDate.now());

        notificationService.createNotification(notification, true);
    }
}