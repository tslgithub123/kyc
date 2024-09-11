package com.tsl.kyc.config;

import java.util.Arrays;
import java.util.List;

import com.tsl.kyc.security.filter.RequestLoggingFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.tsl.kyc.security.AuthEntryPointJwt;
import com.tsl.kyc.security.filter.JwtAuthenticationFilter;
import com.tsl.kyc.security.JwtUtils;
import com.tsl.kyc.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	private final AuthEntryPointJwt unauthorizedHandler;
    private final CustomUserDetailsService userDetailsService;
    private final JwtUtils jwtUtils;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public SecurityConfig(CustomUserDetailsService userDetailsService, JwtUtils jwtUtils, AuthEntryPointJwt unauthorizedHandler) {
        this.userDetailsService = userDetailsService;
        this.jwtUtils = jwtUtils;
        this.unauthorizedHandler = unauthorizedHandler;
    }

    @Bean
    JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtUtils, userDetailsService);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://192.168.1.8:5173","http://localhost:5173","http://192.168.1.8:5174","http://localhost:5174","http://192.168.1.8:5175","http://localhost:5175"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(List.of("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/test/**").permitAll()
                                .requestMatchers("/api/company-profile/**").permitAll()
                                .requestMatchers("/api/**").permitAll()
                                .requestMatchers("/api/user/all").permitAll()
//                                .requestMatchers("/api/employee/**").permitAll()
                                .anyRequest().authenticated()
                );
        http.addFilterBefore(new RequestLoggingFilter(), UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}