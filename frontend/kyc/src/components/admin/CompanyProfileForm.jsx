import React, { useState, useEffect } from 'react';
import {
  Box, Typography, List, ListItem, ListItemText, ListItemButton,
  Collapse, Divider, Table, TableHead, TableRow, TableCell, TableBody,
  Pagination, Paper
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CompanyProfileForm = ({ profiles = [] }) => {
  const [expanded, setExpanded] = useState(null);
  const [users, setUsers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleExpandClick = (companyId) => {
    setExpanded(expanded === companyId ? null : companyId);
    if (!users[companyId]) {
      // Fetch users by company ID here
      fetchUsersByCompanyId(companyId);
    }
  };

  const fetchUsersByCompanyId = async (companyId) => {
    // Replace with your API call
    const fetchedUsers = await fetch(`http://localhost:8080/api/company-profile/users/${companyId}`).then(res => res.json());
    setUsers(prevUsers => ({ ...prevUsers, [companyId]: fetchedUsers }));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedProfiles = profiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Company Profiles ({profiles.length})
      </Typography>
      <List>
        {paginatedProfiles.map((profile, index) => (
          <Box key={profile.id}>
            <ListItemButton onClick={() => handleExpandClick(profile.id)}>
              <ListItemText
                primary={`${(currentPage - 1) * itemsPerPage + index + 1}. ${profile.compName}`}
              />
              {expanded === profile.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={expanded === profile.id} timeout="auto" unmountOnExit>
              <Box sx={{ paddingLeft: 4, paddingBottom: 2 }}>
                <Typography variant="body2">City: {profile.city}</Typography>
                <Typography variant="body2">Category: {profile.category}</Typography>
                <Typography variant="body2">Country: {profile.country}</Typography>
                {/* Add other company details as needed */}
                <Typography variant="subtitle2" sx={{ marginTop: 2 }}>
                  Users
                </Typography>
                {users[profile.id] ? (
                  <Table size="small" sx={{ border: '1px solid #e0e0e0' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Designation</TableCell>
                        <TableCell>Last Login</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users[profile.id].map((user, userIndex) => (
                        <TableRow key={user.id}>
                          <TableCell>{userIndex + 1}</TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>{user.designation}</TableCell>
                          <TableCell>{new Date(user.lastLoginDate).toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography variant="body2">Loading users...</Typography>
                )}
              </Box>
            </Collapse>
            <Divider />
          </Box>
        ))}
      </List>
      <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(profiles.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Paper>
  );
};

export default CompanyProfileForm;
