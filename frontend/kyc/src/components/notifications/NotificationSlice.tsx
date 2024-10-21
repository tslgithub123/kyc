import { ActionIcon, Divider, Notification } from "@mantine/core";
import notificationStyles from "./NotificationPage.module.css";
import { IconAlarmFilled, IconCheck, IconPinned, IconX } from "@tabler/icons-react";

interface NotificationProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export default ({ title, description, icon }: NotificationProps) => {
    return (
        <Notification
            className={notificationStyles.notification}
            style={{ width: '100%', paddingLeft: 'var(--mantine-spacing-md) ', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
            withBorder
            variant="default"
            color="transparent"
            title={title}
            icon={icon}
            closeButtonProps={{
                children:
                    <div style={{ display: 'flex', gap: '0.5rem', marginRight: '80px' }}>
                        <Divider orientation="vertical" />
                        <ActionIcon c='gray' onClick={() => { console.log('read') }} variant="subtle" title="Mark as read">
                            <IconCheck />
                        </ActionIcon>
                        <ActionIcon c='gray' variant="subtle" title="Pin notification">
                            <IconPinned />
                        </ActionIcon>
                        <ActionIcon c='gray' variant="subtle" title="Dismiss notification">
                            <IconX />
                        </ActionIcon>
                    </div>
            }}
            onClick={() => console.log('Notification clicked')}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ width: '80%' }}>{description}</span>

            </div>

        </Notification>
    );
}