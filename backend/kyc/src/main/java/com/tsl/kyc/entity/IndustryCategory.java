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

    // Getters and setters
    // ...
}
