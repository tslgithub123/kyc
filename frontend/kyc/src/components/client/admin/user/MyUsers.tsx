import { useState, useMemo, useEffect } from 'react';
import {
  Table,
  Paper,
  Grid,
  Title,
  TextInput,
  Switch,
  Pagination,
  Select,
  Divider,
  ActionIcon,
  useMantineTheme,
  Text,
  Center,
  Menu,
  rem,
  Pill,
  Group,
  Button,
} from '@mantine/core';
import {
  IconArrowUp,
  IconArrowDown,
  IconSearch,
  IconSend2,
  IconCircleOff,
  IconDownload,
  IconFileExcel,
  IconPdf,
  IconRestore,
  IconUser,
  IconSettings,
  IconMessageCircle,
  IconPhoto,
  IconArrowsLeftRight,
  IconTrash,
  IconPng,
  IconImageInPicture,
  IconCsv
} from '@tabler/icons-react';
import api from '../../../../utils/api';
import PromptModal from '../../../ui/PromptModal';
import global from "../../../ui/Global.module.css";
import { useAuthStore } from '../../../../store/store';
import { getUserTypeColor } from '../../../../utils/colorUtils';
import UserInformation from './UserInformation';
import { User } from '../../../../utils/types';
import CustomModal from '../../../ui/CustomModal';
import { useMediaQuery } from '@mantine/hooks';

interface SortConfig {
  key: keyof User;
  direction: 'ascending' | 'descending';
}

