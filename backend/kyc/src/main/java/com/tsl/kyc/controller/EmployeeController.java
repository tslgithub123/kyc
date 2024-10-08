package com.tsl.kyc.controller;

import com.tsl.kyc.entity.Employee;
import com.tsl.kyc.service.EmployeeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/all")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // Add a new endpoint to get an employee by user id
    @GetMapping("/user/{id}")
    public Employee getEmployeeByUserId(@PathVariable UUID id) {
        return employeeService.getEmployeeByUserId(id);
    }
}
