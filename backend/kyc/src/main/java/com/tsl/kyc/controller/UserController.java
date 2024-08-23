package com.tsl.kyc.controller;

import com.tsl.kyc.dto.UserDto;
import com.tsl.kyc.service.UserService;
import org.apache.tomcat.util.net.TLSClientHelloExtractor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
