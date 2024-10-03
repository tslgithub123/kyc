// import React, { useState } from 'react';

// const initialFormData = {
//     senderName: '',
//     sendersMailingAddress: '',
//     sendersPhoneNo: '',
//     sendersAuthorizationNo: '',
//     manifestDocumentNo: '',
//     transporterName: '',
//     transporterAddress: '',
//     transporterMobileNo: '',
//     vehicleType: '',
//     transporterRegNo: '',
//     transporterVehicleRegNo: '',
//     receiversName: '',
//     receiversAddress: '',
//     receiversAuthorizationNo: '',
//     receiversPhoneNo: '',
//     totalQuantityContainer: '',
//     specialHandling: '',
//     submittedDate: '',
//     designedFacilityName: '',
//     facilityPhoneNo: '',
//     facilityRegistrationNo: '',
//     mailingAddress: '',
//     mobileNo: '',
//     occupierName: '',
//     registrationNo: '',
//     siteAddress: '',
//     transportDescWaste: '',
//     dispatchedTo: ''
// };

// const Hazardous = () => {
//     const [formData, setFormData] = useState(initialFormData);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:8080/api/hazardouswaste', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });
//             if (response.ok) {
//                 alert('Hazardous Waste submitted successfully!');
//                 setFormData(initialFormData); 
//             } else {
//                 alert('Error submitting form');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Hazardous Waste Submission</h2>
//             <div>
//                 <label>
//                     Sender Name:
//                     <input
//                         type="text"
//                         name="senderName"
//                         value={formData.senderName}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div><div>
//                 <label>
//                     Sender's Mailing Address:
//                     <input
//                         type="text"
//                         name="sendersMailingAddress"
//                         value={formData.sendersMailingAddress}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Sender's Phone No:
//                     <input
//                         type="text"
//                         name="sendersPhoneNo"
//                         value={formData.sendersPhoneNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Sender's Authorization No:
//                     <input
//                         type="text"
//                         name="sendersAuthorizationNo"
//                         value={formData.sendersAuthorizationNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Manifest Document No:
//                     <input
//                         type="text"
//                         name="manifestDocumentNo"
//                         value={formData.manifestDocumentNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Transporter Name:
//                     <input
//                         type="text"
//                         name="transporterName"
//                         value={formData.transporterName}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Transporter Address:
//                     <input
//                         type="text"
//                         name="transporterAddress"
//                         value={formData.transporterAddress}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Transporter Mobile No:
//                     <input
//                         type="text"
//                         name="transporterMobileNo"
//                         value={formData.transporterMobileNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Vehicle Type:
//                     <input
//                         type="text"
//                         name="vehicleType"
//                         value={formData.vehicleType}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Transporter Reg No:
//                     <input
//                         type="text"
//                         name="transporterRegNo"
//                         value={formData.transporterRegNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Transporter Vehicle Reg No:
//                     <input
//                         type="text"
//                         name="transporterVehicleRegNo"
//                         value={formData.transporterVehicleRegNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Receiver's Name:
//                     <input
//                         type="text"
//                         name="receiversName"
//                         value={formData.receiversName}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Receiver's Address:
//                     <input
//                         type="text"
//                         name="receiversAddress"
//                         value={formData.receiversAddress}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Receiver's Authorization No:
//                     <input
//                         type="text"
//                         name="receiversAuthorizationNo"
//                         value={formData.receiversAuthorizationNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Receiver's Phone No:
//                     <input
//                         type="text"
//                         name="receiversPhoneNo"
//                         value={formData.receiversPhoneNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Total Quantity Container:
//                     <input
//                         type="text"
//                         name="totalQuantityContainer"
//                         value={formData.totalQuantityContainer}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Special Handling:
//                     <input
//                         type="text"
//                         name="specialHandling"
//                         value={formData.specialHandling}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Submitted Date:
//                     <input
//                         type="date"
//                         name="submittedDate"
//                         value={formData.submittedDate}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Designed Facility Name:
//                     <input
//                         type="text"
//                         name="designedFacilityName"
//                         value={formData.designedFacilityName}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Facility Phone No:
//                     <input
//                         type="text"
//                         name="facilityPhoneNo"
//                         value={formData.facilityPhoneNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Facility Registration No:
//                     <input
//                         type="text"
//                         name="facilityRegistrationNo"
//                         value={formData.facilityRegistrationNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Mailing Address:
//                     <input
//                         type="text"
//                         name="mailingAddress"
//                         value={formData.mailingAddress}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Mobile No:
//                     <input
//                         type="text"
//                         name="mobileNo"
//                         value={formData.mobileNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Occupier Name:
//                     <input
//                         type="text"
//                         name="occupierName"
//                         value={formData.occupierName}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Registration No:
//                     <input
//                         type="text"
//                         name="registrationNo"
//                         value={formData.registrationNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Site Address:
//                     <input
//                         type="text"
//                         name="siteAddress"
//                         value={formData.siteAddress}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Transport Description Waste:
//                     <input
//                         type="text"
//                         name="transportDescWaste"
//                         value={formData.transportDescWaste}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Dispatched To:
//                     <input
//                         type="text"
//                         name="dispatchedTo"
//                         value={formData.dispatchedTo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default Hazardous;
import React, { useState } from 'react';
import {
    TextInput,
    Button,
    Group,
    Container,
    Title,
    Stack,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates'; // Import DatePicker

const initialFormData = {
    senderName: '',
    sendersMailingAddress: '',
    sendersPhoneNo: '',
    sendersAuthorizationNo: '',
    manifestDocumentNo: '',
    transporterName: '',
    transporterAddress: '',
    transporterMobileNo: '',
    vehicleType: '',
    transporterRegNo: '',
    transporterVehicleRegNo: '',
    receiversName: '',
    receiversAddress: '',
    receiversAuthorizationNo: '',
    receiversPhoneNo: '',
    totalQuantityContainer: '',
    specialHandling: '',
    submittedDate: '',
    designedFacilityName: '',
    facilityPhoneNo: '',
    facilityRegistrationNo: '',
    mailingAddress: '',
    mobileNo: '',
    occupierName: '',
    registrationNo: '',
    siteAddress: '',
    transportDescWaste: '',
    dispatchedTo: '',
};

const Hazardous = () => {
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, submittedDate: date ? date.toISOString().split('T')[0] : '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/hazardouswaste', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Hazardous Waste submitted successfully!');
                setFormData(initialFormData);
            } else {
                alert('Error submitting form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container>
            <Title order={2} mb="md">Hazardous Waste Submission</Title>
            <form onSubmit={handleSubmit}>
                <Stack spacing="md">
                    <TextInput
                        label="Sender Name"
                        name="senderName"
                        value={formData.senderName}
                        onChange={handleChange}
                        required
                    />
                    <TextInput
                        label="Sender's Mailing Address"
                        name="sendersMailingAddress"
                        value={formData.sendersMailingAddress}
                        onChange={handleChange}
                        required
                    />
                    <TextInput
                        label="Sender's Phone No"
                        name="sendersPhoneNo"
                        value={formData.sendersPhoneNo}
                        onChange={handleChange}
                        required
                    />
                    <TextInput
                        label="Sender's Authorization No"
                        name="sendersAuthorizationNo"
                        value={formData.sendersAuthorizationNo}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Manifest Document No"
                        name="manifestDocumentNo"
                        value={formData.manifestDocumentNo}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Transporter Name"
                        name="transporterName"
                        value={formData.transporterName}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Transporter Address"
                        name="transporterAddress"
                        value={formData.transporterAddress}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Transporter Mobile No"
                        name="transporterMobileNo"
                        value={formData.transporterMobileNo}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Vehicle Type"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Transporter Reg No"
                        name="transporterRegNo"
                        value={formData.transporterRegNo}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Transporter Vehicle Reg No"
                        name="transporterVehicleRegNo"
                        value={formData.transporterVehicleRegNo}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Receiver's Name"
                        name="receiversName"
                        value={formData.receiversName}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Receiver's Address"
                        name="receiversAddress"
                        value={formData.receiversAddress}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Receiver's Authorization No"
                        name="receiversAuthorizationNo"
                        value={formData.receiversAuthorizationNo}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Receiver's Phone No"
                        name="receiversPhoneNo"
                        value={formData.receiversPhoneNo}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Total Quantity Container"
                        name="totalQuantityContainer"
                        value={formData.totalQuantityContainer}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Special Handling"
                        name="specialHandling"
                        value={formData.specialHandling}
                        onChange={handleChange}
                    />
                    <DatePicker
                        label="Submitted Date"
                        name="submittedDate"
                        value={formData.submittedDate ? new Date(formData.submittedDate) : null}
                        onChange={handleDateChange}
                    />
                    <TextInput
                        label="Designed Facility Name"
                        name="designedFacilityName"
                        value={formData.designedFacilityName}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Facility Phone No"
                        name="facilityPhoneNo"
                        value={formData.facilityPhoneNo}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Facility Registration No"
                        name="facilityRegistrationNo"
                        value={formData.facilityRegistrationNo}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Mailing Address"
                        name="mailingAddress"
                        value={formData.mailingAddress}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Mobile No"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Occupier Name"
                        name="occupierName"
                        value={formData.occupierName}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Registration No"
                        name="registrationNo"
                        value={formData.registrationNo}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Site Address"
                        name="siteAddress"
                        value={formData.siteAddress}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Transport Description Waste"
                        name="transportDescWaste"
                        value={formData.transportDescWaste}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Dispatched To"
                        name="dispatchedTo"
                        value={formData.dispatchedTo}
                        onChange={handleChange}
                    />
                    <Group position="right">
                        <Button type="submit">Submit</Button>
                    </Group>
                </Stack>
            </form>
        </Container>
    );
};

export default Hazardous;

// // src/HazardousWasteForm.js
// import React, { useState } from 'react';
//  import { Card, Button, TextInput, Radio, Group, NumberInput, Checkbox} from '@mantine/core'
//  import classes from '../hazardouswaste/Hazardous.module.css';
//  import { Calendar, DatesProvider } from '@mantine/dates';
//  import { DateTimePicker } from '@mantine/dates';


   

// const Hazardous = () => {
//     const [formData, setFormData] = useState({
//         senderName: '',
//         sendersMailingAddress: '',
//         sendersPhoneNo: '',
//         sendersAuthorizationNo: '',
//         manifestDocumentNo: '',
//         transporterName: '',
//         transporterAddress: '',
//         transporterMobileNo: '',
//         vehicleType: '',
//         transporterRegNo: '',
//         transporterVehicleRegNo: '',
//         receiversName: '', 
//         receiversAddress: '',
//         receiversAuthorizationNo: '',
//         receiversPhoneNo: '',
//         totalQuantityContainer: '',
//         specialHandling: '',
//         submittedDate: '',
//         designedFacilityName: '',
//         facilityPhoneNo: '',
//         facilityRegistrationNo: '',
//         mailingAddress: '',
//         mobileNo: '',
//         occupierName: '',
//         registrationNo: '',
//         siteAddress: '',
//         transportDescWaste: '',
//         dispatchedTo: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:8080/api/hazardouswaste', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });
//             if (response.ok) {
//                 alert('Hazardous Waste submitted successfully!');
//                 setFormData({}); // Clear form
//             } else {
//                 alert('Error submitting form');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
      
//         <form onSubmit={handleSubmit}>
//             <h2>Hazardous Waste Submission</h2>
//             <div>
//                 <label>
//                     Sender Name:
//                     <input
//                         type="text"
//                         name="senderName"
//                         value={formData.senderName}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Sender's Mailing Address:
//                     <input
//                         type="text"
//                         name="sendersMailingAddress"
//                         value={formData.sendersMailingAddress}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Sender's Phone No:
//                     <input
//                         type="text"
//                         name="sendersPhoneNo"
//                         value={formData.sendersPhoneNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Sender's Authorization No:
//                     <input
//                         type="text"
//                         name="sendersAuthorizationNo"
//                         value={formData.sendersAuthorizationNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Manifest Document No:
//                     <input
//                         type="text"
//                         name="manifestDocumentNo"
//                         value={formData.manifestDocumentNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Transporter Name:
//                     <input
//                         type="text"
//                         name="transporterName"
//                         value={formData.transporterName}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Transporter Address:
//                     <input
//                         type="text"
//                         name="transporterAddress"
//                         value={formData.transporterAddress}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Transporter Mobile No:
//                     <input
//                         type="text"
//                         name="transporterMobileNo"
//                         value={formData.transporterMobileNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Vehicle Type:
//                     <input
//                         type="text"
//                         name="vehicleType"
//                         value={formData.vehicleType}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Transporter Reg No:
//                     <input
//                         type="text"
//                         name="transporterRegNo"
//                         value={formData.transporterRegNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Transporter Vehicle Reg No:
//                     <input
//                         type="text"
//                         name="transporterVehicleRegNo"
//                         value={formData.transporterVehicleRegNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Receiver's Name:
//                     <input
//                         type="text"
//                         name="receiversName"
//                         value={formData.receiversName}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Receiver's Address:
//                     <input
//                         type="text"
//                         name="receiversAddress"
//                         value={formData.receiversAddress}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Receiver's Authorization No:
//                     <input
//                         type="text"
//                         name="receiversAuthorizationNo"
//                         value={formData.receiversAuthorizationNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Receiver's Phone No:
//                     <input
//                         type="text"
//                         name="receiversPhoneNo"
//                         value={formData.receiversPhoneNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Total Quantity Container:
//                     <input
//                         type="text"
//                         name="totalQuantityContainer"
//                         value={formData.totalQuantityContainer}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Special Handling:
//                     <input
//                         type="text"
//                         name="specialHandling"
//                         value={formData.specialHandling}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Submitted Date:
//                     <input
//                         type="date"
//                         name="submittedDate"
//                         value={formData.submittedDate}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Designed Facility Name:
//                     <input
//                         type="text"
//                         name="designedFacilityName"
//                         value={formData.designedFacilityName}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Facility Phone No:
//                     <input
//                         type="text"
//                         name="facilityPhoneNo"
//                         value={formData.facilityPhoneNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Facility Registration No:
//                     <input
//                         type="text"
//                         name="facilityRegistrationNo"
//                         value={formData.facilityRegistrationNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Mailing Address:
//                     <input
//                         type="text"
//                         name="mailingAddress"
//                         value={formData.mailingAddress}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Mobile No:
//                     <input
//                         type="text"
//                         name="mobileNo"
//                         value={formData.mobileNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Occupier Name:
//                     <input
//                         type="text"
//                         name="occupierName"
//                         value={formData.occupierName}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Registration No:
//                     <input
//                         type="text"
//                         name="registrationNo"
//                         value={formData.registrationNo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Site Address:
//                     <input
//                         type="text"
//                         name="siteAddress"
//                         value={formData.siteAddress}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Transport Description Waste:
//                     <input
//                         type="text"
//                         name="transportDescWaste"
//                         value={formData.transportDescWaste}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Dispatched To:
//                     <input
//                         type="text"
//                         name="dispatchedTo"
//                         value={formData.dispatchedTo}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default Hazardous;

// // import React, { useState } from 'react'
// // import { Card, Button, TextInput, Radio, Group, NumberInput, Checkbox} from '@mantine/core'
// // import classes from '../hazardouswaste/Hazardous.module.css';
// // import { Calendar, DatesProvider } from '@mantine/dates';
// // import { DateTimePicker } from '@mantine/dates';

// // function Hazardous() {
// //   const [focused, setFocused] = useState(false);
// //   const [value, setValue] = useState('');
// //   const floating = value.trim().length !== 0 || focused || undefined;

// //   return (
//     // <div>
//     //   <Card shadow="sm" padding="lg" radius="md" withBorder>
//     //   <label>Hazardous Waste Manifest</label>
//     //   <TextInput
//     //   label="Name"
//     //   placeholder="Enter name"
//     //   classNames={classes}
//     //   value={value}
//     //   onChange={(event) => setValue(event.currentTarget.value)}
//     //   onFocus={() => setFocused(true)}
//     //   onBlur={() => setFocused(false)}
//     //   mt="md"
//     //   // autoComplete="nope"
//     //   data-floating={floating}
//     //   labelProps={{ 'data-floating': floating }}
//     // />

//     // <Group>
//     //       <label>Sender's name and Mailing Address</label>
//     //   <TextInput 
//     //     label="Sender's name"
//     //     placeholder='Enter Name'
//     //   />
//     //   <TextInput
//     //     label="Mail Address"
//     //     placeholder='Enter Mailing Address'
//     //   />
//     //   <TextInput
//     //     label="Mobile Number"
//     //     placeholder='Enter Mobile Number'
//     //   />
//     //   </Group>
//     //   <Group>
//     //   <TextInput
//     //     label="Sender's Authentication Number"
//     //     placeholder='Enter Authentication Number'
//     //   />
//     //   <TextInput
//     //     label="Manifest Document Number"
//     //     placeholder='Enter Document Number'
//     //   />
//     //   </Group>
//     //   <Group>
//     //   <TextInput
//     //     label="Transporter's name and Mailing Address and phone Number"
//     //     placeholder='Enter Name'
//     //   />
//     //   <TextInput
//     //     label="Mail Address"
//     //     placeholder='Enter Mailing Address'
//     //   />
//     //   <TextInput
//     //     label="Mobile Number"
//     //     placeholder='Enter Mobile Number'
//     //   />
//     //   </Group>
//     //   <Group>
//     //   <label>Type Of Vehicle</label>
//     //   <Radio label="Tanker" />
//     //   <Radio label="Tanker" />
//     //   <Radio label="Tanker" />
//     //   </Group>
//     //   <Group>
//     //   <NumberInput 
//     //   label="Transporters Registration Number"
//     //   placeholder='Transporters Registration Number'
//     //   />
//     //   <NumberInput 
//     //   label="Vehicle Registration Number"
//     //   placeholder='Vehicle Registration Number'
//     //   />
//     //   </Group>
//     //   <Group>
//     //   <TextInput
//     //     label="Receiver's name and Mailing Address and phone Number"
//     //     placeholder='Enter Name'
//     //   />
//     //   <TextInput
//     //     label="Mail Address"
//     //     placeholder='Enter Mailing Address'
//     //   />
//     //   <TextInput
//     //     label="Mobile Number"
//     //     placeholder='Enter Mobile Number'
//     //   />
//     //   </Group>
      
//     //    <TextInput
//     //     label="Receiver Authorization Number"
//     //     placeholder='Receiver Authorization Number'
//     //   />
//     //   <Group>
//     //   <label>Water Descritpion</label>
//     //    <Checkbox label="1.4-RWE"/>
//     //    <Checkbox label="2.2-SDSF"/>
//     //    <Checkbox label="1.2 heating"/>
//     //    <Checkbox label="1.4-werot"/>
//     //   </Group>

//     //   <Group>
//     //   <TextInput 
//     //   label="Total Quantity"
//     //   placeholder='total Quantity Container'/>

//     //   <TextInput 
//     //   label="Select Units"
//     //   placeholder='Select Units'/>      
//     //   </Group>

//     //   <Group>
//     //   <TextInput 
//     //   label="Container Number"
//     //   placeholder='Container Number'/>

//     //   <TextInput 
//     //   label="Type"
//     //   placeholder='Type'/> 
//     //   <Button color="gray" mt="md" radius="md">
//     //     Add
//     //   </Button>
//     //   </Group>

//     //   <TextInput 
//     //   label="Special Handling Instructions and Additional Information"
//     //   placeholder='Special Handling Instructions and Additional Information'/> 


//     //   <Group justify="space-between" mb="xs">
//     //     <label fz="md" fw={500}>
//     //       Sender's Certificate
//     //     </label>
//     //   </Group>
//     //   <label c="dimmed" fz="xs">
//     //     I hereby declare that the contents of the consignment are fully and accurately described above by proper shipping name 
//     //     and are categorized, packed, marked and labeled, and are in all respects in proper condition for transport by road
//     //     according to aplicable national government regulations.
//     //   </label>
//     //   <label>Name & Stamp: </label>

//     //   <DateTimePicker label="Pick date and time" placeholder="Pick date and time" />

//     //   <Group justify="space-between" mb="xs">
//     //     <TextInput 
//     //     label="Transporter Acknowledgement of receipt of wastes:" />
//     //   </Group>
//     //   <label>Name & stamp :</label>

//     //   <Group>
//     //     <DateTimePicker label="receivers certificate for Receipt of Hazardous and other waste:" placeholder="Pick date and time" />
//     //   </Group>
      
      
//     //   <Group justify='center'>
//     //   <Button color="gray"  mt="md" radius="md" >
//     //     Save
//     //   </Button>
//     //   </Group>
//     //   </Card>
//     // </div>
// //   )
// // }

// // export default Hazardous
