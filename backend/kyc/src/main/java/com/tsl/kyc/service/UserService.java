package com.tsl.kyc.service;

import com.tsl.kyc.entity.UserRole;
import com.tsl.kyc.repository.UserRolesRepository;
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

    private static RoleRepository roleRepository = null;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private UserRolesRepository userRolesRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        UserService.roleRepository = roleRepository;
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

    public void replaceRole(User user, String roleId) {
        Optional<UserRole> userRole = userRolesRepository.findByUserId(user.getId());
        userRole.get().setRole(getRole(roleId).get());
        userRolesRepository.save(userRole.get());
        userRepository.save(user);
    }

    public static Optional<Role> getRole(String roleId) {
        String roleName = switch (roleId) {
            case "1" -> "ROLE_TSL";
            case "2" -> "ROLE_DIRECTOR";
            case "3" -> "ROLE_ADMIN";
            case "4" -> "ROLE_ENVIRONMENT_OFFICER";
            case "5" -> "ROLE_MANAGEMENT";
            case "6" -> "ROLE_THIRD_PARTY";
            default -> "";
        };
        return roleRepository.findByName(roleName);
    }

    public void assignRole(User user, String roleId) {

        Optional<Role> role = getRole(roleId);
        if (role.isPresent()) {
            user.getRoles().add(role.get());
            userRepository.save(user);
        } else {
            throw new RuntimeException("Role not found: " + roleId);
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