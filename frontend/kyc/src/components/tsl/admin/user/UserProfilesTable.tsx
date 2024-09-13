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
  Button,
  Text,
  Center
} from '@mantine/core';
import { IconArrowUp, IconArrowDown, IconSearch, IconTrash, IconClearAll, IconSend2 } from '@tabler/icons-react';
import api from '../../../../utils/api';
import PromptModal from '../../../ui/PromptModal';

interface UserProfile {
  id: number;
  username: string;
  companyName: string;
  designation: string;
  lastLoginDate: string | null;
  locked: boolean;
}

interface SortConfig {
  key: keyof UserProfile;
  direction: 'ascending' | 'descending';
}

export default function UserProfilesTable() {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', direction: 'ascending' });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const theme = useMantineTheme();

  const handleChangePage = (newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (value: string | null) => {
    if (value !== null) {
      setRowsPerPage(parseInt(value, 10));
      setPage(1);
    }
  };

  const fetchUserProfiles = async () => {
    try {
      const response = await api.getAllUserProfiles();
      const userProfiles: UserProfile[] = response.map((user: any) => ({
        id: user.id,
        username: user.username,
        companyName: user.companyName || '',
        designation: user.designation || '',
        lastLoginDate: user.lastLoginDate || null,
        locked: user.locked || false,
      }));
      setUserProfiles(userProfiles);
    } catch (error) {
      console.error('There was an error fetching the user profiles!', error);
    }
  };

  useEffect(() => {
    fetchUserProfiles();
  }, [refresh]);

  const handleLockChange = async (id: number, currentLockedStatus: boolean) => {
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

  const handleSort = (key: keyof UserProfile) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectId = (id: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleDelete = () => {
    console.log("Deleting profiles with IDs:", selectedIds);

    setRefresh(!refresh);
    setSelectedIds([]);
  };

  const sendEmails = () => {
    console.log("Sending emails to profiles with IDs:", selectedIds);
  }

  const deleteProfiles = async (ids: number[]) => {
    try {
      //await api.deleteUserProfiles(ids);
      setUserProfiles((prevProfiles) => prevProfiles.filter((profile) => !ids.includes(profile.id)));
    } catch (error) {
      console.error("Error deleting profiles:", error);
    }
  }

  const sortedProfiles = useMemo(() => {
    let sortedProfiles = [...userProfiles];
    if (sortConfig.key) {
      sortedProfiles.sort((a, b) => {
        if (a[sortConfig.key] !== null && b[sortConfig.key] !== null && a[sortConfig.key]! < b[sortConfig.key]!) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] !== null && b[sortConfig.key] !== null && a[sortConfig.key]! > b[sortConfig.key]!) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedProfiles;
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

  const renderSortIcon = (key: keyof UserProfile) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <IconArrowUp size={16} /> : <IconArrowDown size={16} />;
    }
    return null;
  };

  return (
    <Paper withBorder radius="sm">
      <Grid p="lg" justify="space-between" align="center">
        <Grid.Col span={6}>
          <Title order={3} fw={700} c="dark">User Profiles</Title>
        </Grid.Col>
        <Grid.Col span={6} style={{ textAlign: 'right' }}>
          <Text size="sm" c="dimmed">Total Profiles: {userProfiles.length}</Text>
        </Grid.Col>
      </Grid>
      <Divider />
      <Paper p="lg" radius="lg">
        <Grid mb="md">
          <Grid.Col span={{ base: 12, md: 3 }}>
            <TextInput
              radius="sm"
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              value={searchTerm}
              placeholder="Search..."
              rightSectionWidth={42}
              leftSection={<IconSearch stroke={1.5} />}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                color="blue"
                ml={'sm'}
                disabled={selectedIds.length === 0}
                style={{ width: '100%' }}
                onClick={() => {
                  setSelectedIds([]);
                }}
                leftSection={<IconClearAll />}
                mr={'sm'}
              >
                Clear
              </Button>
              <PromptModal
                disabled={selectedIds.length === 0}
                color="red"
                exportButtonText={'Delete'}
                icon={<IconTrash />}
                title={'Delete Profiles?'}
                description="Are you sure you want to delete the selected profiles?"
                trueButtonText="Delete"
                onConfirm={handleDelete}
              />
              <PromptModal
                disabled={selectedIds.length === 0}
                color="yellow"
                exportButtonText={'Send Email'}
                icon={<IconSend2 />}
                title={'Send Email?'}
                description="Are you sure you want to send email to selected profiles?"
                trueButtonText="Send"
                onConfirm={sendEmails}
              />
            </div>
          </Grid.Col>
        </Grid>
        <Table withColumnBorders striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Center>
                  <ActionIcon size={42} variant="light" onClick={() => handleSort('id')}>{renderSortIcon('id')} ID </ActionIcon>
                </Center>
              </Table.Th>
              <Table.Th>
                <Center>
                  <ActionIcon style={{ height: '42px', width: 'auto', padding: '8px' }} variant="subtle" onClick={() => handleSort('username')}>{renderSortIcon('username')}Username</ActionIcon>
                </Center>
              </Table.Th>
              <Table.Th>
                <Center>
                  <ActionIcon style={{ height: '42px', width: 'auto', padding: '8px' }} variant="subtle" onClick={() => handleSort('companyName')}>Company Name{renderSortIcon('companyName')}</ActionIcon>
                </Center>
              </Table.Th>
              <Table.Th>
                <Center>
                  <ActionIcon style={{ height: '42px', width: 'auto', padding: '8px' }} variant="subtle" onClick={() => handleSort('designation')}>Designation{renderSortIcon('designation')}</ActionIcon>
                </Center>
              </Table.Th>
              <Table.Th>
                <Center>
                  <ActionIcon style={{ height: '42px', width: 'auto', padding: '8px' }} variant="subtle" onClick={() => handleSort('lastLoginDate')}>Last Login Date{renderSortIcon('lastLoginDate')}</ActionIcon>
                </Center>
              </Table.Th>
              <Table.Th>
                <Center>
                  <ActionIcon style={{ height: '42px', width: 'auto', padding: '8px' }} variant="subtle">Lock</ActionIcon>
                </Center>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody style={{ textAlign: 'center' }}>
            {paginatedProfiles.map((profile, index) => (
              <Table.Tr key={profile.id}>
                <Table.Td>
                  <ActionIcon
                    variant={selectedIds.includes(profile.id) ? 'filled' : 'subtle'}
                    onClick={() => handleSelectId(profile.id)}
                  >
                    {index + 1 + (page - 1) * rowsPerPage}
                  </ActionIcon>
                </Table.Td>
                <Table.Td>{profile.username}</Table.Td>
                <Table.Td>{profile.companyName}</Table.Td>
                <Table.Td>{profile.designation}</Table.Td>
                <Table.Td>
                  {profile.lastLoginDate
                    ? new Date(profile.lastLoginDate).toLocaleString()
                    : 'N/A'}
                </Table.Td>
                <Table.Td>
                  <Center>
                    <Switch
                      checked={profile.locked}
                      onChange={() => handleLockChange(profile.id, profile.locked)}
                      color={profile.locked ? "red" : "teal"}
                      size="md"
                    /></Center>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Grid mt="lg" justify="space-between" align="center">
          <Grid.Col span="content">
            <Select
              value={rowsPerPage.toString()}
              onChange={handleChangeRowsPerPage}
              data={['5', '10', '25']}
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
    </Paper>
  );
}
