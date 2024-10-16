import { Paper, Text, Group, Avatar, ActionIcon } from '@mantine/core';
import { IconMail, IconPhone } from '@tabler/icons-react';

export default () => {

    const contactPerson = {
        id: "9fd60fd1-0741-44c4-8576-9262825e0731",
        name: "Ajay Ojha",
        designation: "MD",
        phone: "9876543212",
        email: "example@example.com"
    };

    return (
        <Paper   withBorder>
            <Group style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Group style={{ display: 'flex' }}>
                    <Avatar color="blue" radius="xl">
                        {contactPerson.name.charAt(0)}
                    </Avatar>
                    <div style={{ marginLeft: '10px' }}>
                        <Text size="lg">{contactPerson.name}</Text>
                        <Text size="sm" c="dimmed">{contactPerson.designation}</Text>
                    </div>
                </Group>
                <Group style={{ display: 'flex' }}>
                    <Group>
                        <ActionIcon size="lg" variant="light">
                            <IconPhone size={18} />
                        </ActionIcon>
                        <Text size="sm">{contactPerson.phone}</Text>
                    </Group>
                    <Group>
                        <ActionIcon size="lg" variant="light">
                            <IconMail size={18} />
                        </ActionIcon>
                        <Text size="sm">{contactPerson.email}</Text>
                    </Group>
                </Group>
            </Group>
        </Paper>
    );
}