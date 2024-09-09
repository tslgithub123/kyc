import React, { useState, useEffect } from 'react';
import { TextInput, Button, Grid, Select, Paper, Title, Text, Box, Group, Alert, CloseButton, PasswordInput, Divider, Tooltip } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconBuilding, IconUser, IconLock, IconUserPlus, IconSend, IconUserCircle, IconTrash, IconCheck, IconX, IconQuestionMark } from '@tabler/icons-react';
import api from '../../../utils/api';
import { notifications } from '@mantine/notifications';

const UserProfileForm = () => {
    const [companies, setCompanies] = useState([]);
    const [roles, setRoles] = useState([]);
    const [usernameExists, setUsernameExists] = useState({});
    const [alertInfo, setAlertInfo] = useState(null);

    const initialFormState = {
        companyProfileId: '',
        users: [{
            username: '',
            password: '',
            role: '',
            enabled: true,
            failedLoginCount: 0,
            locked: false
        }],
    };

    const form = useForm({
        initialValues: initialFormState,
        validate: {
            companyProfileId: (value) => (value ? null : 'Company is required'),
            users: {
                username: (value) => (value.length < 3 ? 'Username must have at least 3 characters' : null),
                password: (value) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
                role: (value) => (value ? null : 'Role is required'),
            },
        },
    });

    useEffect(() => {
        fetchCompanies();
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const data = await api.fetchAllRoles();
            //console.log('Response:', response);
            //const data = await response.json;
            console.log('Roles:', data);
            
            if (Array.isArray(data)) {
                const formattedRoles = data.map(role => ({
                    value: role.authority, 
                    label: role.authority.replace('ROLE_', '')
                }));
                setRoles(formattedRoles);

                form.setFieldValue('users.0.role', formattedRoles[0]?.value);
            } else {
                console.error('Unexpected response format:', data);
                setAlertInfo({ type: 'error', message: 'Failed to fetch roles. Unexpected format.' });
            }
        } catch (error) {
            console.error('Error fetching roles:', error);
            setAlertInfo({ type: 'error', message: 'Failed to fetch roles. Please try again.' });
        }
    };

    const fetchCompanies = async () => {
        try {
            const response = await api.fetchCompanies();
            setCompanies(response.map(company => ({ value: company.id.toString(), label: company.compName })));
        } catch (error) {
            console.error('Error fetching companies:', error);
            setAlertInfo({ type: 'error', message: 'Failed to fetch companies. Please try again.' });
        }
    };

    const checkUsernameExists = async (username, index) => {
        try {
            const response = await api.checkUsernameExists(username);
            console.log('Response:', response);
            setUsernameExists(prevState => ({
                ...prevState,
                [index]: response
            }));
        } catch (error) {
            console.error('Error checking username:', error);
            setAlertInfo({ type: 'error', message: 'Failed to check username. Please try again.' });
        }
    };

    const handleSubmit = async (values) => {
        const submitData = values.users.map(user => ({
            ...user,
            companyProfileId: parseInt(values.companyProfileId),
        }));

        try {
            console.log('Submitting form:', submitData);
            
            const response = await api.registerUser(submitData);
            console.log('Response:', response.data);
            setAlertInfo({ type: 'success', message: 'User(s) created successfully!' });
            form.reset();
            setUsernameExists({});
        } catch (error) {
            console.error('Error submitting form:', error);
            setAlertInfo({ type: 'error', message: 'Failed to create user(s). Please try again.' });
        }
    };

    const addMoreUsers = () => {
        form.insertListItem('users', {
            username: '',
            password: '',
            role: roles.length > 0 ? roles[0].value : '', // Set default role to first fetched role
            enabled: true,
            failedLoginCount: 0,
            locked: false
        });
    };

    const removeUser = (index) => {
        if (form.values.users.length > 1) {
            form.removeListItem('users', index);
            setUsernameExists(prevState => {
                const newState = { ...prevState };
                delete newState[index];
                return newState;
            });
        }
    };

    return (
        <Paper withBorder  radius="sm">
            <Grid p="lg" justify="space-between" align="center">
        <Grid.Col span={6}>
          <Title order={3} fw={700}  color="dark">Create Users</Title>
        </Grid.Col>
        <Grid.Col span={6} style={{ textAlign: 'right' }}>
          <Text size="sm" c="dimmed">Total Profiles</Text>
        </Grid.Col>
      </Grid>
      <Divider />
      <Paper p="lg" radius="lg">
            {alertInfo && (
                <Alert icon={alertInfo.type === 'success' ? <IconCheck size="1rem" /> : <IconX size="1rem" />}
                    title={alertInfo.type === 'success' ? "Success" : "Error"}
                    color={alertInfo.type === 'success' ? "green" : "red"}
                    mb="md"
                    onClose={() => setAlertInfo(null)}>
                    {alertInfo.message}
                </Alert>
            )}
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Box mb="xl">
                    <Select
                        label="Select Company"
                        placeholder="Choose a company"
                        leftSection={<IconBuilding size="1rem" />}
                        {...form.getInputProps('companyProfileId')}
                        data={companies}
                        required
                    />
                </Box>

                {form.values.users.map((user, index) => (
                    <Grid key={index} gutter="md" mb="xl">
                        <Grid.Col span={12}>
                            <Select
                                label="Role"
                                leftSection={<IconUserCircle size="1rem" />}
                                {...form.getInputProps(`users.${index}.role`)}
                                data={roles} // Use the fetched roles
                                required
                            />
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <TextInput
                                label="Username"
                                leftSection={<IconUser size="1rem" />}
                                {...form.getInputProps(`users.${index}.username`)}
                                required
                                onBlur={(e) => checkUsernameExists(e.target.value, index)}
                                rightSection={
                                    user.username ? (
                                        <CloseButton
                                            aria-label="Clear input"
                                            onClick={() => form.setFieldValue(`users.${index}.username`, '')}
                                        />
                                    ) : null
                                }
                            />
                            {usernameExists[index] && (
                                <Text c="red" size="sm">Username already exists</Text>
                            )}
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <PasswordInput
                                label="Password"
                                leftSection={<IconLock size="1rem" />}
                                type="password"
                                {...form.getInputProps(`users.${index}.password`)}
                                required
                                
                            />
                        </Grid.Col>

                        {index > 0 && (
                            <Grid.Col span={12}>
                                <Button
                                    onClick={() => removeUser(index)}
                                    variant="outline"
                                    color="red"
                                    leftSection={<IconTrash size="1rem" />}
                                >
                                    Remove User
                                </Button>
                            </Grid.Col>
                        )}
                    </Grid>
                ))}

                <Group position="right" mt="md">
                    <Button
                        onClick={addMoreUsers}
                        variant="outline"
                        leftSection={<IconUserPlus size="1rem" />}
                    >
                        Add More
                    </Button>
                    <Button
                        type="submit"
                        disabled={Object.values(usernameExists).some(Boolean) || !form.isValid()}
                        leftSection={<IconSend size="1rem" />}
                    >
                        Create
                    </Button>
                </Group>
            </form>
            </Paper>
        </Paper>
    );
};

export default UserProfileForm;