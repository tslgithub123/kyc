package com.tsl.kyc.factory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class NotificationFactoryProvider {

    private final Map<String, NotificationFactory> factoryMap;

    @Autowired
    public NotificationFactoryProvider(Map<String, NotificationFactory> factoryMap) {
        this.factoryMap = factoryMap;
    }

    public NotificationFactory getFactory(String type) {
        return factoryMap.get(type);
    }
}