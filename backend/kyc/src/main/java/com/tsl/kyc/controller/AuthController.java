package com.tsl.kyc.controller;

import com.tsl.kyc.dto.UserRegistrationDto;
import com.tsl.kyc.entity.CompanyProfile;
import com.tsl.kyc.entity.Role;
import com.tsl.kyc.entity.Role.ERole;
import com.tsl.kyc.entity.User;
import com.tsl.kyc.service.CompanyProfileService;
import com.tsl.kyc.service.RoleService;
import com.tsl.kyc.service.UserService;
import com.tsl.kyc.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    private final RoleService roleService;
    
    private final CompanyProfileService companyProfileService;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtUtils jwtUtils;

    public AuthController(JwtUtils jwtUtils, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, UserService userService, RoleService roleService, CompanyProfileService companyProfileService) {
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.roleService = roleService;
        this.companyProfileService = companyProfileService;
    }

    @PostMapping({"/register"})
    public ResponseEntity<?> registerUsers(@Validated @RequestBody List<UserRegistrationDto> registrationDTOs) {
        List<String> errors = new ArrayList<>();

        for (UserRegistrationDto dto : registrationDTOs) {
            try {
                registerUser(dto);
            } catch (RuntimeException e) {
                errors.add(e.getMessage());
            }
        }

        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        }

        String message = registrationDTOs.size() > 1 ? "Users registered successfully" : "User registered successfully";
        return ResponseEntity.ok(Map.of("message", message));
    }

    private void registerUser(UserRegistrationDto dto) {
        if (userService.findByUsername(dto.getUsername()).isPresent()) {
            throw new RuntimeException("Username is already taken!");
        }

        User newUser = new User();
        newUser.setUsername(dto.getUsername());
        newUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        newUser.setEnabled(dto.isEnabled());

        newUser.setDesignation(switch (dto.getRole()) {
            case "ROLE_ADMIN" -> "Administrator";
            case "ROLE_ENVIRONMENT_OFFICER" -> "Environment Officer";
            case "ROLE_MANAGEMENT" -> "Management";
            case "ROLE_THIRD_PARTY" -> "Third Party";
            default -> throw new RuntimeException("Invalid designation");
        });

        CompanyProfile companyProfile = companyProfileService.findById(dto.getCompanyProfileId());
        newUser.setCompanyProfile(companyProfile);

        newUser.setFailedLoginCount(dto.getFailedLoginCount());

        if (dto.getLastLoginDate() != null) {
            newUser.setLastLoginDate(LocalDateTime.parse(dto.getLastLoginDate()));
        }

        newUser.setLocked(dto.isLocked());

        userService.saveUser(newUser);

        ERole roleEnum = ERole.valueOf(dto.getRole().toUpperCase());
        Role role = roleService.findByName(roleEnum)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        userService.assignRole(newUser, roleEnum);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userService.findByUsername(username).orElseThrow();
        if(user.getLocked()){

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User is locked"));
        }
        Role role = user.getRoles().stream().findFirst().orElseThrow();
        String jwt = jwtUtils.generateToken((UserDetails) authentication.getPrincipal());

        userService.saveLastLoginDate(username);
        return ResponseEntity.ok(Map.of("token", jwt, "role", role.getName(), "userId", user.getId()));
    }

    @GetMapping("/success")
    public ResponseEntity<?> loginSuccess() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDetails userDetails) {

            Set<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toSet());

            Map<String, Object> response = Map.of("message", "Login successful", "username", userDetails.getUsername(),
                    "roles", roles);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not authenticated"));
        }
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDetails userDetails) {

            Set<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toSet());

            Map<String, Object> response = Map.of("username", userDetails.getUsername(), "roles", roles);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not authenticated"));
        }
    }
}