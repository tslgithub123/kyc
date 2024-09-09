import { Menu, Group, Text, Avatar, useMantineTheme, ActionIcon, rem, Box } from '@mantine/core';
import {
    IconLogout,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
    IconSwitchHorizontal,
    IconChevronRight,
    IconDots,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/store';


export default function AdminMenu() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box>
            <Group>
                <Menu
                    withArrow
                    arrowSize={20}
                    shadow='lg'

                    position="bottom-end"
                    transitionProps={{ transition: 'pop' }}
                    withinPortal
                    
                >
                    <Menu.Target>
                        <ActionIcon variant="default" size={'lg'}>
                            <IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        </ActionIcon>
                    </Menu.Target>
                    <Box >
                        <Menu.Dropdown >
                            <Menu.Item
                                rightSection={
                                    <IconChevronRight style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                                color='blue'
                                onClick={() => navigate('/admin/profile')}
                            >
                                <Group>
                                    <Avatar
                                        radius="xl"
                                        src=""
                                    />

                                    <div>
                                        <Text fw={500}>View Profile</Text>
                                        
                                    </div>
                                </Group>
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.Item
                                leftSection={
                                    <IconHeart
                                        style={{ width: rem(16), height: rem(16) }}
                                        stroke={1.5}
                                        color={theme.colors.red[6]}
                                    />
                                }
                            >
                                Liked posts
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconStar
                                        style={{ width: rem(16), height: rem(16) }}
                                        stroke={1.5}
                                        color={theme.colors.yellow[6]}
                                    />
                                }
                            >
                                Saved posts
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconMessage
                                        style={{ width: rem(16), height: rem(16) }}
                                        stroke={1.5}
                                        color={theme.colors.blue[6]}
                                    />
                                }
                            >
                                Your comments
                            </Menu.Item>

                            <Menu.Label>Settings</Menu.Label>
                            <Menu.Item
                                leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                            >
                                Account settings
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                            >
                                Change account
                            </Menu.Item>

                            {/* Make the entire Menu.Item clickable for logout */}
                            <Menu.Item
                                color="red"
                                leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                                icon={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                                onClick={handleLogout} // Directly handle logout here
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
