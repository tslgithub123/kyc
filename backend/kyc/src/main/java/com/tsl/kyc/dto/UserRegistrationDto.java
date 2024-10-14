package com.tsl.kyc.dto;

import java.sql.Date;
import java.util.UUID;

import com.tsl.kyc.entity.ContactPerson;

public class UserRegistrationDto {
    private String username;
    private String password;
    private String roleId;
    private UUID companyUnitId;
    private String email;
    private String phone;
    private String employeeFullName;
    private String gender;
    private Date birthday;
    private String maritalStatus;
    private String profileStatus;
    private String emailStatus;
    

    public UserRegistrationDto() {
        super();
    }

    public UserRegistrationDto(String username, String password, String roleId, UUID companyUnitId, String email,
    		String phone, String employeeFullName, String gender, Date birthday, String maritalStatus) {
    	super();
    	this.username = username;
    	this.password = password;
    	this.roleId = roleId;
    	this.companyUnitId = companyUnitId;
    	this.email = email;
    	this.phone = phone;
    	this.employeeFullName = employeeFullName;
    	this.gender = gender;
    	this.birthday = birthday;
        this.maritalStatus = maritalStatus;
    }

//    public UserRegistrationDto(String username, String password, String roleId, UUID companyUnitId, String email, String phone, String employeeFullName, String gender, Date birthday, String maritalStatus, String profileStatus, String emailStatus) {
//        this.username = username;
//        this.password = password;
//        this.roleId = roleId;
//        this.companyUnitId = companyUnitId;
//        this.email = email;
//        this.phone = phone;
//        this.employeeFullName = employeeFullName;
//        this.gender = gender;
//        this.birthday = birthday;
//        this.maritalStatus = maritalStatus;
//        this.profileStatus = profileStatus;
//        this.emailStatus = emailStatus;
//    }

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

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

//    public String getProfileStatus() {
//        return profileStatus;
//    }
//
//    public void setProfileStatus(String profileStatus) {
//        this.profileStatus = profileStatus;
//    }
//
//    public String getEmailStatus() {
//        return emailStatus;
//    }
//
//    public void setEmailStatus(String emailStatus) {
//        this.emailStatus = emailStatus;
//    }

    @Override
	public String toString() {
		return "UserRegistrationDto [username=" + username + ", password=" + password + ", roleId=" + roleId
				+ ", companyUnitId=" + companyUnitId + ", email=" + email + ", phone=" + phone + ", employeeFullName="
				+ employeeFullName + ", gender=" + gender + ", birthday=" + birthday + ", maritalStatus=" + maritalStatus +"]";
	}

//    @Override
//    public String toString() {
//        return "UserRegistrationDto{" +
//                "username='" + username + '\'' +
//                ", password='" + password + '\'' +
//                ", roleId='" + roleId + '\'' +
//                ", companyUnitId=" + companyUnitId +
//                ", email='" + email + '\'' +
//                ", phone='" + phone + '\'' +
//                ", employeeFullName='" + employeeFullName + '\'' +
//                ", gender='" + gender + '\'' +
//                ", birthday=" + birthday +
//                ", maritalStatus='" + maritalStatus + '\'' +
//                ", profileStatus='" + profileStatus + '\'' +
//                ", emailStatus='" + emailStatus + '\'' +
//                '}';
//    }
}
