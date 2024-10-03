package com.tsl.kyc.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tsl.kyc.dto.UserDto;
import com.tsl.kyc.entity.Role;
import com.tsl.kyc.entity.User;
import com.tsl.kyc.repository.RoleRepository;
import com.tsl.kyc.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public static UserDto convertToDto(User user) {
        if (user == null) {
            return null;
        }

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setEnabled(user.getEnabled());
        userDto.setDesignation(user.getDesignation());
        userDto.setCompanyProfile(user.getCompanyProfile());
        userDto.setFailedLoginCount(user.getFailedLoginCount());
        userDto.setLastLoginDate(user.getLastLoginDate() != null ? user.getLastLoginDate().toString() : null);
        userDto.setLocked(user.getLocked());
        userDto.setCompanyName(user.getCompanyProfile() != null ? user.getCompanyProfile().getName() : null);
        userDto.setRoles(user.getRoles());
        return userDto;
    }

    public List<UserDto> getAll() {
        return userRepository.findAll().stream().map(UserService::convertToDto).collect(Collectors.toList());
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

    public List<UserDto> getUserByCompanyProfileId(UUID id) {
        List<User> users = userRepository.findByCompanyProfileId(id);
        return users.stream()
                .map(UserService::convertToDto)
                .collect(Collectors.toList());
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
}