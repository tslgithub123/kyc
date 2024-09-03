package com.tsl.kyc.controller;

import com.tsl.kyc.dto.UserDto;
import com.tsl.kyc.entity.User;
import com.tsl.kyc.service.UserService;
import org.apache.tomcat.util.net.TLSClientHelloExtractor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<UserDto> getAllUsers() {
        return userService.getAll();
    }

    @PutMapping("/{id}/lock")
    public ResponseEntity<UserDto> changeLockStatus(@PathVariable Long id, @RequestParam Boolean locked) {
        UserDto userDto = UserService.convertToDto(userService.changeLockStatus(id, locked));
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/username-exists/{username}")
    public ResponseEntity<Boolean> checkUsernameExists(@PathVariable String username) {
        return ResponseEntity.ok(userService.checkUsernameExists(username));
    }
}
