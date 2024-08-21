package com.tsl.kyc.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException {

        logger.error("Unauthorized error: {}", authException.getMessage());

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        final Map<String, Object> body = new HashMap<>();
        body.put("path", request.getServletPath());

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        body.put("error", "Unauthorized");

        if (authException instanceof BadCredentialsException) {
            body.put("message", "Invalid username or password");
        } else if (authException instanceof AccountExpiredException) {
            body.put("message", "Account expired");
        } else if (authException instanceof DisabledException) {
            body.put("message", "Account disabled");
        } else if (authException instanceof LockedException) {
            body.put("message", "Account locked");
        } else {
            body.put("message", authException.getMessage());
        }

        final ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getOutputStream(), body);
    }
}
