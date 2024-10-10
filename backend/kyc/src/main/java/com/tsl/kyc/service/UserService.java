package com.tsl.kyc.service;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.tsl.kyc.entity.Role;
import com.tsl.kyc.entity.User;
import com.tsl.kyc.repository.RoleRepository;
import com.tsl.kyc.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean checkPassword(User user, String rawPassword) {
        return user.getPassword().equals(rawPassword);
    }

    @Transactional
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void assignRole(User user, String roleName) {
        Optional<Role> roleOpt = roleRepository.findByName(roleName);
        if (roleOpt.isPresent()) {
            user.getRoles().add(roleOpt.get());
            userRepository.save(user);
        } else {
            throw new RuntimeException("Role not found: " + roleName);
        }
    }

    public List<User> getUserByCompanyProfileId(UUID id) {
        return userRepository.findByCompanyProfileId(id);
    }

    @Transactional
    public User changeLockStatus(UUID userId, Boolean locked) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setLocked(locked);
            return userRepository.save(user);
        }
        throw new IllegalArgumentException("User not found with id: " + userId);
    }

    public boolean checkUsernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean saveLastLoginDate(String username) {
    Optional<User> user = userRepository.findByUsername(username);
    if (user.isPresent()) {
        user.get().setLastLoginDate(LocalDateTime.now());
        userRepository.save(user.get());
        return true;
    }
    return false;
}
    
    public Optional<User> findById(UUID id) {
        return userRepository.findById(id);
    }

    
    public List<User> findUsersByCompanyUnitId(UUID companyUnitId) {
        return userRepository.findByCompanyUnitId(companyUnitId);
    }

    public boolean forgetPassword(UUID uid, String newPassword) {
        Optional<User> userOpt = userRepository.findById(uid);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }
        return false;
    }
}