export default function MyUsers() {
  const [userProfiles, setUserProfiles] = useState<User[]>([]);
  const [currentProfile, setCurrentProfile] = useState<User | undefined>();
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', direction: 'ascending' });
  const [selectedProfile, setSelectedProfile] = useState<User | undefined>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const theme = useMantineTheme();

  const uid = useAuthStore().user?.id;

  const handleChangePage = (newPage: number) => setPage(newPage);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleChangeRowsPerPage = (value: string | null) => {
    if (value !== null) {
      setRowsPerPage(parseInt(value, 10));
      setPage(1);
    }
  };

  const fetchUserProfiles = async () => {
    try {
      const compUnitId = useAuthStore.getState().user?.companyUnit.id;
      console.log("Company Unit ID:", compUnitId);
      let response: any[] = [];
      if (compUnitId !== undefined) {
        response = await api.fetchUsersByCompanyUnitId(compUnitId.toString());
        console.log("Response:", response);
      }
      const userProfiles: User[] = response.map((user: any) => ({
        id: user.id,
        username: user.username,
        companyName: user.companyName || '',
        designation: user.designation || '',
        lastLoginDate: user.lastLoginDate || null,
        locked: user.locked || false,
        roles: user.roles || [],
        enabled: user.enabled || false,
        companyUnit: user.companyUnit || {
          id: '',
          companyProfile: {
            id: '',
            contactPerson: {
              id: '',
              name: '',
              designation: '',
              phone: '',
              email: '',
            },
            mpcbid: 0,
            name: '',
            email: '',
            fax: '',
            lastEnvironment: '',
            phoneNumber: '',
            website: '',
            yearEstablished: 0,
          },
          address: {
            id: '',
            street: '',
            line2: '',
            line3: '',
            city: '',
            state: '',
            district: '',
            country: '',
            pincode: '',
            village: '',
            taluka: '',
            plotNumber: '',
            ro: '',
            sro: '',
          },
          industryLink: {
            id: '',
            industryScale: {
              id: '',
              name: '',
            },
            industryType: {
              id: '',
              name: '',
            },
            industryCategory: {},
          },
          name: '',
          email: '',
          fax: '',
          workDay: 0,
          workingHour: 0,
        },
        failedLoginCount: user.failedLoginCount || 0,
        accountNonLocked: user.accountNonLocked || false,
        accountNonExpired: user.accountNonExpired || false,
        credentialsNonExpired: user.credentialsNonExpired || false,
      }));
      setUserProfiles(userProfiles);
    } catch (error) {
      console.error('There was an error fetching the user profiles!', error);
    }
  };

  useEffect(() => {
    const fetchAndFilterUserProfiles = async () => {
      
      await fetchUserProfiles();
      setUserProfiles((prevUserProfiles) => {
        const currentUserProfile = prevUserProfiles.find(profile => profile.id === uid ? Number(uid) : undefined);
        console.log("Current User Profile:", currentUserProfile);
        if (currentUserProfile) {
          setCurrentProfile(currentUserProfile);
          return prevUserProfiles.filter(profile => profile.id !== uid);
        }
        return prevUserProfiles;
      });
    };
    fetchAndFilterUserProfiles();
  }, [refresh, uid]);

  const handleLockChange = async (id: string, currentLockedStatus: boolean) => {
    try {
      const response = await api.updateUserLockStatus(id.toString(), !currentLockedStatus);
      setUserProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id === id ? { ...profile, locked: response.locked } : profile
        )
      );
    } catch (error) {
      console.error("Error updating lock status:", error);
    }
  };

  const handleSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectProfile = (profile: User) => {
    setSelectedProfile((prevSelectedProfile) => {
      if (prevSelectedProfile?.id === profile.id) {
        return undefined;
      } else {
        return profile;
      }
    });
  };

  const handleDeactivate = () => {
    console.log("Deleting profile:", selectedProfile);
    // Implement your deactivate logic here, possibly using profile ID
    setRefresh(!refresh);
    setSelectedProfile(undefined);
  };

  const sendEmails = () => {
    console.log("Sending email to profile:", selectedProfile);
    // Implement your email sending logic here
  }

  const sortedProfiles = useMemo(() => {
    let sorted = [...userProfiles];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue !== null && bValue !== null && aValue! < bValue!) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue !== null && bValue !== null && aValue! > bValue!) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [userProfiles, sortConfig]);

  const filteredProfiles = useMemo(() =>
    sortedProfiles.filter((profile) =>
      Object.values(profile).some(
        (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    ),
    [sortedProfiles, searchTerm]
  );

  const paginatedProfiles = filteredProfiles.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const renderSortIcon = (key: keyof User) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <IconArrowUp size={16} /> : <IconArrowDown size={16} />;
    }
    return null;
  };

  return (
    <Paper withBorder mt={'md'} radius="sm">
      <Grid p="sm" pl='lg' bg={'gray.1'} justify="space-between" align="center">
        <Grid.Col span={6}>
          <Title className={global.title} order={3} c="gray.7">
            My Users
          </Title>
        </Grid.Col>
        <Grid.Col span={6} style={{ textAlign: 'right' }}>
          <Text size="sm" c="dimmed" style={{ marginRight: '1rem' }}>
            Total Users: <Text component="span" c={userProfiles.length > 0 ? 'blue' : 'red'}>
              {userProfiles.length + 1}
            </Text>
          </Text>
        </Grid.Col>
      </Grid>
      <Divider />
      <Paper pt="lg" pl="lg" pr="lg" radius="lg">
        <Grid >
        {!isMobile && <Grid.Col span={3} style={{ textAlign: 'left' }}>
            <TextInput
              radius="sm"
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              value={searchTerm}
              placeholder="Search..."
              rightSectionWidth={42}
              leftSection={<IconSearch stroke={1.5} />}
            />
          </Grid.Col>}
          {isMobile && <Grid.Col span={12} style={{ textAlign: 'left' }}>
            <TextInput
              radius="sm"
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              value={searchTerm}
              placeholder="Search..."
              rightSectionWidth={42}
              leftSection={<IconSearch stroke={1.5} />}
            />
          </Grid.Col>}
          {!isMobile && (
            <Grid.Col span={6} style={{ textAlign: 'center' }}>
              
              
              <CustomModal
                icon={<IconSettings />}
                title='User Information'
                userType={selectedProfile?.designation || ''}
                showComponent={<UserInformation id={selectedProfile?.id || ''} />}
                exportButtonText={'View'}
                disabled={!selectedProfile}
                size='xl'
              />
              <PromptModal
                disabled={!selectedProfile}
                color="red"
                exportButtonText={'Deactivate'}
                icon={<IconCircleOff />}
                title={'Deactivate Profile?'}
                description="Are you sure you want to deactivate the selected profile?"
                trueButtonText="Deactivate"
                onConfirm={handleDeactivate}
              />
              <PromptModal
                disabled={!selectedProfile}
                color="yellow"
                exportButtonText={'Send Email'}
                icon={<IconSend2 />}
                title={'Send Email?'}
                description="Are you sure you want to send email to the selected profile?"
                trueButtonText="Send"
                onConfirm={sendEmails}
              />
            </Grid.Col>
          )}
          {!isMobile && (
            <Grid.Col span={3} style={{ textAlign: 'right' }}>
            <Menu trigger="click-hover" shadow="md" width={200}>
      <Menu.Target>
        <Button c='orange' bg='orange.0' variant='default' leftSection={<IconDownload/>}>Download</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Download</Menu.Label>
        <Menu.Item leftSection={<IconFileExcel style={{ width: rem(14), height: rem(14) }} />}>
          Excel
        </Menu.Item>
        <Menu.Item leftSection={<IconCsv style={{ width: rem(14), height: rem(14) }} />}>
          CSV
        </Menu.Item>
        
      
      </Menu.Dropdown>
    </Menu>
          </Grid.Col>
          )}
          {isMobile && (
            <Grid.Col >
            <PromptModal
            disabled={!selectedProfile}
            color="yellow"
            exportButtonText={'Send Email 2'}
            icon={<IconSend2 />}
            title={'Send Email?'}
            description="Are you sure you want to send email to the selected profile?"
            trueButtonText="Send"
            onConfirm={sendEmails}
          />
          </Grid.Col>
          )}
          {isMobile && (
            <Grid.Col span={12} style={{ textAlign: 'center' }}>
              <Group >
                <CustomModal
                  icon={<IconUser />}
                  title='User Information'
                  userType={selectedProfile?.designation || ''}
                  showComponent={<UserInformation id={selectedProfile?.id || ''} />}
                  exportButtonText={'View'}
                  disabled={!selectedProfile}
                  size='xl'
                />
                <CustomModal
                  icon={<IconSettings />}
                  title='User Information'
                  userType={selectedProfile?.designation || ''}
                  showComponent={<UserInformation id={selectedProfile?.id || ''} />}
                  exportButtonText={'View'}
                  disabled={!selectedProfile}
                  size='xl'
                />
                <PromptModal
                  disabled={!selectedProfile}
                  color="red"
                  exportButtonText={'Deactivate'}
                  icon={<IconCircleOff />}
                  title={'Deactivate Profile?'}
                  description="Are you sure you want to deactivate the selected profile?"
                  trueButtonText="Deactivate"
                  onConfirm={handleDeactivate}
                />
                <PromptModal
                  disabled={!selectedProfile}
                  color="yellow"
                  exportButtonText={'Send Email'}
                  icon={<IconSend2 />}
                  title={'Send Email?'}
                  description="Are you sure you want to send email to the selected profile?"
                  trueButtonText="Send"
                  onConfirm={sendEmails}
                />
              </Group>
            </Grid.Col>
          )}
        </Grid>
      </Paper>
      <div style={{ margin: 'var(--mantine-spacing-lg)' }}>
      <Table  withColumnBorders striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Center>
                <ActionIcon size={42} variant="light" onClick={() => handleSort('id')}>
                  {renderSortIcon('id')} #
                </ActionIcon>
              </Center>
            </Table.Th>
            <Table.Th>
              <Center>
                <ActionIcon
                  style={{ height: '42px', width: 'auto', padding: '8px' }}
                  variant="subtle"
                  onClick={() => handleSort('username')}
                >
                  {renderSortIcon('username')} Username
                </ActionIcon>
              </Center>
            </Table.Th>
            <Table.Th>
              <Center>
                <ActionIcon
                  style={{ height: '42px', width: 'auto', padding: '8px' }}
                  variant="subtle"
                  onClick={() => handleSort('designation')}
                >
                  Designation {renderSortIcon('designation')}
                </ActionIcon>
              </Center>
            </Table.Th>
            <Table.Th>
              <Center>
                <ActionIcon
                  style={{ height: '42px', width: 'auto', padding: '8px' }}
                  variant="subtle"
                  onClick={() => handleSort('lastLoginDate')}
                >
                  Last Login Date {renderSortIcon('lastLoginDate')}
                </ActionIcon>
              </Center>
            </Table.Th>
            <Table.Th>
              <Center>
                <ActionIcon
                  style={{ height: '42px', width: 'auto', padding: '8px' }}
                  variant="subtle"
                >
                  Lock
                </ActionIcon>
              </Center>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody style={{ textAlign: 'center' }}>
          {paginatedProfiles.map((profile, index) => (
            <Table.Tr key={profile.id}>
              <Table.Td>
                <ActionIcon
                  variant={selectedProfile?.id === profile.id ? 'filled' : 'subtle'}
                  onClick={() => handleSelectProfile(profile)}
                >
                  {index + 1 + (page - 1) * rowsPerPage}
                </ActionIcon>
              </Table.Td>
              <Table.Td>
                <Text variant='text'>{profile.username}</Text>
              </Table.Td>
              <Table.Td>
                <Pill bg={getUserTypeColor(profile.designation, '1')} size='lg'>
                  <Text variant='text' c={getUserTypeColor(profile.designation)}>
                    {profile.designation}
                  </Text>
                </Pill>
              </Table.Td>
              <Table.Td>
                {profile.lastLoginDate ? (
                  <Text size="sm" c="dimmed">
                    {new Date(profile.lastLoginDate).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                ) : (
                  <Text size="sm" c="dimmed">N/A</Text>
                )}
              </Table.Td>
              <Table.Td>
                <Center>
                  <Switch
                    checked={profile.locked}
                    onChange={() => handleLockChange(profile.id, profile.locked)}
                    color={profile.locked ? "red" : "teal"}
                    size="md"
                  />
                </Center>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      </div>
      <Grid mt="lg" justify="space-between" align="center">
        <Grid.Col span="content">
          <Select
            value={rowsPerPage.toString()}
            onChange={handleChangeRowsPerPage}
            data={['10', '25']}
            label="Rows per page"
            size="sm"
          />
        </Grid.Col>
        <Grid.Col span="content">
          <Pagination
            total={Math.ceil(filteredProfiles.length / rowsPerPage)}
            value={page}
            onChange={handleChangePage}
            size="md"
            color={theme.primaryColor}
          />
        </Grid.Col>
      </Grid>
    </Paper>

  );
}
