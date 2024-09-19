import { useMantineTheme, Box, Group, Menu, ActionIcon, rem, Avatar, Text } from "@mantine/core";
import { IconDots, IconChevronRight, IconLogout } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/store";

interface MenuItem {
    section?: string;
    icon: (theme: any) => JSX.Element;
    link: string;
    label: string;
    mainOption?: {}
}

interface NavOptionsProps {
    menuItems: MenuItem[];
}

export default function NavOptions({ menuItems }: NavOptionsProps) {
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
                    shadow="lg"
                    position="bottom"
                    transitionProps={{ transition: 'pop' }}
                    withinPortal
                >
                    <Menu.Target>
                        <ActionIcon variant="default" size="lg">
                            <IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
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