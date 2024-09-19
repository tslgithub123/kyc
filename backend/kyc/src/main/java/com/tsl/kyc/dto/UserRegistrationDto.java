package com.tsl.kyc.dto;


public class UserRegistrationDto {
    private String employeeName;
    private String username;
    private String email;
    private Long roleId;
    private Long companyProfileId;
    private String phoneNumber;

    public UserRegistrationDto() {
		super();
	}

    public UserRegistrationDto(String employeeName, String username, String email, Long roleId, Long companyProfileId, String phoneNumber) {
        this.employeeName = employeeName;
        this.username = username;
        this.email = email;
        this.roleId = roleId;
        this.phoneNumber = phoneNumber;
        this.companyProfileId = companyProfileId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Long getCompanyProfileId() {
        return companyProfileId;
    }

    public void setCompanyProfileId(Long companyProfileId) {
        this.companyProfileId = companyProfileId;
    }

    @Override
    public String toString() {
        return "UserRegistrationDto{" +
                "employeeName='" + employeeName + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", roleId=" + roleId +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", companyProfileId=" + companyProfileId +
                '}';
    }
}
