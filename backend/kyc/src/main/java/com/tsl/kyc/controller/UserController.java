package com.tsl.kyc.controller;

import com.tsl.kyc.entity.User;
import com.tsl.kyc.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAll();
    }

    @PutMapping("/{id}/lock")
    public ResponseEntity<User> changeLockStatus(@PathVariable UUID id, @RequestParam Boolean locked) {
        User user = userService.changeLockStatus(id, locked);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/username-exists/{username}")
    public ResponseEntity<Boolean> checkUsernameExists(@PathVariable String username) {
        return ResponseEntity.ok(userService.checkUsernameExists(username));
    }
    
}
