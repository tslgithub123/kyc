package com.tsl.kyc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tsl.kyc.entity.Role;
import com.tsl.kyc.entity.User;
import com.tsl.kyc.repository.RoleRepository;
import com.tsl.kyc.repository.UserRepository;

import java.util.HashSet;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean checkPassword(User user, String rawPassword) {
        return user.getPassword().equals(rawPassword);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void assignRole(User user, Role.ERole roleName) {
        System.out.println("In User Service: " + user.toString() + " rolename: " + roleName);
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        
        if (user.getRoles() == null) {
            user.setRoles(new HashSet<>());
        }
        user.getRoles().add(role);
        userRepository.save(user);
    }
}

