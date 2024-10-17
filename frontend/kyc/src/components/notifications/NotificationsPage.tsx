import { Divider, Paper, Tabs, rem } from "@mantine/core";
import { IconSettings, IconMessageCircle, IconPhoto, IconGitPullRequest, IconBellFilled, IconRosetteDiscountCheckFilled, IconRosetteDiscountCheckOff } from "@tabler/icons-react";
import classes from './NotificationsPage.module.css';
import { useMediaQuery } from "@mantine/hooks";

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
                            leftSection={<IconBellFilled color="var(--mantine-color-yellow-7)" />}
                        >
                            All
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.List>
                        <Tabs.Tab
                            value="read"
                            leftSection={<IconRosetteDiscountCheckFilled color="var(--mantine-color-green-7)"/>}
                        >
                            Read
                        </Tabs.Tab>
                        <Tabs.Tab
                            mr='md'
                            value="unread"
                            leftSection={<IconRosetteDiscountCheckOff color="var(--mantine-color-red-7)"/>}
                        >
                            Unread
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.List>
                        <Tabs.Tab
                            value="settings"
                            leftSection={<IconGitPullRequest />}
                        >
                            Requests
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="messages"
                            leftSection={<IconMessageCircle />}
                        >
                            Messages
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="gallery"
                            leftSection={<IconPhoto />}
                        >
                            Gallery
                        </Tabs.Tab>
                    </Tabs.List>
                </div>
                )}
            </Tabs>
            <Paper mt='md' ml='sm' mr='sm' p='sm' withBorder>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Paper w='100%' style={{display: 'flex'}} withBorder>
                        <IconBellFilled color="var(--mantine-color-yellow-7)" />
                        <div>
                            <strong>New Notification</strong>
                            <p style={{ margin: 0 }}>You have a new message.</p>
                        </div>
                        </Paper>
                    </div>
                    <Divider/>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <IconRosetteDiscountCheckFilled color="var(--mantine-color-green-7)" />
                        <div>
                            <strong>Discount Applied</strong>
                            <p style={{ margin: 0 }}>Your discount has been applied successfully.</p>
                        </div>
                    </div>
                    <Divider/>  
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <IconRosetteDiscountCheckOff color="var(--mantine-color-red-7)" />
                        <div>
                            <strong>Discount Expired</strong>
                            <p style={{ margin: 0 }}>Your discount has expired.</p>
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    );
}