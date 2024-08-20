package com.tsl.kyc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tsl.kyc.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
}