package com.tsl.kyc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@JsonIgnore
    @Enumerated(EnumType.STRING)
    private ERole name;

    @Override
    public String getAuthority() {
        return name.name();
    }

    public enum ERole {
        ROLE_ADMIN,
        ROLE_ENVIRONMENT_OFFICER,
        ROLE_MANAGEMENT,
        ROLE_THIRD_PARTY
    }
    
    public Role() {
		super();
	}
    
	public Role(Long id, ERole name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ERole getName() {
		return name;
	}

	public void setName(ERole name) {
		this.name = name;
	}

    
}
