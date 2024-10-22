import { ActionIcon, Button, Divider, Notification, Text } from "@mantine/core";
import notificationStyles from "./NotificationPage.module.css";
import { IconAlarmFilled, IconArrowBack, IconCheck, IconChevronLeft, IconChevronRight, IconPinned, IconX } from "@tabler/icons-react";
import { useState } from "react";

interface NotificationProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export default ({ title, description, icon }: NotificationProps) => {
    const [expanded, setExpanded] = useState(false);
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
                children: <div style={{display: 'flex' }}  onMouseEnter={()=> setExpanded(true)} onMouseLeave={() => setTimeout(() => setExpanded(false), 1000)}>
                            <div style={{ display: 'flex',  marginRight: !expanded ? '70px' : '0', flexDirection: 'row', alignItems: 'center' }}>
                                {expanded?"": <IconChevronLeft />}
                                <Text size="xs" style={{ whiteSpace: 'nowrap' }}>{new Date().toLocaleString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit' })}</Text>
                            </div>
                            
                            {expanded ?  <div  style={{ display: 'flex', gap: '0.5rem', marginRight: '180px', alignItems: 'center', transition: 'margin-right 0.3s ease-in-out' }}>
                            <Divider ml='md' orientation="vertical" /><ActionIcon c='gray' onClick={() => { console.log('read') }} variant="subtle" title="Mark as read">
                                        <IconCheck />
                                    </ActionIcon>
                                    <ActionIcon c='gray' variant="subtle" title="Pin notification">
                                        <IconPinned />
                                    </ActionIcon>
                                    <ActionIcon c='gray' variant="subtle" title="Dismiss notification">
                                        <IconX />
                                    </ActionIcon>
                                    
                                </div>: ""}
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