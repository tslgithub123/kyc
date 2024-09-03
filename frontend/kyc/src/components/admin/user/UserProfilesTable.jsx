import React, { useState, useMemo, useEffect } from 'react';
import { Table, Paper, Grid, Title, TextInput, Switch, Pagination, Select } from '@mantine/core';
import api from '../../../utils/api';

export default function UserProfilesTable() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(1);
  };

  const fetchUserProfiles = async () => {
    try {
        const response = await api.getAllUserProfiles();
        setUserProfiles(response);
    } catch (error) {
        console.error('There was an error fetching the user profiles!', error);
        setAlertInfo({ type: 'error', message: 'Failed to fetch user profiles. Please try again.' });
    }
};

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const handleLockChange = async (id, currentLockedStatus) => {
    try {
      const response = await api.updateUserLockStatus(id, !currentLockedStatus);
      setUserProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id === id ? { ...profile, locked: response.locked } : profile
        )
      );
    } catch (error) {
      console.error("Error updating lock status:", error);
    }
  };

  const filteredProfiles = useMemo(() => 
    userProfiles.filter((profile) =>
      Object.values(profile).some(
        (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    ),
    [userProfiles, searchTerm]
  );

  const paginatedProfiles = filteredProfiles.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Paper shadow="none" radius="md" p="md">
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={4} fw={700}>User Profiles</Title>
        </Grid.Col>
      </Grid>
      <hr />
      <Grid mt="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Search..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
          />
        </Grid.Col>
      </Grid>
      <Table striped highlightOnHover mt="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Company Name</Table.Th>
            <Table.Th>Designation</Table.Th>
            <Table.Th>Last Login Date</Table.Th>
            <Table.Th>Lock</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {paginatedProfiles.map((profile) => (
            <Table.Tr key={profile.id}>
              <Table.Td>{profile.id}</Table.Td>
              <Table.Td>{profile.username}</Table.Td>
              <Table.Td>{profile.companyName}</Table.Td>
              <Table.Td>{profile.designation}</Table.Td>
              <Table.Td>
                {profile.lastLoginDate
                  ? new Date(profile.lastLoginDate).toLocaleString()
                  : 'N/A'}
              </Table.Td>
              <Table.Td>
                <Switch
                  checked={profile.locked}
                  onChange={() => handleLockChange(profile.id, profile.locked)}
                  color="red"
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Grid mt="md" justify="space-between" align="center">
        <Grid.Col span="content">
          <Select
            value={rowsPerPage.toString()}
            onChange={handleChangeRowsPerPage}
            data={['5', '10', '25']}
            label="Rows per page"
          />
        </Grid.Col>
        <Grid.Col span="content">
          <Pagination
            total={Math.ceil(filteredProfiles.length / rowsPerPage)}
            value={page}
            onChange={handleChangePage}
          />
        </Grid.Col>
      </Grid>
    </Paper>
  );
}