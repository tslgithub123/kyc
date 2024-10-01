package com.tsl.kyc.security;

import com.tsl.kyc.entity.User;
import com.tsl.kyc.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class IdorSecurityService {

    private final UserService userService;

    public IdorSecurityService(UserService userService) {
        this.userService = userService;
    }

    public boolean hasAccessToCompany(UUID companyId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getCompanyProfile().getId().equals(companyId);
    }

    public boolean hasAccessToCompanyUnit(UUID companyUnitId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getCompanyProfile().getCompanyUnits().stream().anyMatch(companyUnit -> companyUnit.getId().equals(companyUnitId));
    }
}
