package com.tsl.kyc.controller;


import com.tsl.kyc.dto.UserRegistrationDto;
import com.tsl.kyc.entity.*;
import com.tsl.kyc.repository.UserRepository;
import com.tsl.kyc.service.*;
import com.tsl.kyc.security.JwtUtils;
import com.tsl.kyc.utils.PasswordGenerator;
import jakarta.mail.MessagingException;
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

    private final EmployeeService employeeService;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtUtils jwtUtils;
    private final EmailService emailService;
    private final CompanyUnitService companyUnitService;

    public AuthController(JwtUtils jwtUtils, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, UserService userService, RoleService roleService, CompanyProfileService companyProfileService, EmployeeService employeeService, UserRepository userRepository, EmailService emailService, CompanyUnitService companyUnitService) {
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.roleService = roleService;
        this.companyProfileService = companyProfileService;
        this.employeeService = employeeService;
        this.emailService = emailService;
        this.companyUnitService = companyUnitService;
    }


    @PostMapping({"/register"})
    public ResponseEntity<?> registerUsers(@Validated @RequestBody List<UserRegistrationDto> registrationDTOs) {
        List<String> errors = new ArrayList<>();

        for (UserRegistrationDto dto : registrationDTOs) {
            try {
                registerUser(dto);
            } catch (RuntimeException | MessagingException e) {
                errors.add(e.getMessage());
            }
        }

        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        }

        String message = registrationDTOs.size() > 1 ? "Users registered successfully" : "User registered successfully";
        return ResponseEntity.ok(Map.of("message", message));
    }

    private void registerUser(UserRegistrationDto dto) throws MessagingException {
        if (userService.findByUsername(dto.getUsername()).isPresent()) {
            throw new RuntimeException("Username is already taken!");
        }

        User newUser = new User();
        newUser.setUsername(dto.getUsername());
        String password = PasswordGenerator.generatePassword(8);
//        emailService.sendEmail("yelwandedhananjay@gmail.com", "New User Registration", "New User Registration: " + dto.getUsername() + " with role: " + dto.getRoleId() + " and password: " + password);

        System.out.println("Password: " + password);
        newUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        newUser.setEnabled(true);

        // for the time being, set the designation to the role
        newUser.setDesignation(switch (dto.getRoleId()) {
            case "1" -> "TSL Super Admin";
            case "2" -> "Admin";
            case "3" -> "Environment Officer";
            case "4" -> "Management";
            case "5" -> "Third Party";
            case "6" -> "Director";
            default -> "Unknown";
        });

        CompanyUnit companyUnit = companyUnitService.getCompanyUnitById(dto.getCompanyUnitId());
        newUser.setCompanyUnit(companyUnit);

        newUser.setLastLoginDate(LocalDateTime.now());

        newUser.setLocked(false);

        String role_name = switch (dto.getRoleId()) {
            case "1" -> "ROLE_TSL";
            case "2" -> "ROLE_ADMIN";
            case "3" -> "ROLE_ENVIRONMENT_OFFICER";
            case "4" -> "ROLE_MANAGEMENT";
            case "5" -> "ROLE_THIRD_PARTY";
            case "6" -> "ROLE_DIRECTOR";
            default -> "";
        };

        Optional<Role> role = roleService.findByName(role_name);
        if (role.isPresent()) {
            userService.assignRole(newUser, role.get().getName());
        } else {
            throw new RuntimeException("Role not found: " + role_name);
        }

        Employee employee = new Employee();

        employee.setName(dto.getEmployeeFullName());
        employee.setUser(newUser);
        employee.setCompanyProfile(companyUnit.getCompanyProfile());
        employeeService.save(employee);
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

        System.out.println("User: " + user);
        if(user.getLocked()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User is locked"));
        }
        String jwt = jwtUtils.generateToken((UserDetails) authentication.getPrincipal());

        userService.saveLastLoginDate(username);

        return ResponseEntity.ok(Map.of("token", jwt, "user", user));
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