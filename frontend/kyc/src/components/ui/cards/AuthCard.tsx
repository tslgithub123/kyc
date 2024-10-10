import { SimpleGrid, ActionIcon, Divider, Text } from "@mantine/core";
import { IconUser, IconMail, IconPhone, IconCalendar, IconUserCheck, IconPassword } from "@tabler/icons-react";
import { FC } from "react";

interface AuthCardProps {
    isRegistered: boolean;
    userType: string;
    form: {
        values: {
            employeeFullName: string;
            email: string;
            phone: string;
            dateOfBirth?: Date | null;
            username: string;
            password: string;
        };
    };
}

const AuthCard: FC<AuthCardProps> = ({ isRegistered, userType, form }) => {
    return (
        <SimpleGrid
            id="userIdentityCard"
            mt="md"
            bg={`var(--mantine-color-${!isRegistered ? 'gray' : userType === 'man' ? 'yellow' : userType === 'env' ? 'green' : userType === 'thp' ? 'grape' : 'gray'}-0)`}
            style={{ border: `1px solid var(--mantine-color-${!isRegistered ? 'gray' : userType === 'man' ? 'yellow' : userType === 'env' ? 'green' : userType === 'thp' ? 'grape' : 'gray'}-4)`, borderRadius: '4px' }}
            p="md"
            cols={2}
            spacing="sm"
        >
            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                <ActionIcon c="gray.7" p="sm" variant="transparent" w="auto">
                    <IconUser style={{ margin: '12px' }} /> Name:
                </ActionIcon>
            </Text>
            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }} c="dimmed">
                <ActionIcon c="gray.7" p="sm" variant="light" w="auto">
                    {form.values.employeeFullName}
                </ActionIcon>
            </Text>

            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                <ActionIcon c="gray.7" p="sm" variant="transparent" w="auto">
                    <IconMail style={{ margin: '12px' }} /> Email:
                </ActionIcon>
            </Text>
            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }} c="dimmed">
                <ActionIcon c="gray.7" p="sm" variant="light" w="auto">
                    {form.values.email}
                </ActionIcon>
            </Text>

            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                <ActionIcon c="gray.7" p="sm" variant="transparent" w="auto">
                    <IconPhone style={{ margin: '12px' }} /> Phone Number:
                </ActionIcon>
            </Text>
            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }} c="dimmed">
                <ActionIcon c="gray.7" p="sm" variant="light" w="auto">
                    {form.values.phone}
                </ActionIcon>
            </Text>

            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                <ActionIcon c="gray.7" p="sm" variant="transparent" w="auto">
                    <IconCalendar style={{ margin: '12px' }} /> Date of Birth:
                </ActionIcon>
            </Text>
            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }} c="dimmed">
                <ActionIcon c="gray.7" p="sm" variant="light" w="auto">
                    {form.values.dateOfBirth?.toLocaleDateString()}
                </ActionIcon>
            </Text>
            <Divider color="gray.5" my="sm" variant="dashed" />
            <Divider color="gray.5" my="sm" variant="dashed" />

            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                <ActionIcon c="gray.7" p="sm" variant="transparent" w="auto">
                    <IconUserCheck style={{ margin: '12px' }} /> Username:
                </ActionIcon>
            </Text>
            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }} c="dimmed">
                <ActionIcon c="gray.7" p="sm" variant="light" w="auto">
                    {form.values.username}
                </ActionIcon>
            </Text>

            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                <ActionIcon c="gray.7" p="sm" variant="transparent" w="auto">
                    <IconPassword style={{ margin: '12px' }} /> Password:
                </ActionIcon>
            </Text>
            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }} c="dimmed">
                <ActionIcon c="gray.7" p="sm" variant="light" w="auto">
                    {form.values.password}
                </ActionIcon>
            </Text>
        </SimpleGrid>
    );
};

export default AuthCard;