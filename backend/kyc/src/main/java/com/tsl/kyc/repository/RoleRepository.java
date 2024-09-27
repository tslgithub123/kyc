package com.tsl.kyc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com.tsl.kyc.entity.Role;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RoleRepository extends JpaRepository<Role, UUID> {
    Optional<Role> findByName(String name);
    @Query("SELECT r.name FROM Role r WHERE r.id IN :ids")
    List<String> findRoleNamesByIds(List<UUID> ids);
    @NonNull
    List<Role> findAll();
}

