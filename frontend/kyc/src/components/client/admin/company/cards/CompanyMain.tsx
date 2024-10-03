import { ActionIcon, Anchor, Avatar, Card, Center, NavLink, Paper, SimpleGrid, Text } from "@mantine/core"
import { IconCalendar, IconMail, IconPhone, IconPhoneCall, IconPrinter } from "@tabler/icons-react";

export default () => {
    const companyData = {
        id: "64e607de-0498-4758-b2f6-ef97d2fc22eb",
        contactPerson: {
            id: "9fd60fd1-0741-44c4-8576-9262825e0731",
            name: "Ajay Ojha",
            designation: "MD",
            phone: "9876543212",
            email: "example@example.com"
        },
        mpcbId: 123456789,
        name: "Techknowgreen Ltd.",
        email: "it@techknowgreen.com",
        fax: "123-456-7890",
        lastEnvironment: "2023",
        phoneNumber: "1234567890",
        website: "www.techknowgreen.com",
        yearEstablished: 2000
    };

    return (
        <Card withBorder padding="md" radius="md">


            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" >
                <Paper p='sm' m="md">
                    <Center>
                        <Avatar color="blue" size='xl'>{companyData.name.charAt(0)}</Avatar>
                    </Center>
                    <Center mt={'sm'}>
                        <Text
                            size="lg"
                            fw={900}
                            variant="gradient"
                            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                        >
                            {companyData.name}
                        </Text>
                    </Center>
                    <Center >
                        <Anchor size="md" href={`https://${companyData.website}`} c='dimmed' target="_blank" underline="hover">
                            {companyData.website}
                        </Anchor>
                    </Center>

                </Paper>


                <Paper p='sm' m="md" withBorder>
                    <SimpleGrid m='md' cols={{ base: 1, sm: 1 }} spacing="sm">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ActionIcon size="lg" variant="light">
                                <IconMail size={18} />
                            </ActionIcon>
                            <Text size="sm" ml="xs"><strong>Email:</strong> {companyData.email}</Text>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ActionIcon c={'green'} bg={'green.0'} size="lg" variant="light">
                                <IconPhone size={18} />
                            </ActionIcon>
                            <Text size="sm" ml="xs"><strong>Phone:</strong> {companyData.phoneNumber}</Text>
                        </div>
                    </SimpleGrid>
                    <SimpleGrid m='md' cols={{ base: 1, sm: 1 }} spacing="sm">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ActionIcon c={'yellow'} bg={'yellow.0'} size="lg" variant="light">
                                <IconPrinter size={18} />
                            </ActionIcon>
                            <Text size="sm" ml="xs"><strong>Fax:</strong> {companyData.fax}</Text>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ActionIcon c={'grape'} bg={'grape.0'} size="lg" variant="light">
                                <IconCalendar size={18} />
                            </ActionIcon>
                            <Text size="sm" ml="xs"><strong>Year Established:</strong> {companyData.yearEstablished}</Text>
                        </div>
                    </SimpleGrid>
                </Paper>
                {/* <ContactPerson /> */}
            </SimpleGrid>
        </Card>
    );
}
