import { Card, Group, Avatar, Badge, Text, SimpleGrid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AuthCard from "../../../ui/cards/AuthCard";

async function fetchUserData(id: string) {
  const { data } = await axios.get(`http://192.168.1.36:8080/api/user/officer/${id}`);
  return data;
}

export default function UserInformation({ id }: { id: string }) {
  const { data: userData, error, isLoading } = useQuery({
    queryKey: ['userData', id],
    queryFn: () => fetchUserData(id)
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user data: {error.message}</div>;
  }

  return (
    <div>
      <Card m='lg' p="lg" radius="sm" withBorder>
        <Group style={{ marginBottom: 5 }}>
          <Group>
        <Avatar color="blue" radius="xl">
          {userData.employeeFullName[0]}
        </Avatar>
        <div>
          <Text w={500}>{userData.employeeFullName}</Text>
          <Text size="sm" color="dimmed">
            {userData.designation}
          </Text>
        </div>
          </Group>
          <Badge color="green" variant="light">
        {userData.emailStatus}
          </Badge>
        </Group>

        <SimpleGrid cols={2} spacing="lg" style={{ marginBottom: 10 }}>
          <Text size="sm">
            <strong>Gender:</strong> {userData.gender}
          </Text>
          <Text size="sm">
            <strong>Company Unit:</strong> {userData.companyUnit}
          </Text>
          <Text size="sm">
            <strong>Roles:</strong> {userData.roles.map((role: { authority: any; }) => role.authority).join(', ')}
          </Text>
        </SimpleGrid>

        <AuthCard isRegistered={false} userType={""} form={{
        values: {
          employeeFullName: userData.employeeFullName,
          email: userData.email,
          phone: userData.phone,
          dateOfBirth: new Date(userData.birthday),
          username: userData.username,
          password: userData.password
        }
      }} />
      </Card>
      
    </div>
  );
}
