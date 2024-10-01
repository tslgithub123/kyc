package com.tsl.kyc.security;

import com.tsl.kyc.entity.User;
import com.tsl.kyc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class CompanySecurityService {

    private final UserService userService;

    public CompanySecurityService(UserService userService) {
        this.userService = userService;
    }

    public boolean hasAccessToCompany(UUID companyId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getCompanyProfile().getId().equals(companyId);
    }
}
