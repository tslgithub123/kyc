package com.tsl.kyc.dto;

public class IndustryLinkDto {
	private String Scale;
	private String Category;
	private String Type;
	public IndustryLinkDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public IndustryLinkDto(String scale, String category, String type) {
		super();
		Scale = scale;
		Category = category;
		Type = type;
	}
	public String getScale() {
		return Scale;
	}
	public String getCategory() {
		return Category;
	}
	public String getType() {
		return Type;
	}
	public void setScale(String scale) {
		Scale = scale;
	}
	public void setCategory(String category) {
		Category = category;
	}
	public void setType(String type) {
		Type = type;
	}
	
	
}
