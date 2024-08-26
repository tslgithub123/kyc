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

    @PostMapping({"/register-multiple"})
    public ResponseEntity<?> registerUsers(@Validated @RequestBody List<UserRegistrationDto> registrationDTOs) {
        for (UserRegistrationDto registrationDTO : registrationDTOs) {
            String username = registrationDTO.getUsername();
            String password = registrationDTO.getPassword();
            String roleStr = registrationDTO.getRole();

            if (userService.findByUsername(username).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Username is already taken!"));
            }

            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(passwordEncoder.encode(password));
            newUser.setEnabled(registrationDTO.isEnabled());

            switch (registrationDTO.getRole()) {
                case "ROLE_ADMIN" -> newUser.setDesignation("Administrator");
                case "ROLE_ENVIRONMENT_OFFICER" -> newUser.setDesignation("Environment Officer");
                case "ROLE_MANAGEMENT" -> newUser.setDesignation("Management");
                case "ROLE_THIRD_PARTY" -> newUser.setDesignation("Third Party");
                default -> {
                    return ResponseEntity.badRequest().body(Map.of("message", "Invalid designation"));
                }
            }

            CompanyProfile companyProfile = null;
            try {
                companyProfile = companyProfileService.findById(registrationDTO.getCompanyProfileId());
            } catch (Exception e) {
                throw new RuntimeException("Error: CompanyProfile not found.");
            }
            newUser.setCompanyProfile(companyProfile);

            newUser.setFailedLoginCount(registrationDTO.getFailedLoginCount());

            if (registrationDTO.getLastLoginDate() != null) {
                newUser.setLastLoginDate(LocalDateTime.parse(registrationDTO.getLastLoginDate()));
            }

            newUser.setLocked(registrationDTO.isLocked());

            userService.saveUser(newUser);

            ERole roleEnum = ERole.valueOf(roleStr.toUpperCase());
            Role role = roleService.findByName(roleEnum)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            userService.assignRole(newUser, roleEnum);
        }

        String message = registrationDTOs.size() > 1 ? "Users registered successfully" : "User registered successfully";
        return ResponseEntity.ok(Map.of("message", message));
    }

    @PostMapping("/register-single")
    public ResponseEntity<?> registerSingleUser(@Validated @RequestBody UserRegistrationDto registrationDTO) {
        return registerUsers(List.of(registrationDTO));
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


        return ResponseEntity.ok(Map.of("token", jwt, "role", role.getName()));
    }

    @GetMapping("/success")
    public ResponseEntity<?> loginSuccess() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            Set<String> roles = userDetails.getAuthorities().stream().map(authority -> authority.getAuthority())
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
        if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            Set<String> roles = userDetails.getAuthorities().stream().map(authority -> authority.getAuthority())
                    .collect(Collectors.toSet());

            Map<String, Object> response = Map.of("username", userDetails.getUsername(), "roles", roles);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not authenticated"));
        }
    }
}