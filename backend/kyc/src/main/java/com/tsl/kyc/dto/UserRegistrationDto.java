package com.tsl.kyc.dto;

import java.util.UUID;

public class UserRegistrationDto {
    private String username;
    private String password;
    private String roleId;
    private UUID companyUnitId;
    private String email;
    private String phone;
    private String employeeFullName;

    public UserRegistrationDto() {
        super();
    }

    public UserRegistrationDto(String username, String password, String roleId, UUID companyUnitId, String email, String phone, String employeeFullName) {
        super();
        this.username = username;
        this.password = password;
        this.roleId = roleId;
        this.companyUnitId = companyUnitId;
        this.email = email;
        this.phone = phone;
        this.employeeFullName = employeeFullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public UUID getCompanyUnitId() {
        return companyUnitId;
    }

    public void setCompanyUnitId(UUID companyUnitId) {
        this.companyUnitId = companyUnitId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmployeeFullName() {
        return employeeFullName;
    }

    public void setEmployeeFullName(String employeeFullName) {
        this.employeeFullName = employeeFullName;
    }

    @Override
    public String toString() {
        return "UserRegistrationDto{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", roleId='" + roleId + '\'' +
                ", companyUnitId=" + companyUnitId +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", employeeFullName='" + employeeFullName + '\'' +
                '}';
    }
}
