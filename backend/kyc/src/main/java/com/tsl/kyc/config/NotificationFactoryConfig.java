package com.tsl.kyc.config;

import com.tsl.kyc.factory.ClientNotificationFactory;
import com.tsl.kyc.factory.NotificationFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class NotificationFactoryConfig {

    @Bean
    public Map<String, NotificationFactory> factoryMap(ClientNotificationFactory clientRegistrationNotificationFactory) {
        Map<String, NotificationFactory> factoryMap = new HashMap<>();
        factoryMap.put("Client Registration Request", clientRegistrationNotificationFactory);
        return factoryMap;
    }
}