package com.tsl.kyc.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "hazardous_manifest")
public class HazardousWaste {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
	
	@Column(name = "sender_name")
    private String senderName;
	@Column(name = "senders_mailing_address")
    private String sendersMailingAddress;
	@Column(name = "senders_phone_no")
	private String sendersPhoneNo;
	@Column(name = "senders_authorization_no")
    private String sendersAuthorizationNo;
	@Column(name = "manifest_document_no")
    private String manifestDocumentNo;
	@Column(name = "transporter_name")
    private String transporterName;
	@Column(name = "transporter_address")
    private String transporterAddress;
	@Column(name = "transporter_mobile_no")
    private String transporterMobileNo;
	@Column(name = "vehicle_type")
    private String vehicleType;
	@Column(name = "transporter_reg_no")
    private String transporterRegNo;
	@Column(name = "transporter_vehicle_reg_no")
    private String transporterVehicleRegNo;
	@Column(name = "receivers_name")
    private String receiversName;
	@Column(name = "receivers_address")
    private String receiversAddress;
	@Column(name = "receivers_authorization_no")
    private String receiversAuthorizationNo;
	@Column(name = "receivers_phone_no")
    private String receiversPhoneNo;
	@Column(name = "total_quantity_container")
    private String totalQuantityContainer;
    
//    @ManyToOne
//    @JoinColumn(name = "unit_id", referencedColumnName = "id", nullable = true)
//    private Unit unit; // Assuming you have a Unit entity class
	
	@Column(name = "special_handling")
    private String specialHandling;
	@Column(name = "submitted_date")
    private String submittedDate;
	@Column(name = "designed_facility_name")
    private String designedFacilityName;
	@Column(name = "facility_phone_no")
    private String facilityPhoneNo; 
	@Column(name = "facility_registration_no")
    private String facilityRegistrationNo;
	@Column(name = "mailing_address")
    private String mailingAddress;
	@Column(name = "mobile_no")
    private String mobileNo; 
	@Column(name = "occupier_name")
    private String occupierName;
	@Column(name = "registration_no")
    private String registrationNo;
	@Column(name = "site_address")
    private String siteAddress;
	@Column(name = "transport_desc_waste")
    private String transportDescWaste;
	@Column(name = "dispatched_to")
    private String dispatchedTo;
    
	public HazardousWaste() {
		super();
	}

	public HazardousWaste(UUID id, String senderName, String sendersMailingAddress, String sendersPhoneNo,
			String sendersAuthorizationNo, String manifestDocumentNo, String transporterName, String transporterAddress,
			String transporterMobileNo, String vehicleType, String transporterRegNo, String transporterVehicleRegNo,
			String receiversName, String receiversAddress, String receiversAuthorizationNo, String receiversPhoneNo,
			String totalQuantityContainer, 
//			Unit unit, 
			String specialHandling, String submittedDate,
			String designedFacilityName, String facilityPhoneNo, String facilityRegistrationNo, String mailingAddress,
			String mobileNo, String occupierName, String registrationNo, String siteAddress, String transportDescWaste,
			String dispatchedTo) {
		super();
		this.id = id;
		this.senderName = senderName;
		this.sendersMailingAddress = sendersMailingAddress;
		this.sendersPhoneNo = sendersPhoneNo;
		this.sendersAuthorizationNo = sendersAuthorizationNo;
		this.manifestDocumentNo = manifestDocumentNo;
		this.transporterName = transporterName;
		this.transporterAddress = transporterAddress;
		this.transporterMobileNo = transporterMobileNo;
		this.vehicleType = vehicleType;
		this.transporterRegNo = transporterRegNo;
		this.transporterVehicleRegNo = transporterVehicleRegNo;
		this.receiversName = receiversName;
		this.receiversAddress = receiversAddress;
		this.receiversAuthorizationNo = receiversAuthorizationNo;
		this.receiversPhoneNo = receiversPhoneNo;
		this.totalQuantityContainer = totalQuantityContainer;
//		this.unit = unit;
		this.specialHandling = specialHandling;
		this.submittedDate = submittedDate;
		this.designedFacilityName = designedFacilityName;
		this.facilityPhoneNo = facilityPhoneNo;
		this.facilityRegistrationNo = facilityRegistrationNo;
		this.mailingAddress = mailingAddress;
		this.mobileNo = mobileNo;
		this.occupierName = occupierName;
		this.registrationNo = registrationNo;
		this.siteAddress = siteAddress;
		this.transportDescWaste = transportDescWaste;
		this.dispatchedTo = dispatchedTo;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getSenderName() {
		return senderName;
	}

	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}

	public String getSendersMailingAddress() {
		return sendersMailingAddress;
	}

	public void setSendersMailingAddress(String sendersMailingAddress) {
		this.sendersMailingAddress = sendersMailingAddress;
	}

	public String getSendersPhoneNo() {
		return sendersPhoneNo;
	}

	public void setSendersPhoneNo(String sendersPhoneNo) {
		this.sendersPhoneNo = sendersPhoneNo;
	}

	public String getSendersAuthorizationNo() {
		return sendersAuthorizationNo;
	}

	public void setSendersAuthorizationNo(String sendersAuthorizationNo) {
		this.sendersAuthorizationNo = sendersAuthorizationNo;
	}

	public String getManifestDocumentNo() {
		return manifestDocumentNo;
	}

	public void setManifestDocumentNo(String manifestDocumentNo) {
		this.manifestDocumentNo = manifestDocumentNo;
	}

	public String getTransporterName() {
		return transporterName;
	}

	public void setTransporterName(String transporterName) {
		this.transporterName = transporterName;
	}

