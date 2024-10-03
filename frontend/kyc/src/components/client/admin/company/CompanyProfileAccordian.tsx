import React, { useEffect, useState } from 'react';
import {
  Box, Text, Accordion, Table, Pagination, Paper,
  Group, Title, Loader,
  Pill
} from '@mantine/core';
import api from '../../../../utils/api';
import { CompanyProfile, User } from '../../../../utils/types';


const CompanyProfileAccordian: React.FC = () => {
  const [users, setUsers] = useState<{ [key: string]: User[] }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [profiles, setProfiles] = useState<CompanyProfile[]>([]);

  useEffect(() => {
    api.fetchCompanies()
      .then((fetchedProfiles: CompanyProfile[]) => {
        setProfiles(fetchedProfiles);
      })
      .catch(error => {
        console.error('There was an error fetching the company profiles!', error);
      });
  }, []);

  const fetchUsersByCompanyId = async (companyId: string) => {
    setLoading((prev) => ({ ...prev, [companyId]: true }));
    try {
      console.log(`Fetching users for company ID: ${companyId}`);
      const fetchedUsers: User[] = await api.fetchUsersByCompanyId(companyId);
      setUsers((prevUsers) => ({ ...prevUsers, [companyId]: fetchedUsers }));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [companyId]: false }));
    }
  };

  const handleAccordionChange = (companyId: string) => {
    if (!users[companyId] && !loading[companyId]) {
      fetchUsersByCompanyId(companyId);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedProfiles = profiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Paper style={{ padding: '24px' }} radius={'8px'} p="md">
      <Title order={3} mb="md">
        Company Profiles ({profiles.length})
      </Title>
      <Accordion variant="contained" radius={'8px'} multiple>
        {paginatedProfiles.map((profile, index) => (
          <Accordion.Item key={profile.id} value={`${profile.id}`} onChange={() => handleAccordionChange(profile.id.toString())}>
            <Accordion.Control>
              <Group justify="space-between" style={{ width: '100%' }}>
                <Pill size='lg'>
                  {(currentPage - 1) * itemsPerPage + index + 1}. {}
                </Pill>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Box mt="sm" mb="sm">
                <Text size="sm">City: {}</Text>
                <Text size="sm">Category: {}</Text>
                <Text size="sm">Country: {}</Text>
                <Text size="sm" mt="md" fw={500}>Users</Text>
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
          value={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Paper>
  );
};

export default CompanyProfileAccordian;
