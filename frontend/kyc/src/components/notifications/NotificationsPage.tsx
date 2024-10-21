import { Divider, Grid, Paper, SimpleGrid, Tabs, Text, Title, rem } from "@mantine/core";
import { IconSettings, IconMessageCircle, IconPhoto, IconGitPullRequest, IconBellFilled, IconAlarmFilled, IconLeaf, IconHistory, IconPinFilled, IconBuilding } from "@tabler/icons-react";
import classes from './NotificationsPage.module.css';
import { useMediaQuery } from "@mantine/hooks";
import NotificationSlice from "./NotificationSlice";


export default () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div>
            <Tabs m='sm' variant="unstyled" defaultValue="all" classNames={classes}>
                {isMobile ? (
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
                ) : (<div style={{ display: 'flex' }}>
                    <Tabs.List>
                        <Tabs.Tab
                            mr='md'
                            value="all"
                            leftSection={<IconBellFilled color="var(--mantine-color-blue-7)" />}
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

                </div>
                )}
            </Tabs>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="sm" mb="xl">
                <Paper mt='md' ml='sm' mr='sm' withBorder>

                    <Grid p="xs" pl='lg' bg={'gray.1'} justify="space-between" align="center">
                        <Grid.Col span={6}>
                            <Title order={4} c="gray.7">
                                Notifications
                            </Title>
                        </Grid.Col>
                        <Grid.Col span={6} style={{ textAlign: 'right' }}>
                            <Text size="sm" c="dimmed" style={{ marginRight: '1rem' }}>
                                <Text component="span" >
                                    1
                                </Text>
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Divider />
                    <Paper p='sm'>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <NotificationSlice title={""} description={"A new unit [unit-name] has just been added."} icon={<IconBuilding size='2rem' color="var(--mantine-color-gray-7)" />} />
                            <NotificationSlice title={"Reminder"} description={"Please reset your password"} icon={<IconAlarmFilled size='2rem' color="var(--mantine-color-gray-7)" />} />
                            <NotificationSlice title={"Reminder"} description={"Your clearance is about to expire. "} icon={<IconAlarmFilled size='2rem' color="var(--mantine-color-yellow-7)" />} />
                            <NotificationSlice title={"Client Registration"} description={"A new client has just registered. Click to review."} icon={<IconGitPullRequest size='2rem' color="var(--mantine-color-red-7)" />} />
                            <NotificationSlice title={"Congratulations!"} description={"Your account has been successfully created. Let's get started."} icon={<IconLeaf size='2rem' color="var(--mantine-color-green-7)" />} />
                        </div>
                    </Paper>
                </Paper>
                <Paper mt='md' ml='sm' mr='sm' withBorder>

                    <Grid p="xs" pl='lg' bg={'gray.1'} justify="space-between" align="center">
                        <Grid.Col span={6}>
                            <Title order={4} c="gray.7">
                                Pinned
                            </Title>
                        </Grid.Col>
                        <Grid.Col span={6} style={{ textAlign: 'right' }}>
                            <Text size="sm" c="dimmed" style={{ marginRight: '1rem' }}>
                                <IconPinFilled />
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Divider />
                    <Paper p='sm'>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <NotificationSlice title={"We notify you that"} description={"You are now obligated to give a star."} icon={<IconBellFilled size='2rem' color="var(--mantine-color-blue-7)" />} />
                            <NotificationSlice title={"We notify you that"} description={"You are now obligated to give a star."} icon={<IconAlarmFilled size='2rem' color="var(--mantine-color-yellow-7)" />} />
                        </div>
                    </Paper>
                </Paper>
            </SimpleGrid>

        </div>
    );
}