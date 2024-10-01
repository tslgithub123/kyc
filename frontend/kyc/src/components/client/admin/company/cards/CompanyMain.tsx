import { Avatar, Card, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core"
import ContactPerson from "../../../../ui/cards/ContactPerson";

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
            
            
            <SimpleGrid  cols={{ base: 1, sm: 3 }} spacing="sm" >
            <Paper withBorder  m="md">
                <Avatar color="blue" size='xl' >{companyData.name.charAt(0)}</Avatar>
                <Text size="xl" w={700}>{companyData.name}</Text>
                
            </Paper>
           
                    
                    <Paper withBorder  m="md">
                
                <Text size="sm"><strong>Email:</strong> {companyData.email}</Text>
                <Text size="sm"><strong>Phone:</strong> {companyData.phoneNumber}</Text>
                <Text size="sm"><strong>Fax:</strong> {companyData.fax}</Text>
                <Text size="sm"><strong>Website:</strong> {companyData.website}</Text>
                <Text size="sm"><strong>Year Established:</strong> {companyData.yearEstablished}</Text>
                <Text size="sm"><strong>Last Environment:</strong> {companyData.lastEnvironment}</Text>
                <Text size="sm"><strong>Contact Person Phone:</strong> {companyData.contactPerson.phone}</Text>
                <Text size="sm"><strong>Contact Person Email:</strong> {companyData.contactPerson.email}</Text>
            </Paper>
            <ContactPerson/>
            </SimpleGrid>
        </Card>
    );
}
