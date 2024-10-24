package com.tsl.kyc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableJpaRepositories(basePackages = "com.tsl.kyc.repository")

@SpringBootApplication
@EnableScheduling
public class KycApplication {

	public static void main(String[] args) {
		SpringApplication.run(KycApplication.class, args);
	}

}
