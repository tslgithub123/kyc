import React, { useState, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Grid, Typography
} from '@mui/material';
import CustomSwitch from '../../ui/CustomSwitch';
import SearchField from '../../ui/SearchField';
import axios from 'axios';

export default function UserProfilesTable({ userProfiles, setUserProfiles }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleLockChange = async (id, currentLockedStatus) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/user/${id}/lock`, null, {
        params: { locked: !currentLockedStatus },
      });
      
      setUserProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id === id ? { ...profile, locked: response.data.locked } : profile
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

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: 3, overflowX: 'auto' }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography sx={{ padding: '16px 12px 0px 24px' }} variant="h6" fontWeight="bold">User Profiles</Typography>
        </Grid>
      </Grid>
      <hr />
      <div style={{ margin: '16px' }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <SearchField
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
          </Grid>
        </Grid>
        <Table stickyHeader sx={{ border: 2, borderColor: '#e9e9ea', borderRadius: 3, marginTop: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Last Login Date</TableCell>
              <TableCell>Lock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProfiles
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>{profile.id}</TableCell>
                  <TableCell>{profile.username}</TableCell>
                  <TableCell>{profile.companyName}</TableCell>
                  <TableCell>{profile.enabled ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{profile.designation}</TableCell>
                  <TableCell>
                    {profile.lastLoginDate
                      ? new Date(profile.lastLoginDate).toLocaleString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <CustomSwitch
                      checked={profile.locked}
                      color="#ff515a"
                      onChange={() => handleLockChange(profile.id, profile.locked)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProfiles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </TableContainer>
  );
}
