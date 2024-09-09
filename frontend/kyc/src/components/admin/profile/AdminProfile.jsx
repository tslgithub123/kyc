import React, { useEffect, useState } from 'react';
import { Card, Image, Text, Group, Badge, Stack, Divider, Grid, Paper, Avatar } from '@mantine/core';
import axios from 'axios';
import UserDetails from '../../ui/cards/UserDetails';
import EmployeDetails from '../../ui/cards/EmployeeDetails';
import classes from './AdminProfile.module.css';
import api from '../../../utils/api';
import BreadcrumbsComponent from '../../ui/Breadcrumbs';

const AdminProfile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.fetchUser(1);
                setProfile(response);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <Text>Loading...</Text>;
    }

    return (
        <>
            <Paper className={classes.title} radius="md" withBorder p="sm" mb='sm'>
                <Text ta="center" c="dimmed" fz="sm">
                    Profile
                </Text>
            </Paper>
            <div className={classes.container}>
                <UserDetails profile={profile} />
                <EmployeDetails profile={profile} />
            </div>
        </>
    );
};

export default AdminProfile;