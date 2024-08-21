package com.tsl.kyc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tsl.kyc.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    
    Boolean existsByUsername(String username);
    
    List<User> findAllById(Iterable<Long> ids);
}