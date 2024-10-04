package com.tsl.kyc.dto;

import com.tsl.kyc.entity.Address;
import com.tsl.kyc.entity.IndustryLink;

public class CompanyUnitDto {

    private Address address;

    private IndustryLink industryLink;

    private String name;

    private String type;

    private String email;

    private String fax;

    private Integer workDay;

    private Integer workingHour;

	public CompanyUnitDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CompanyUnitDto(Address address, IndustryLink industryLink, String name, String type, String email,
			String fax, Integer workDay, Integer workingHour) {
		super();
		this.address = address;
		this.industryLink = industryLink;
		this.name = name;
		this.type = type;
		this.email = email;
		this.fax = fax;
		this.workDay = workDay;
		this.workingHour = workingHour;
	}
    
    
}
