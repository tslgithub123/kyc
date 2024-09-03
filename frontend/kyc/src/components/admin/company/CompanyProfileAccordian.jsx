import React, { useEffect, useState } from 'react';
import {
  Box, Text, Accordion, Table, Pagination, Paper,
  Group, Title, Loader,
  Pill
} from '@mantine/core';
import axios from 'axios';
import api from '../../../utils/api';

const CompanyProfileAccordian = () => {

  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    api.fetchCompanies()
      .then(fetchedProfiles => {
        setProfiles(fetchedProfiles);
      })
      .catch(error => {
        console.error('There was an error fetching the company profiles!', error);
      });
  }, []);

  const fetchUsersByCompanyId = async (companyId) => {
    setLoading((prev) => ({ ...prev, [companyId]: true }));
    try {
      console.log(`Fetching users for company ID: ${companyId}`);
      const fetchedUsers = await api.fetchUsersByCompanyId(companyId);
      setUsers((prevUsers) => ({ ...prevUsers, [companyId]: fetchedUsers }));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [companyId]: false }));
    }
  };

  const handleAccordionChange = (companyId) => {
    if (!users[companyId] && !loading[companyId]) {
      fetchUsersByCompanyId(companyId);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProfiles = profiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Paper style={{ padding: '24px' }} radius={'8px'} padding="md">
      <Title order={3} mb="md">
        Company Profiles ({profiles.length})
      </Title>
      <Accordion  variant="contained" radius={'8px'} multiple >
        {paginatedProfiles.map((profile, index) => (
          <Accordion.Item  key={profile.id} value={`${profile.id}` } onChange={handleAccordionChange(profile.id)}>
            <Accordion.Control>
              <Group position="apart" style={{ width: '100%' }}>
                <Pill size='lg'>
                  {(currentPage - 1) * itemsPerPage + index + 1}. {profile.compName}
                  </Pill>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Box mt="sm" mb="sm">
                <Text size="sm">City: {profile.city}</Text>
                <Text size="sm">Category: {profile.category}</Text>
                <Text size="sm">Country: {profile.country}</Text>
                <Text size="sm" mt="md" weight={500}>Users</Text>
                {loading[profile.id] ? (
                  <Loader size="xs" variant="dots" />
                ) : users[profile.id] ? (
                  <Table m='lg'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Designation</th>
                        <th>Last Login</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users[profile.id].map((user, userIndex) => (
                        <tr key={user.id}>
                          <td>{userIndex + 1}</td>
                          <td>{user.username}</td>
                          <td>{user.designation}</td>
                          <td>{new Date(user.lastLoginDate).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <Text size="sm">No users found.</Text>
                )}
              </Box>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      <Box mt="md">
        <Pagination
          total={Math.ceil(profiles.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Paper>
  );
};

export default CompanyProfileAccordian;
