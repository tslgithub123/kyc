// import React, { useState } from 'react';
// import { Flex, Button, Group, Radio, Divider, Paper, Grid, Fieldset } from '@mantine/core';
// import { SimpleGrid } from '@mantine/core';
// import { TextInput, Tooltip, Title } from '@mantine/core';
// import EcApplicable from './EcApplicable';
// // import ConsentType from './ConsentType';

// const ConsentForm = () => {
//   const [q1, setQ1] = useState(null);
//   const [q2, setQ2] = useState(null);
//   const [q3, setQ3] = useState(null);
//   const [q4, setQ4] = useState('');
//   const [q5, setQ5] = useState(null);
//   const [q6, setQ6] = useState(null);
//   const [q7, setQ7] = useState(null);
//   const [q7File, setQ7File] = useState(null);

//   const handleFileChange = (e) => {
//     setQ7File(e.target.files[0]);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     alert('Form submitted');
//   };

//   return (
//     <Paper withBorder radius="sm" p="lg" style={{ margin: '20px' }}>
//       <Grid bg={'gray.1'} justify="space-between" align="center">
//         <Grid.Col span={6}>
//           <Title order={3} c="gray.7" mb="md">
//             Consent Form
//           </Title>
//         </Grid.Col>
//       </Grid>
//       <Divider my="lg" />

//       <div>
//         <form onSubmit={handleFormSubmit}>
//           <div style={{ marginBottom: '20px' }}>
//             <label style={{ display: 'block', marginBottom: '10px' }}>
//               Q1: Do you have valid consent to establish for Existing consent to operate?
//             </label>
//             <div>
//               <Group>
//                 <Radio
//                   label="Yes"
//                   checked={q1 === true}
//                   onChange={() => setQ1(true)}
//                 />
//                 <Radio
//                   label="No"
//                   checked={q1 === false}
//                   onChange={() => setQ1(false)}
//                 />
//               </Group>
//             </div>
//           </div>

//           {q1 !== null && (
//             <>
//               {q1 ? (
//                 <div style={{ marginBottom: '20px' }}>
//                   <EcApplicable />
//                 </div>
//               ) : (
//                 <>
//                   <div style={{ marginBottom: '20px' }}>
//                     <label style={{ display: 'block', marginBottom: '10px' }}>
//                       Q3: Do you have valid Consent to Expansion?
//                     </label>
//                     <div>
//                       <Group>
//                         <Radio
//                           label="Yes"
//                           checked={q3 === true}
//                           onChange={() => setQ3(true)}
//                         />
//                         <Radio
//                           label="No"
//                           checked={q3 === false}
//                           onChange={() => setQ3(false)}
//                         />
//                       </Group>
//                     </div>
//                   </div>

//                   {q3 !== null && (
//                     <>
//                       {q3 ? (
//                         <EcApplicable />
//                       ) : (
//                         <>
//                           <div style={{ marginBottom: '20px' }}>
//                             <label style={{ display: 'block', marginBottom: '10px' }}>
//                               Q5: Do you have Multiple consent to operate?
//                             </label>
//                             <div>
//                               <Group>
//                                 <Radio
//                                   label="Yes"
//                                   checked={q5 === true}
//                                   onChange={() => setQ5(true)}
//                                 />
//                                 <Radio
//                                   label="No"
//                                   checked={q5 === false}
//                                   onChange={() => setQ5(false)}
//                                 />
//                               </Group>
//                             </div>
//                           </div>

//                           {q5 !== null && (
//                             <>
//                               {q5 ? (
//                                 <>
//                                   <div style={{ marginBottom: '20px' }}>
//                                     <label style={{ display: 'block', marginBottom: '10px' }}>
//                                       Q6: Do you want to Amalgamation consent to Operate?
//                                     </label>
//                                     <div>
//                                       <Group>
//                                         <Radio
//                                           label="Yes"
//                                           checked={q6 === true}
//                                           onChange={() => setQ6(true)}
//                                         />
//                                         <Radio
//                                           label="No"
//                                           checked={q6 === false}
//                                           onChange={() => setQ6(false)}
//                                         />
//                                       </Group>
//                                     </div>
//                                   </div>

//                                   {q6 !== null && (
//                                     <>
//                                       {q6 ? (
//                                         <>
//                                           <div style={{ marginBottom: '20px' }}>
//                                             <label>Consent Number:</label>
//                                           </div>
//                                           <div style={{ marginBottom: '20px' }}>
//                                             <label>Enter new Consent Number:</label>
//                                           </div>
//                                           <div style={{ marginBottom: '20px' }}>
//                                             <label>Issue Date:</label>
//                                           </div>
//                                           <div style={{ marginBottom: '20px' }}>
//                                             <label>Valid Date:</label>
//                                           </div>
//                                           <div style={{ marginBottom: '20px' }}>
//                                             <label>Consent File:</label>
//                                             <input type="file" onChange={handleFileChange} />
//                                             {q7File && <p>Consent File: {q7File.name}</p>}
//                                           </div>
//                                         </>
//                                       ) : (
//                                         <EcApplicable />
//                                       )}
//                                     </>
//                                   )}
//                                 </>
//                               ) : (
//                                 <p>Do you want to Amalgamation Consent to Operate?</p>
//                               )}
//                             </>
//                           )}
//                         </>
//                       )}
//                     </>
//                   )}
//                 </>
//               )}
//             </>
//           )}

