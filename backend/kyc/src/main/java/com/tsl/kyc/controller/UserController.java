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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@Tag(name = "User", description = "Endpoints for managing users within the system.")
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

    @Operation(
            summary = "Retrieve all users by Company Unit ID",
            description = "Fetches a list of all users associated with a specific company unit."
    )
    @Parameters({
            @Parameter(
                    name = "companyUnitId",
                    description = "UUID of the company unit",
                    required = true,
                    in = ParameterIn.PATH,
                    schema = @Schema(type = "string", format = "uuid")
            )
    })
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "List of users retrieved successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = User.class)))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid Company Unit ID supplied",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Company Unit not found",
                    content = @Content
            )
    })
    @GetMapping("/all/unit/{companyUnitId}")
    public List<User> getUsersByCompanyUnitId(@PathVariable UUID companyUnitId) {
        return userService.findUsersByCompanyUnitId(companyUnitId);
    }

    @GetMapping("/all/unit/specific/{companyUnitId}")
    public List<User> getSpecificUsersByCompanyUnitId(@PathVariable UUID companyUnitId) {
        return userService.findSpecificUsersByCompanyUnitId(companyUnitId);
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
        response.put("emailStatus", employee != null ? employee.getEmailStatus() : null);
        response.put("designation", user.getDesignation());
        response.put("companyUnit", user.getCompanyUnit() != null ? user.getCompanyUnit().getName() : null);
        response.put("roles", user.getRoles());

        return ResponseEntity.ok(response);
    }
}
