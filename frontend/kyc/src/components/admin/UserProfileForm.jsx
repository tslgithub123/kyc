import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography, MenuItem, Switch, FormControlLabel, Paper } from '@mui/material';
import axios from 'axios';

const UserForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'ROLE_ADMIN',
        enabled: true,
        designation: '',
        companyProfileId: 1,
        failedLoginCount: 0,
        lastLoginDate: '2024-08-22T10:00:00',
        locked: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSwitchChange = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api.example.com/submit-user', formData);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom align="center">
                User Information
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            label="Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                            <MenuItem value="ROLE_USER">User</MenuItem>
                            <MenuItem value="ROLE_MANAGER">Manager</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Company Profile ID"
                            name="companyProfileId"
                            type="number"
                            value={formData.companyProfileId}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Failed Login Count"
                            name="failedLoginCount"
                            type="number"
                            value={formData.failedLoginCount}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Login Date"
                            name="lastLoginDate"
                            type="datetime-local"
                            value={formData.lastLoginDate}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} container alignItems="center">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.enabled}
                                    onChange={handleSwitchChange}
                                    name="enabled"
                                    color="primary"
                                />
                            }
                            label="Enabled"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.locked}
                                    onChange={handleSwitchChange}
                                    name="locked"
                                    color="primary"
                                />
                            }
                            label="Locked"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default UserForm;
