package com.tsl.kyc.config;

import com.tsl.kyc.factory.ClientNotificationFactory;
import com.tsl.kyc.factory.NotificationFactory;
import com.tsl.kyc.utils.NotificationTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class NotificationFactoryConfig {

    @Bean(name = "notificationFactoryMap")
    @Primary
    public Map<String, NotificationFactory> factoryMap(ClientNotificationFactory clientNotificationFactory) {
        Map<String, NotificationFactory> factoryMap = new HashMap<>();
        factoryMap.put(NotificationTypes.CLIENT_REGISTRATION_REQUEST, clientNotificationFactory);
        factoryMap.put(NotificationTypes.DOCUMENT_UPLOAD, clientNotificationFactory);
        factoryMap.put(NotificationTypes.APPROVAL_REQUEST, clientNotificationFactory);
        return factoryMap;
    }
}