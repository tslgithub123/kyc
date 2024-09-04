package com.tsl.kyc.service;

import com.tsl.kyc.entity.Employee;
import com.tsl.kyc.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeByUserId(Long id) {
        return employeeRepository.findByUserId(id);
    }
}
