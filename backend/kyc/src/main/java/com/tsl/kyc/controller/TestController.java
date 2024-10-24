package com.tsl.kyc.controller;

import com.tsl.kyc.dto.NotificationTriggerDto;
import com.tsl.kyc.entity.Notification;
import com.tsl.kyc.entity.NotificationType;
import com.tsl.kyc.entity.User;
import com.tsl.kyc.factory.NotificationFactory;
import com.tsl.kyc.factory.NotificationFactoryProvider;
import com.tsl.kyc.service.NotificationService;
import com.tsl.kyc.service.NotificationTypeService;
import com.tsl.kyc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final UserService userService;

    @Autowired
    private NotificationService notificationService;
    @Autowired
    private NotificationTypeService notificationTypeService;
    @Autowired
    private NotificationFactoryProvider notificationFactoryProvider;

    public TestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/notify")
    public void sendTestNotification(@RequestBody NotificationTriggerDto notificationTriggerDto) {
        String type = notificationTriggerDto.getType();
        NotificationFactory factory = notificationFactoryProvider.getFactory(type);
        if (factory == null) {
            throw new IllegalArgumentException("No factory found for type: " + type);
        }
        Notification notification = factory.createNotification(notificationTriggerDto);
        notificationService.createNotification(notification, true);
    }
}