	public String getTransporterAddress() {
		return transporterAddress;
	}

	public void setTransporterAddress(String transporterAddress) {
		this.transporterAddress = transporterAddress;
	}

	public String getTransporterMobileNo() {
		return transporterMobileNo;
	}

	public void setTransporterMobileNo(String transporterMobileNo) {
		this.transporterMobileNo = transporterMobileNo;
	}

	public String getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}

	public String getTransporterRegNo() {
		return transporterRegNo;
	}

	public void setTransporterRegNo(String transporterRegNo) {
		this.transporterRegNo = transporterRegNo;
	}

	public String getTransporterVehicleRegNo() {
		return transporterVehicleRegNo;
	}

	public void setTransporterVehicleRegNo(String transporterVehicleRegNo) {
		this.transporterVehicleRegNo = transporterVehicleRegNo;
	}

	public String getReceiversName() {
		return receiversName;
	}

	public void setReceiversName(String receiversName) {
		this.receiversName = receiversName;
	}

	public String getReceiversAddress() {
		return receiversAddress;
	}

	public void setReceiversAddress(String receiversAddress) {
		this.receiversAddress = receiversAddress;
	}

	public String getReceiversAuthorizationNo() {
		return receiversAuthorizationNo;
	}

	public void setReceiversAuthorizationNo(String receiversAuthorizationNo) {
		this.receiversAuthorizationNo = receiversAuthorizationNo;
	}

	public String getReceiversPhoneNo() {
		return receiversPhoneNo;
	}

	public void setReceiversPhoneNo(String receiversPhoneNo) {
		this.receiversPhoneNo = receiversPhoneNo;
	}

	public String getTotalQuantityContainer() {
		return totalQuantityContainer;
	}

	public void setTotalQuantityContainer(String totalQuantityContainer) {
		this.totalQuantityContainer = totalQuantityContainer;
	}

//	public Unit getUnit() {
//		return unit;
//	}
//
//	public void setUnit(Unit unit) {
//		this.unit = unit;
//	}

	public String getSpecialHandling() {
		return specialHandling;
	}

	public void setSpecialHandling(String specialHandling) {
		this.specialHandling = specialHandling;
	}

	public String getSubmittedDate() {
		return submittedDate;
	}

	public void setSubmittedDate(String submittedDate) {
		this.submittedDate = submittedDate;
	}

	public String getDesignedFacilityName() {
		return designedFacilityName;
	}

	public void setDesignedFacilityName(String designedFacilityName) {
		this.designedFacilityName = designedFacilityName;
	}

	public String getFacilityPhoneNo() {
		return facilityPhoneNo;
	}

	public void setFacilityPhoneNo(String facilityPhoneNo) {
		this.facilityPhoneNo = facilityPhoneNo;
	}

	public String getFacilityRegistrationNo() {
		return facilityRegistrationNo;
	}

	public void setFacilityRegistrationNo(String facilityRegistrationNo) {
		this.facilityRegistrationNo = facilityRegistrationNo;
	}

	public String getMailingAddress() {
		return mailingAddress;
	}

	public void setMailingAddress(String mailingAddress) {
		this.mailingAddress = mailingAddress;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getOccupierName() {
		return occupierName;
	}

	public void setOccupierName(String occupierName) {
		this.occupierName = occupierName;
	}

	public String getRegistrationNo() {
		return registrationNo;
	}

	public void setRegistrationNo(String registrationNo) {
		this.registrationNo = registrationNo;
	}

	public String getSiteAddress() {
		return siteAddress;
	}

	public void setSiteAddress(String siteAddress) {
		this.siteAddress = siteAddress;
	}

	public String getTransportDescWaste() {
		return transportDescWaste;
	}

	public void setTransportDescWaste(String transportDescWaste) {
		this.transportDescWaste = transportDescWaste;
	}

	public String getDispatchedTo() {
		return dispatchedTo;
	}

	public void setDispatchedTo(String dispatchedTo) {
		this.dispatchedTo = dispatchedTo;
	}

	@Override
	public String toString() {
		return "Hazardous_waste [id=" + id + ", senderName=" + senderName + ", sendersMailingAddress="
				+ sendersMailingAddress + ", sendersPhoneNo=" + sendersPhoneNo + ", sendersAuthorizationNo="
				+ sendersAuthorizationNo + ", manifestDocumentNo=" + manifestDocumentNo + ", transporterName="
				+ transporterName + ", transporterAddress=" + transporterAddress + ", transporterMobileNo="
				+ transporterMobileNo + ", vehicleType=" + vehicleType + ", transporterRegNo=" + transporterRegNo
				+ ", transporterVehicleRegNo=" + transporterVehicleRegNo + ", receiversName=" + receiversName
				+ ", receiversAddress=" + receiversAddress + ", receiversAuthorizationNo=" + receiversAuthorizationNo
				+ ", receiversPhoneNo=" + receiversPhoneNo + ", totalQuantityContainer=" + totalQuantityContainer
				+ ", specialHandling=" + specialHandling + ", submittedDate=" + submittedDate
				+ ", designedFacilityName=" + designedFacilityName + ", facilityPhoneNo=" + facilityPhoneNo
				+ ", facilityRegistrationNo=" + facilityRegistrationNo + ", mailingAddress=" + mailingAddress
				+ ", mobileNo=" + mobileNo + ", occupierName=" + occupierName + ", registrationNo=" + registrationNo
				+ ", siteAddress=" + siteAddress + ", transportDescWaste=" + transportDescWaste + ", dispatchedTo="
				+ dispatchedTo + "]";
	}

	
}
