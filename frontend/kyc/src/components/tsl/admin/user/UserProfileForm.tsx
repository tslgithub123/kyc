import React, { useState, useEffect } from 'react';
import { TextInput, Button, Grid, Select, Paper, Title, Text, Box, Group, Alert, CloseButton, PasswordInput, Divider } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { IconBuilding, IconUser, IconLock, IconUserPlus, IconSend, IconUserCircle, IconTrash, IconCheck, IconX } from '@tabler/icons-react';
import api from '../../../../utils/api';
import { CompanyProfile, Role, User } from '../../../../utils/types';

interface FormValues {
  companyProfileId: string;
  users: User[];
}

interface AlertInfo {
  type: 'success' | 'error';
  message: string;
}

const UserProfileForm: React.FC = () => {
  const [companies, setCompanies] = useState<{ value: string; label: string }[]>([]);
  const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);
  const [usernameExists, setUsernameExists] = useState<{ [key: number]: boolean }>({});
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  const initialFormState: FormValues = {
    companyProfileId: '',
    users: [
      {
        username: '',
        password: '',
        roles: {
            authority: '',
            some: function (): unknown {
                throw new Error('Function not implemented.');
            },
            map: function (): string[] {
                throw new Error('Function not implemented.');
            }
        },
        enabled: true,
        failedLoginCount: 0,
        locked: false,
        id: 0,
        designation: '',
        companyProfile: {
            id: 0,
            mpcbid: null,
            branch: '',
            category: '',
            city: '',
            compName: '',
            contPerDesig: null,
            contPerName: null,
            contPerNo: null,
            country: '',
            district: null,
            email: '',
            fax: null,
            indPrimary: null,
            indSecondary: null,
            industryType: null,
            lastEnv: null,
            noWorkDays: null,
            phoneNo: '',
            pincode: null,
            plotNo: null,
            ro: null,
            sro: null,
            state: '',
            street: null,
            taluka: null,
            uan: null,
            village: null,
            website: null,
            workingHour: null,
            yearEstb: null,
            compEmail: null
        },
        lastLoginDate: '',
        accountNonLocked: false,
        accountNonExpired: false,
        credentialsNonExpired: false,
      },
    ],
  };

  const form: UseFormReturnType<FormValues> = useForm({
    initialValues: initialFormState,
    validate: {
      companyProfileId: (value) => (value ? null : 'Company is required'),
      users: {
        username: (value: string | any[]) => (value.length < 3 ? 'Username must have at least 3 characters' : null),
        password: (value: string | any[]) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
        roles: (value: { authority: string }) => (value.authority ? null : 'Role is required'),
      },
    },
  });

  useEffect(() => {
    fetchCompanies();
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const data: Role[] = await api.fetchAllRoles();
      const formattedRoles = data.map((role) => ({
        value: role.authority,
        label: role.authority.replace('ROLE_', ''),
      }));
      setRoles(formattedRoles);

      // Set default role for the first user
      form.setFieldValue('users.0.roles', { authority: formattedRoles[0]?.value || '' });
    } catch (error) {
      setAlertInfo({ type: 'error', message: 'Failed to fetch roles. Please try again.' });
    }
  };

  const fetchCompanies = async () => {
    try {
      const response: CompanyProfile[] = await api.fetchCompanies();
      setCompanies(response.map((company) => ({ value: company.id.toString(), label: company.compName })));
    } catch (error) {
      setAlertInfo({ type: 'error', message: 'Failed to fetch companies. Please try again.' });
    }
  };

  const checkUsernameExists = async (username: string, index: number) => {
    try {
      const response: boolean = (await api.checkUsernameExists(username)) ?? false;
      setUsernameExists((prevState) => ({
        ...prevState,
        [index]: response,
      }));
    } catch (error) {
      setAlertInfo({ type: 'error', message: 'Failed to check username. Please try again.' });
    }
  };

  const handleSubmit = async (values: FormValues) => {
    const submitData = values.users.map((user) => ({
      username: user.username,
      password: user.password,
      role: user.roles.authority, // Flattening the role authority
      enabled: user.enabled,
      companyProfileId: parseInt(values.companyProfileId), // Adding the company profile ID
      failedLoginCount: user.failedLoginCount,
      locked: user.locked,
    }));

    try {
      const response = await api.registerUser(submitData);
      setAlertInfo({ type: 'success', message: 'User(s) created successfully!' });
      form.reset();
      setUsernameExists({});
    } catch (error) {
      setAlertInfo({ type: 'error', message: 'Failed to create user(s). Please try again.' });
    }
  };

  const addMoreUsers = () => {
    form.insertListItem('users', {
      username: '',
      password: '',
      roles: { authority: roles.length > 0 ? roles[0].value : '' },
      enabled: true,
      failedLoginCount: 0,
      locked: false,
    });
    setUsernameExists((prevState) => ({
      ...prevState,
      [form.values.users.length]: false,
    }));
  };

  const removeUser = (index: number) => {
    if (form.values.users.length > 1) {
      form.removeListItem('users', index);
      setUsernameExists((prevState) => {
        const newState = { ...prevState };
        delete newState[index];
        return newState;
      });
    }
  };

  useEffect(() => {
    // Revalidate form when usernameExists changes
    form.validate();
  }, [usernameExists]);

  return (
    <Paper withBorder radius="sm">
      <Grid p="lg" justify="space-between" align="center">
        <Grid.Col span={6}>
          <Title order={3} fw={700} c="dark">Create Users</Title>
        </Grid.Col>
        <Grid.Col span={6} style={{ textAlign: 'right' }}>
          <Text size="sm" c="dimmed">Total Profiles</Text>
        </Grid.Col>
      </Grid>
      <Divider />
      <Paper p="lg" radius="lg">
        {alertInfo && (
          <Alert
            icon={alertInfo.type === 'success' ? <IconCheck size="1rem" /> : <IconX size="1rem" />}
            title={alertInfo.type === 'success' ? 'Success' : 'Error'}
            color={alertInfo.type === 'success' ? 'green' : 'red'}
            mb="md"
            onClose={() => setAlertInfo(null)}
          >
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
                  {...form.getInputProps(`users.${index}.roles.authority`)}
                  data={roles}
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
                {usernameExists[index] && <Text c="red" size="sm">Username already exists</Text>}
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

          <Group mt="md">
            <Button onClick={addMoreUsers} variant="outline" leftSection={<IconUserPlus size="1rem" />}>
              Add Another User
            </Button>
            <Button type="submit" color="blue" disabled={!form.isValid() || Object.values(usernameExists).includes(true)}>
              <IconSend size="1rem" />
              Create Users
            </Button>
          </Group>
        </form>
      </Paper>
    </Paper>
  );
};

export default UserProfileForm;
