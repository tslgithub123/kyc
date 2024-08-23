package com.tsl.kyc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tsl.kyc.dto.UserDto;
import com.tsl.kyc.entity.Role;
import com.tsl.kyc.entity.User;
import com.tsl.kyc.repository.RoleRepository;
import com.tsl.kyc.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    
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
        userDto.setCompanyProfileId(user.getCompanyProfile() != null ? user.getCompanyProfile().getId() : null);
        userDto.setFailedLoginCount(user.getFailedLoginCount());
        userDto.setLastLoginDate(user.getLastLoginDate() != null ? user.getLastLoginDate().toString() : null);
        userDto.setLocked(user.getLocked());

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
    
    public List<UserDto> getUserByCompanyProfileId(Integer id) {
        List<User> users = userRepository.findByCompanyProfileId(id);
        return users.stream()
                    .map(UserService::convertToDto)
                    .collect(Collectors.toList());
    }
}

