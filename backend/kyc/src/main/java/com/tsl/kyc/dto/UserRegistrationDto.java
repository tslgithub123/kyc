package com.tsl.kyc.dto;


public class UserRegistrationDto {
    private String username;
    private String password;

    private String role;

    private boolean enabled;
    private String designation;
    private Long companyProfileId;
    private int failedLoginCount;
    private String lastLoginDate;
    private boolean locked;

    // Getters and Setters
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
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

    public int getFailedLoginCount() {
        return failedLoginCount;
    }

    public void setFailedLoginCount(int failedLoginCount) {
        this.failedLoginCount = failedLoginCount;
    }

    public String getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(String lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

	@Override
	public String toString() {
		return "UserRegistrationDto [username=" + username + ", password=" + password + ", role=" + role + ", enabled="
				+ enabled + ", designation=" + designation + ", companyProfileId=" + companyProfileId
				+ ", failedLoginCount=" + failedLoginCount + ", lastLoginDate=" + lastLoginDate + ", locked=" + locked
				+ "]";
	}
    
    
}
