package com.tsl.kyc.service;

import com.tsl.kyc.entity.Employee;
import com.tsl.kyc.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeByUserId(UUID id) {
        return employeeRepository.findByUserId(id);
    }

    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }
}
