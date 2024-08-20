package com.tsl.kyc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tsl.kyc.entity.Role;
import com.tsl.kyc.entity.Role.ERole;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}

