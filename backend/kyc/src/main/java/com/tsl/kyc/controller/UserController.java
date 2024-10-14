package com.tsl.kyc.controller;

import com.tsl.kyc.dto.UserRegistrationDto;
import com.tsl.kyc.entity.CompanyUnit;
import com.tsl.kyc.entity.Employee;
import com.tsl.kyc.entity.Role;
import com.tsl.kyc.entity.User;
import com.tsl.kyc.service.CompanyUnitService;
import com.tsl.kyc.service.EmployeeService;
import com.tsl.kyc.service.RoleService;
import com.tsl.kyc.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    private final EmployeeService employeeService;

    private final CompanyUnitService companyUnitService;

    private final RoleService roleService;

//    private final ContactPersonService contactPersonService;

    public UserController(UserService userService, EmployeeService employeeService, CompanyUnitService companyUnitService, RoleService roleService) {
        this.userService = userService;
        this.employeeService = employeeService;
        this.companyUnitService = companyUnitService;
        this.roleService = roleService;
    }

    @GetMapping("/all/company/{companyUnitId}")
    public List<User> getUsersByCompanyUnitId(@PathVariable UUID companyUnitId) {
        return userService.findUsersByCompanyUnitId(companyUnitId);
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


    @PutMapping("/officers/{id}")
    public ResponseEntity<?> updateUser(@PathVariable UUID id, @Validated @RequestBody UserRegistrationDto userRegistrationDto) {
        Optional<User> userOptional = userService.findById(id);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
        }

        User user = userOptional.get();

        // Update fields as needed
        if (userRegistrationDto.getUsername() != null) {
            user.setUsername(userRegistrationDto.getUsername());
        }

        if (userRegistrationDto.getEmployeeFullName() != null) {
            Employee employee = employeeService.getEmployeeByUserId(id);
            if (employee != null) {
                employee.setName(userRegistrationDto.getEmployeeFullName());
                employee.setGender(userRegistrationDto.getGender());
                employee.setBirthday(userRegistrationDto.getBirthday());
                employee.setEmail(userRegistrationDto.getEmail());
                employee.setMaritalStatus(userRegistrationDto.getMaritalStatus());
//                employee.setProfileStatus(userRegistrationDto.getProfileStatus());
//                employee.setEmailStatus(userRegistrationDto.getEmailStatus());
//                employee.setContactPerson(userRegistrationDto.getContactPersonId());


//                if (userRegistrationDto.getContactPersonId() != null) {
//                    Optional<ContactPerson> contactPersonOptional = contactPersonService.findById(userRegistrationDto.getContactPersonId());
//                    if (contactPersonOptional.isPresent()) {
//                        employee.setContactPerson(contactPersonOptional.get()); // Assuming there's a setter for contactPerson in Employee
//                    } else {
//                        return ResponseEntity.badRequest().body(Map.of("message", "Contact Person not found"));
//                    }
//                }

                employeeService.save(employee);
            }
        }
        userService.replaceRole(user, userRegistrationDto.getRoleId());
        if (userRegistrationDto.getCompanyUnitId() != null) {
            CompanyUnit companyUnit = companyUnitService.getCompanyUnitById(userRegistrationDto.getCompanyUnitId());
            user.setCompanyUnit(companyUnit);
        }

        // Save the updated user
        userService.saveUser(user);

        return ResponseEntity.ok(Map.of("message", "User updated successfully", "user", user));
    }

    @GetMapping("/officer/{id}")
    public ResponseEntity<?> getUser(@PathVariable UUID id) {
        Optional<User> userOptional = userService.findById(id);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
        }

        User user = userOptional.get();
        Employee employee = employeeService.getEmployeeByUserId(id);

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("employeeFullName", employee != null ? employee.getName() : null);
        response.put("gender", employee != null ? employee.getGender() : null);
        response.put("birthday", employee != null ? employee.getBirthday() : null);
        response.put("email", employee != null ? employee.getEmail() : null);
//        response.put("maritalStatus", employee != null ? employee.getMaritalStatus() : null);
//        response.put("profileStatus", employee != null ? employee.getProfileStatus() : null);
        response.put("emailStatus", employee != null ? employee.getEmailStatus() : null);
        response.put("designation", user.getDesignation());
        response.put("companyUnit", user.getCompanyUnit() != null ? user.getCompanyUnit().getName() : null);
        response.put("roles", user.getRoles());

        return ResponseEntity.ok(response);
    }
}
