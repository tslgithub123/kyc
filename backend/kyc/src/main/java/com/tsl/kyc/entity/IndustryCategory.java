package com.tsl.kyc.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "industry_category")
public class IndustryCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "name", unique = true)
    private String name;

	public IndustryCategory() {
		super();
		// TODO Auto-generated constructor stub
	}

	public IndustryCategory(UUID id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
