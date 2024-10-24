package com.tsl.kyc.factory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Map;
import java.util.Set;

@Component
public class NotificationFactoryProvider {

    private final Map<String, NotificationFactory> factoryMap;

    @Autowired
    public NotificationFactoryProvider(@Qualifier("notificationFactoryMap") Map<String, NotificationFactory> factoryMap) {
        this.factoryMap = factoryMap;
    }

    public NotificationFactory getFactory(String type) {
        NotificationFactory factory = factoryMap.get(type);
        if (factory == null) {
            throw new IllegalArgumentException("No factory found for type: '" + type
                    + "'. Available types: " + factoryMap.keySet());
        }
        return factory;
    }

    public Set<String> getAvailableTypes() {
        return factoryMap.keySet();
    }
}