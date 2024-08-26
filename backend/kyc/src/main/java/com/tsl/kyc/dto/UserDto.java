package com.tsl.kyc.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;

public class UserDto implements Serializable {

    private Long id;
    private String username;

    @JsonIgnore
    private String password;
    private Boolean enabled;
    private String designation;
    private Long companyProfileId;
    private Integer failedLoginCount;
    private String lastLoginDate;
    private Boolean locked;
    private String companyName;

    // Default constructor
    public UserDto() {
    }
    
    

    // Getters and Setters

    public UserDto(Long id, String username, String password, Boolean enabled, String designation,
			Long companyProfileId, Integer failedLoginCount, String lastLoginDate, Boolean locked, String companyName) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.enabled = enabled;
		this.designation = designation;
		this.companyProfileId = companyProfileId;
		this.failedLoginCount = failedLoginCount;
		this.lastLoginDate = lastLoginDate;
		this.locked = locked;
        this.companyName = companyName;
	}



	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Long getCompanyProfileId() {
        return companyProfileId;
    }

    public void setCompanyProfileId(Long companyProfileId) {
        this.companyProfileId = companyProfileId;
    }

    public Integer getFailedLoginCount() {
        return failedLoginCount;
    }

    public void setFailedLoginCount(Integer failedLoginCount) {
        this.failedLoginCount = failedLoginCount;
    }

    public String getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(String lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }

    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", enabled=" + enabled +
                ", designation='" + designation + '\'' +
                ", companyProfileId=" + companyProfileId +
                ", failedLoginCount=" + failedLoginCount +
                ", lastLoginDate='" + lastLoginDate + '\'' +
                ", locked=" + locked +
                ", companyName='" + companyName + '\'' +
                '}';
    }
}
