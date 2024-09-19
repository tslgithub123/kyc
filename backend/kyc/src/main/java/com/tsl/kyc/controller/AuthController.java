package com.tsl.kyc.controller;

import com.tsl.kyc.dto.UserRegistrationDto;
import com.tsl.kyc.entity.CompanyProfile;
import com.tsl.kyc.entity.Employee;
import com.tsl.kyc.entity.Role;
import com.tsl.kyc.entity.User;
import com.tsl.kyc.repository.UserRepository;
import com.tsl.kyc.service.*;
import com.tsl.kyc.security.JwtUtils;
import com.tsl.kyc.utils.PasswordGenerator;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
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

    public AuthController(JwtUtils jwtUtils, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, UserService userService, RoleService roleService, CompanyProfileService companyProfileService, EmployeeService employeeService, UserRepository userRepository, EmailService emailService) {
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.roleService = roleService;
        this.companyProfileService = companyProfileService;
        this.employeeService = employeeService;
        this.emailService = emailService;
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
        emailService.sendEmail("yelwandedhananjay@gmail.com", "New User Registration", "New User Registration: " + dto.getUsername() + " with role: " + dto.getRoleId() + " and password: " + password);

        System.out.println("Password: " + password);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setEnabled(true);

        // for the time being, set the designation to the role
        newUser.setDesignation(switch (dto.getRoleId().toString()) {
            case "1" -> "Super Admin";
            case "2" -> "Admin";
            case "3" -> "Environment Officer";
            case "4" -> "Management";
            case "5" -> "Third Party";
            case "6" -> "MPCB Officer";
            default -> "Unknown";
        });

        CompanyProfile companyProfile = companyProfileService.findById(dto.getCompanyProfileId());
        newUser.setCompanyProfile(companyProfile);

        newUser.setLastLoginDate(LocalDateTime.now());

        newUser.setLocked(false);

        Role role = roleService.findById(dto.getRoleId());
        userService.assignRole(newUser, role.getName());

        Employee employee = new Employee();
        employee.setEmployeeName(dto.getEmployeeName());
        employee.setUser(newUser);
        employee.setCompanyProfile(companyProfile);
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
        if(user.getLocked()){

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User is locked"));
        }
        Role role = user.getRoles().stream().findFirst().orElseThrow();
        String jwt = jwtUtils.generateToken((UserDetails) authentication.getPrincipal());

        userService.saveLastLoginDate(username);

        return ResponseEntity.ok(Map.of("token", jwt, "user",UserService.convertToDto(user)));
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