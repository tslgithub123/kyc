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
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;
    
    @Autowired
    private CompanyProfileService companyProfileService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated @RequestBody UserRegistrationDto registrationDTO) {
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
        newUser.setDesignation(registrationDTO.getDesignation());


        CompanyProfile companyProfile = null;
		try {
			companyProfile = companyProfileService.findById(registrationDTO.getCompanyProfileId());
		} catch (Exception e) {
			new RuntimeException("Error: CompanyProfile not found.");
		}
        newUser.setCompanyProfile(companyProfile);

        newUser.setFailedLoginCount(registrationDTO.getFailedLoginCount());

        // Convert the lastLoginDate string to LocalDateTime
        if (registrationDTO.getLastLoginDate() != null) {
            newUser.setLastLoginDate(LocalDateTime.parse(registrationDTO.getLastLoginDate()));
        }

        newUser.setLocked(registrationDTO.isLocked());

        userService.saveUser(newUser);

        ERole roleEnum = ERole.valueOf(roleStr.toUpperCase());
        Role role = roleService.findByName(roleEnum)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        userService.assignRole(newUser, roleEnum);

        return ResponseEntity.ok(Map.of("message", "User registered successfully with role " + roleEnum.name()));
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateToken((UserDetails) authentication.getPrincipal());
        User user = userService.findByUsername(username).orElseThrow();
        Role role = user.getRoles().stream().findFirst().orElseThrow();

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