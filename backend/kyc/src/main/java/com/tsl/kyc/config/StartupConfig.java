package com.tsl.kyc.config;

import com.tsl.kyc.factory.NotificationFactoryProvider;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StartupConfig {

    @Bean
    public CommandLineRunner verifyConfiguration(NotificationFactoryProvider provider) {
        return args -> {
            System.out.println("Available notification types: " + provider.getAvailableTypes());
        };
    }
}
