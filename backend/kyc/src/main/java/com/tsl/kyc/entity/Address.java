package com.tsl.kyc.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.UUID;

@Entity
@Table(name = "address")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Address {
//    @Id
//    @ColumnDefault("uuid_generate_v4()")
//    @Column(name = "id", nullable = false)
//    private UUID id;
	    @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private UUID id;
	
    @Size(max = 255)
    @Column(name = "street")
    private String street;

    @Size(max = 255)
    @Column(name = "line2")
    private String line2;

    @Size(max = 255)
    @Column(name = "line3")
    private String line3;

    @Size(max = 255)
    @Column(name = "city")
    private String city;

    @Size(max = 255)
    @Column(name = "state")
    private String state;

    @Size(max = 255)
    @Column(name = "district")
    private String district;

    @Size(max = 255)
    @Column(name = "country")
    private String country;

    @Size(max = 20)
    @Column(name = "pincode", length = 20)
    private String pincode;

    @Size(max = 255)
    @Column(name = "village")
    private String village;

    @Size(max = 255)
    @Column(name = "taluka")
    private String taluka;

    @Size(max = 255)
    @Column(name = "plot_number")
    private String plotNumber;

    @Size(max = 255)
    @Column(name = "ro")
    private String ro;

    @Size(max = 255)
    @Column(name = "sro")
    private String sro;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getLine2() {
        return line2;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }

    public String getLine3() {
        return line3;
    }

    public void setLine3(String line3) {
        this.line3 = line3;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getVillage() {
        return village;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public String getTaluka() {
        return taluka;
    }

    public void setTaluka(String taluka) {
        this.taluka = taluka;
    }

    public String getPlotNumber() {
        return plotNumber;
    }

    public void setPlotNumber(String plotNumber) {
        this.plotNumber = plotNumber;
    }

    public String getRo() {
        return ro;
    }

    public void setRo(String ro) {
        this.ro = ro;
    }

    public String getSro() {
        return sro;
    }

    public void setSro(String sro) {
        this.sro = sro;
    }

}