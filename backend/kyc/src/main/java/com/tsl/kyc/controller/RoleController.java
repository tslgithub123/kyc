package com.tsl.kyc.controller;

import com.tsl.kyc.entity.Role;
import com.tsl.kyc.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/role")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/all")
    public List<Role> getAllRoles() {
        return roleService.findAll();
    }
}
