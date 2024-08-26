import React, { useState, useEffect } from 'react';
import { TextInput, Button, Grid, Select, Paper, Title, Text, Box, Group, Alert, CloseButton } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { IconBuilding, IconUser, IconLock, IconUserPlus, IconSend, IconUserCircle, IconTrash, IconCheck, IconX } from '@tabler/icons-react';

const UserProfileForm = () => {
    const [companies, setCompanies] = useState([]);
    const [usernameExists, setUsernameExists] = useState({});
    const [alertInfo, setAlertInfo] = useState(null);

    const initialFormState = {
        companyProfileId: '',
        users: [{
            username: '',
            password: '',
            role: 'ROLE_ADMIN',
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
    }, []);

    useEffect(() => {
        if (alertInfo) {
            const timer = setTimeout(() => {
                setAlertInfo(null);
            }, 5000); // Alert will disappear after 5 seconds

            return () => clearTimeout(timer); // Cleanup the timeout on unmount or when alertInfo changes
        }
    }, [alertInfo]);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/company-profile/all');
            setCompanies(response.data.map(company => ({ value: company.id.toString(), label: company.compName })));
        } catch (error) {
            console.error('Error fetching companies:', error);
            setAlertInfo({ type: 'error', message: 'Failed to fetch companies. Please try again.' });
        }
    };

    const checkUsernameExists = async (username, index) => {
        if (username === '') {
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/api/user/username-exists/${username}`);
            setUsernameExists(prevState => ({
                ...prevState,
                [index]: response.data
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

            let endpoint = submitData.length === 1 ? '/register-single' : '/register-multiple';
            const response = await axios.post(`http://localhost:8080/api/auth${endpoint}`, submitData);
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
            role: 'ROLE_ADMIN',
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
        <Paper radius="lg" p="md" style={{ maxWidth: 700, margin: '24px auto' }}>
            <Title order={3} mb="md">User Information</Title>
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
                                data={[
                                    { value: 'ROLE_ADMIN', label: 'Admin' },
                                    { value: 'ROLE_ENVIRONMENT_OFFICER', label: 'Environment Officer' },
                                    { value: 'ROLE_MANAGEMENT', label: 'Management' },
                                    { value: 'ROLE_THIRD_PARTY', label: 'Third Party' },
                                ]}
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
                                            onClick={() => form.setFieldValue(`users.${index}.username`, '')} // Clear the username field
                                        />
                                    ) : null
                                }
                            />
                            {usernameExists[index] && (
                                <Text color="red" size="sm">Username already exists</Text>
                            )}
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Password"
                                leftSection={<IconLock size="1rem" />}
                                type="password"
                                {...form.getInputProps(`users.${index}.password`)}
                                required
                                rightSection={
                                    user.password ? (
                                        <CloseButton
                                            aria-label="Clear input"
                                            onClick={() => form.setFieldValue(`users.${index}.password`, '')} // Clear the password field
                                        />
                                    ) : null
                                }
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
    );
};

export default UserProfileForm;
