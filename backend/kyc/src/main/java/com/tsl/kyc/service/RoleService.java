package com.tsl.kyc.service;

import com.tsl.kyc.entity.Role;
import com.tsl.kyc.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public Role findById(UUID id) {
        return roleRepository.findById(id).orElse(null);
    }

    public List<String> findRoleNamesByIds(List<UUID> ids) {
        return roleRepository.findRoleNamesByIds(ids);
    }

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Optional<Role> findByName(String name) {
        return roleRepository.findByName(name);
    }

    public Role save(Role role) {
        return roleRepository.save(role);
    }

    public List<Role> findAll() {
        return roleRepository.findAll();
    }
}