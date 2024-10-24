package com.tsl.kyc.controller;

import com.tsl.kyc.service.NotificationService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

//    @GetMapping("/all")
//    public List<Notification> getAllNotifications() {
//        return notificationService.getAllNotifications();
//    }
//
//    @GetMapping("/user/{id}")
//    public List<Notification> getNotificationByUserId(@PathVariable UUID id) {
//        return notificationService.getNotificationsForUser(id);
//    }
}