//           <Group justify="center" mt="lg">
//             <Button type="submit">Submit</Button>
//           </Group>
//         </form>
//       </div>
//     </Paper>
//   );
// };

// export default ConsentForm;
// src/ConsentForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConsentForm = () => {
    const [companyProfiles, setCompanyProfiles] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        companyProfileId: '',
        userId: '',
        consNo: '',
        consType: '',
        consStatus: '',
        expansionStatus: '',
        issueDate: '',
        validUpto: '',
        grossCi: '',
        noStaff: '',
        noWorker: '',
        totPlotArea: '',
        totPlotAreaUnit: '',
        totBuildArea: '',
        totBuildAreaUnit: '',
        openSpaceArea: '',
        openSpaceAreaUnit: '',
        totGreenArea: '',
        totGreenAreaUnit: '',
        consentFilePath: '',
        consentFileName: '',
        createdDate: '',
        grossCiUnits: ''
    });

    // useEffect(() => {
    //     fetchCompanyProfiles();
    //     fetchUsers();
    // }, []);

    // const fetchCompanyProfiles = async () => {
    //     const response = await axios.get('http://localhost:8080/api/companyProfiles'); // Adjust endpoint
    //     setCompanyProfiles(response.data);
    // };

    // const fetchUsers = async () => {
    //     const response = await axios.get('http://localhost:8080/api/users'); // Adjust endpoint
    //     setUsers(response.data);
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/consents', formData);
            alert('Consent created successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('There was an error creating the consent!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Consent</h1>
            {/* <div>
                <label>Company Profile:</label>
                <select name="companyProfileId" onChange={handleChange} required>
                    <option value="">Select Company Profile</option>
                    {companyProfiles.map(profile => (
                        <option key={profile.id} value={profile.id}>{profile.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>User:</label>
                <select name="userId" onChange={handleChange} required>
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.username}</option>
                    ))}
                </select>
            </div> */}
            <div>
                <label>Consent Number:</label>
                <input type="number" name="consNo" onChange={handleChange} required />
            </div>
            <div>
                <label>Consent Type:</label>
                <input type="text" name="consType" onChange={handleChange} required />
            </div>
            <div>
                <label>Consent Status:</label>
                <input type="text" name="consStatus" onChange={handleChange} required />
            </div>
            <div>
                <label>Expansion Status:</label>
                <input type="text" name="expansionStatus" onChange={handleChange} />
            </div>
            <div>
                <label>Issue Date:</label>
                <input type="date" name="issueDate" onChange={handleChange} required />
            </div>
            <div>
                <label>Valid Upto:</label>
                <input type="date" name="validUpto" onChange={handleChange} required />
            </div>
            <div>
                <label>Gross CI:</label>
                <input type="text" name="grossCi" onChange={handleChange} required />
            </div>
            <div>
                <label>No of Staff:</label>
                <input type="number" name="noStaff" onChange={handleChange} required />
            </div>
            <div>
                <label>No of Workers:</label>
                <input type="number" name="noWorker" onChange={handleChange} required />
            </div>
            <div>
                <label>Total Plot Area:</label>
                <input type="text" name="totPlotArea" onChange={handleChange} required />
            </div>
            <div>
                <label>Total Plot Area Unit:</label>
                <input type="text" name="totPlotAreaUnit" onChange={handleChange} required />
            </div>
            <div>
                <label>Total Build Area:</label>
                <input type="text" name="totBuildArea" onChange={handleChange} required />
            </div>
            <div>
                <label>Total Build Area Unit:</label>
                <input type="text" name="totBuildAreaUnit" onChange={handleChange} required />
            </div>
            <div>
                <label>Open Space Area:</label>
                <input type="text" name="openSpaceArea" onChange={handleChange} required />
            </div>
            <div>
                <label>Open Space Area Unit:</label>
                <input type="text" name="openSpaceAreaUnit" onChange={handleChange} required />
            </div>
            <div>
                <label>Total Green Area:</label>
                <input type="text" name="totGreenArea" onChange={handleChange} required />
            </div>
            <div>
                <label>Total Green Area Unit:</label>
                <input type="text" name="totGreenAreaUnit" onChange={handleChange} required />
            </div>
            <div>
                <label>Consent File Path:</label>
                <input type="text" name="consentFilePath" onChange={handleChange} />
            </div>
            <div>
                <label>Consent File Name:</label>
                <input type="text" name="consentFileName" onChange={handleChange} />
            </div>
            <div>
                <label>Created Date:</label>
                <input type="date" name="createdDate" onChange={handleChange} />
            </div>
            <div>
                <label>Gross CI Units:</label>
                <input type="text" name="grossCiUnits" onChange={handleChange} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ConsentForm;



