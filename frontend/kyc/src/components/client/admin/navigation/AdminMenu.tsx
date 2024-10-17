import React from 'react';
import { Menu, Group, Text, Avatar, useMantineTheme, ActionIcon, rem, Box, MantineTheme } from '@mantine/core';
import {
    IconLogout,
    IconSettings,
    IconChevronRight,
    IconDots,
    IconHistory,
    IconPhone,
    IconHelp,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../store/store';

const menuItems = [
    
    {
        label: 'History',
        icon: (theme: MantineTheme) => <IconHistory style={{ width: rem(16), height: rem(16) }} stroke={1.5} color={theme.colors.blue[6]} />,
        link: '/admin/comments',
        
    },
    {
        label: 'Help',
        icon: (theme: MantineTheme) => <IconHelp style={{ width: rem(16), height: rem(16) }} stroke={1.5} color={theme.colors.red[6]} />,
        link: '/admin/liked-posts',
        section: 'Techknowgreen',
    },
    {
        label: 'Contact us',
        icon: (theme: MantineTheme) => <IconPhone style={{ width: rem(16), height: rem(16) }} stroke={1.5} color={theme.colors.yellow[6]} />,
        link: '/admin/saved-posts',
    },
    
    {
        label: 'Account settings',
        icon: () => <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />,
        link: '/admin/account-settings',
        section: 'Settings',
    },
];

export default function AdminMenu() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/home');
    };

    return (
        <Box>
            <Group>
                <Menu
                    withArrow
                    arrowSize={20}
                    shadow="lg"
                    position="bottom"
                    transitionProps={{ transition: 'pop' }}
                    withinPortal
                >
                    <Menu.Target>
                        <ActionIcon variant="default" size="lg">
                            <IconDots style={{ width: rem(24), height: rem(24) }} stroke={2.0} />
                        </ActionIcon>
                    </Menu.Target>
                    <Box>
                        <Menu.Dropdown>
                            <Menu.Item
                                rightSection={
                                    <IconChevronRight style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                                color="blue"
                                onClick={() => {navigate('profile'); console.log('clicked')}}
                            >
                                <Group>
                                    <Avatar radius="xl" src="" />
                                    <div>
                                        <Text fw={500}>Profile</Text>
                                    </div>
                                </Group>
                            </Menu.Item>

                            <Menu.Divider />

                            {menuItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    {item.section && <Menu.Label>{item.section}</Menu.Label>}
                                    <Menu.Item
                                        leftSection={item.icon(theme)}
                                        onClick={() => navigate(item.link)}
                                    >
                                        {item.label}
                                    </Menu.Item>
                                </React.Fragment>
                            ))}

                            <Menu.Item
                                color="red"
                                leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                                onClick={handleLogout}
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Box>
                </Menu>
            </Group>
        </Box>
    );
}