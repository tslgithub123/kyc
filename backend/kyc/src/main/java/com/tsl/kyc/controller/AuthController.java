package com.tsl.kyc.controller;

import com.tsl.kyc.entity.Role;
import com.tsl.kyc.entity.User;
import com.tsl.kyc.service.UserService;
import com.tsl.kyc.security.JwtUtils; // Import your JWT utility class
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils; // Your JWT utility class

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        String role = request.get("role");

        if (userService.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username is already taken!"));
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password)); // Encrypt the password
        userService.saveUser(newUser);
        
        System.out.println("ROLE: " + role);
        System.out.println("ROLE: " + Role.ERole.valueOf(role));

        userService.assignRole(newUser, Role.ERole.valueOf(role));

        return ResponseEntity.ok(Map.of("message", "User registered successfully with role " + role));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate JWT token
        String jwt = jwtUtils.generateToken((UserDetails) authentication.getPrincipal());
        System.out.println("jwt token: " + jwt);
        return ResponseEntity.ok(Map.of("token", jwt));
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
