package com.tsl.kyc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.tsl.kyc.repository")

@SpringBootApplication
public class KycApplication {

	public static void main(String[] args) {
		SpringApplication.run(KycApplication.class, args);
	}

}
