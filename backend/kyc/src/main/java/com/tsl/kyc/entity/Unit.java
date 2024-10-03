package com.tsl.kyc.entity;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "unit") 
public class Unit {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "symbol", length = 10, nullable = false)
    private String symbol;

//    @Enumerated(EnumType.STRING)
//    @Column(name = "unit_type", nullable = false)
//    private UnitType unitType; // Assuming UnitType is an enum

    @Column(name = "conversion_factor", precision = 10, scale = 5)
    private BigDecimal conversionFactor;

}
