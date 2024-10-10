package com.tsl.kyc.repository;

import com.tsl.kyc.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

    @Query("SELECT e FROM Employee e WHERE e.user.id = ?1")
    Employee findByUserId(UUID id);
}
