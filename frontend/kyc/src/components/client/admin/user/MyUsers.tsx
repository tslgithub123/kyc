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
  Center,
  Tooltip,
  Pill,
  Menu,
  rem,
} from '@mantine/core';
import { IconArrowUp, IconArrowDown, IconSearch, IconTrash, IconClearAll, IconSend2, IconCircleOff, IconDownload, IconArrowsLeftRight, IconMessageCircle, IconPhoto, IconSettings, IconFingerprint, IconFileExcel, IconPdf, IconRestore } from '@tabler/icons-react';
import api from '../../../../utils/api';
import PromptModal from '../../../ui/PromptModal';
import global from "./../../../ui/Global.module.css";
import { useAuthStore } from '../../../../store/store';

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

export default function MyUsers() {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
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
      const compProfileId = useAuthStore.getState().user?.companyProfile.id;
      console.log("Company Profile ID:", compProfileId);
      let response: any[] = [];
      if (compProfileId !== undefined) {
        response = await api.fetchUsersByCompanyId(compProfileId.toString());
      }
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

  const handleDeactivate = () => {
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

  const getOutlineColor = (designation: string): string => {
    const designationColors: { [key: string]: string } = {
      'Administrator': '1px solid red',
      'Environment Officer': '1px solid green',
      'Manager': '1px solid purple',
      'Third Party': '1px solid gray',
     
    };
  
    return designationColors[designation] || '1px solid black';
  };
  

  const getTextColor = (designation: string): string => {
    const textColors: { [key: string]: string } = {
      'Administrator': 'red',
      'Environment Officer': 'darkgreen',
      'Manager': 'purple',
      'Third Party': 'gray.9',
     };
  
    return textColors[designation] || 'black';
  };

  return (
    <Paper withBorder mt={'md'} radius="sm">
       <Grid p="sm" pl='lg' bg={'gray.1'} justify="space-between" align="center">
                    <Grid.Col span={6}>
                        <Tooltip withArrow arrowPosition="side" arrowSize={8} position="right" offset={-370} label="Select the title and fill in the details to add a user.">
                            <Title className={global.title}  order={3} c="gray.7">
                                My Users
                            </Title>
                        </Tooltip>
                    </Grid.Col>
                    <Grid.Col span={6} style={{ textAlign: 'right' }}>
                        <Text size="sm" c="dimmed">Total Profiles: </Text>
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
                onClick={() => {
                  setSelectedIds([]);
                }}
                leftSection={<IconClearAll />}
                style={{ minWidth: '110px' }}
                mr={'sm'}
              >
                Clear
              </Button>
              <PromptModal
                disabled={selectedIds.length === 0}
                color="red"
                exportButtonText={'Deactivate'}
                icon={<IconCircleOff />}
                title={'Deactivate Profile(s)?'}
                description="Are you sure you want to deactivate the selected profile(s)?"
                trueButtonText="Deactivate"
                onConfirm={handleDeactivate}
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
              <PromptModal
                disabled={!(selectedIds.length === 1)}
                color="dark"
                exportButtonText={'Reset Password'}
                icon={<IconRestore/>}
                title={'Reset Password?'}
                description="Are you sure you want to reset password of the selected profile? This will send an email to the user with reset credentials."
                trueButtonText="Send"
                onConfirm={sendEmails}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }} style={{ textAlign: 'right' }}>
          <Menu shadow="md" width={200}>
      <Menu.Target>
      <ActionIcon size="lg" color="green">
        <IconDownload size={20} />
      </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        
        <Menu.Item leftSection={<IconFileExcel style={{ width: rem(14), height: rem(14) }} />}>
          Download Excel
        </Menu.Item>
        <Menu.Item leftSection={<IconPdf style={{ width: rem(14), height: rem(14) }} />}>
          Download PDF
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
            
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
              {/* <Table.Th>
                <Center>
                  <ActionIcon style={{ height: '42px', width: 'auto', padding: '8px' }} variant="subtle" onClick={() => handleSort('companyName')}>Company Name{renderSortIcon('companyName')}</ActionIcon>
                </Center>
              </Table.Th> */}
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
                {/* <Table.Td>{profile.companyName}</Table.Td> */}
                <Table.Td><Pill  c={getTextColor(profile.designation)} style={{width: '130px',  
                justifyContent: 'center', 
      outline: getOutlineColor(profile.designation),
      
    }}>{profile.designation}</Pill></Table.Td>
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
                    <Text size="sm" c="dimmed">
                      N/A
                    </Text>
                  )}
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
    </Paper>
  );
}
