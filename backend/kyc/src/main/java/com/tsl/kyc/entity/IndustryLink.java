package com.tsl.kyc.entity;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "industry_link")
public class IndustryLink {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "industry_scale_id")
    private IndustryScale industryScale;

    @ManyToOne
    @JoinColumn(name = "industry_type_id")
    private IndustryType industryType;

    @ManyToOne
    @JoinColumn(name = "industry_category_id")
    private IndustryCategory industryCategory;

    public IndustryLink(UUID id, IndustryScale industryScale, IndustryType industryType, IndustryCategory industryCategory) {
        this.id = id;
        this.industryScale = industryScale;
        this.industryType = industryType;
        this.industryCategory = industryCategory;
    }

    public IndustryLink() {

    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public IndustryScale getIndustryScale() {
        return industryScale;
    }

    public void setIndustryScale(IndustryScale industryScale) {
        this.industryScale = industryScale;
    }

    public IndustryType getIndustryType() {
        return industryType;
    }

    public void setIndustryType(IndustryType industryType) {
        this.industryType = industryType;
    }

    public IndustryCategory getIndustryCategory() {
        return industryCategory;
    }

    public void setIndustryCategory(IndustryCategory industryCategory) {
        this.industryCategory = industryCategory;
    }
}
