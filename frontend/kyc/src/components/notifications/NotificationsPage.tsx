import { ActionIcon, Divider, Grid, Group, Paper, SimpleGrid, Tabs, Text, Title, rem } from "@mantine/core";
import { IconSettings, IconMessageCircle, IconPhoto, IconGitPullRequest, IconBellFilled, IconAlarmFilled, IconLeaf, IconHistory, IconPinFilled, IconBuilding, IconPinned, IconPin, IconUserPlus, IconPassword } from "@tabler/icons-react";
import classes from './NotificationsPage.module.css';
import { useMediaQuery } from "@mantine/hooks";
import NotificationSlice from "./NotificationSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import { Notification } from "../hooks/useWebSocket";


export default () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const userId = '6413a162-927f-434f-8e6f-52527524b580';

    // const handleNewNotification = (notification: Notification) => {
    //     setNotifications(prev => [notification, ...prev]);
    //   };

    //   const { isConnected } = useWebSocket({
    //     userId,
    //     onMessage: handleNewNotification,
    //   });



    return (
        <div>
            <div>
                <Group>
                    <Text style={{fontWeight: 'bold'}} size="2rem" mb='xl' mt='lg' variant="text" c='gray.7' gradient={{ from: 'blue', to: 'red', deg: 90 }}>
                        Notifications
                    </Text>
                </Group>
            </div>

            {isMobile ? (
                <Tabs mb='lg' variant="unstyled" defaultValue="all" classNames={classes}>
                    <Tabs.List grow>
                        <Tabs.Tab value="settings">
                            <IconSettings style={{ width: rem(16), height: rem(16) }} />
                        </Tabs.Tab>
                        <Tabs.Tab value="messages">
                            <IconMessageCircle style={{ width: rem(16), height: rem(16) }} />
                        </Tabs.Tab>
                        <Tabs.Tab value="gallery">
                            <IconPhoto style={{ width: rem(16), height: rem(16) }} />
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            ) : (


                <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} mb="xl">
                    <Paper >
                        <Tabs mb='lg' style={{ display: 'flex' }} variant="unstyled" defaultValue="all" classNames={classes}>
                            <Tabs.List >
                                <Tabs.Tab
                                    mr='md'
                                    value="all"
                                    leftSection={<IconBellFilled color="var(--mantine-color-gray-7)" />}

                                >
                                    All
                                </Tabs.Tab>

                            </Tabs.List>

                            <Tabs.List>
                                <Tabs.Tab
                                    value="reminders"
                                    leftSection={<IconAlarmFilled color="var(--mantine-color-yellow-7)" />}
                                >
                                    Reminders
                                </Tabs.Tab>
                                <Tabs.Tab
                                    value="requests"
                                    leftSection={<IconGitPullRequest color="var(--mantine-color-red-7)" />}
                                >
                                    Requests
                                </Tabs.Tab>
                                <Tabs.Tab
                                    mr='md'
                                    value="tsl"
                                    leftSection={<IconLeaf color="var(--mantine-color-green-7)" />}
                                >
                                    TSL
                                </Tabs.Tab>
                            </Tabs.List>

                            <Tabs.List>
                                <Tabs.Tab
                                    value="history"
                                    leftSection={<IconHistory color="var(--mantine-color-gray-7)" />}
                                >
                                    History
                                </Tabs.Tab>

                            </Tabs.List>
                        </Tabs>


                        <Paper >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <NotificationSlice title={""} description={"A new unit [unit-name] has just been added."} icon={<IconBuilding size='2rem' color="var(--mantine-color-gray-7)" />} />
                                <NotificationSlice title={"Reset Password"} description={"Please reset your password"} icon={<IconPassword size='2rem' color="var(--mantine-color-gray-7)" />} />
                                <NotificationSlice title={"Reminder"} description={"Your clearance is about to expire. "} icon={<IconAlarmFilled size='2rem' color="var(--mantine-color-yellow-7)" />} />
                                <NotificationSlice title={"New Client Registration"} description={"A new client has just registered. Click to review."} icon={<FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: '1.4rem' }} color="var(--mantine-color-lime-6)" />} />
                                <NotificationSlice title={"New Officer Registration"} description={`[company] [company-unit] has added a new officer.`} icon={<IconUserPlus size='2rem' color="var(--mantine-color-blue-7)" />} />
                                <NotificationSlice title={"Congratulations!"} description={`Your account has been successfully created. Let's get started.`} icon={<IconLeaf size='2rem' color="var(--mantine-color-green-7)" />} />
                            </div>
                        </Paper>
                    </Paper>
                    <Paper ml='sm' mr='sm' >
                        <Group>
                            <Paper withBorder bg='gray.1' mb='md' radius="sm">
                                <div style={{ display: 'flex' }}>
                                    <ActionIcon pl='xs' size='100%' variant="transparent">
                                        <IconPinFilled color="var(--mantine-color-gray-7)" />
                                        <Text style={{fontWeight: 'bold'}} size="1.3rem" pl='14px' pr='14px' p='7px' variant="text" c='gray.7' gradient={{ from: 'blue', to: 'red', deg: 90 }}>
                                            Pinned
                                        </Text>
                                    </ActionIcon>
                                </div>
                            </Paper>
                        </Group>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <NotificationSlice title={""} description={"A new unit [unit-name] has just been added."} icon={<IconBuilding size='2rem' color="var(--mantine-color-gray-7)" />} />
                            <NotificationSlice title={"Reminder"} description={"Please reset your password"} icon={<IconAlarmFilled size='2rem' color="var(--mantine-color-gray-7)" />} />
                            <NotificationSlice title={"Reminder"} description={"Your clearance is about to expire. "} icon={<IconAlarmFilled size='2rem' color="var(--mantine-color-yellow-7)" />} />
                            <NotificationSlice title={"Client Registration"} description={"A new client has just registered. Click to review."} icon={<FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: '1.4rem' }} color="var(--mantine-color-lime-6)" />} />
                            <NotificationSlice title={"Congratulations!"} description={`Your account has been successfully created. Let's get started.`} icon={<IconLeaf size='2rem' color="var(--mantine-color-green-7)" />} />
                            
                        </div>

                    </Paper>
                </SimpleGrid>
            )}
        </div>
    );
}