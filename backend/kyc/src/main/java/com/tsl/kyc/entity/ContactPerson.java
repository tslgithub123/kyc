package com.tsl.kyc.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "contact_person")
public class ContactPerson {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "designation")
    private String designation;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    // Getters and setters
    // ...
}
