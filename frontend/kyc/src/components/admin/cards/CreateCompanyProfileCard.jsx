import { Card, Image, Text, Button, Stack, Center } from '@mantine/core';
import CreateProfileIcon from '../../../assets/icons/create_company.png';

export default function CreateCompanyProfileCard() {
  return (
      <Card withBorder padding="lg" radius="lg" style={styles.card}>
        <Stack align="center" spacing="md">
          <Image
          style={{ width: 65 }}
            src={CreateProfileIcon}
            alt="Create Company Profile"
          />
          <Text size="sm" ta="center">
            Create company profile to get started
          </Text>
          <Button color="green" fullWidth mt="md" radius="md">
            Create Company Profile
          </Button>
        </Stack>
      </Card>
  );
}

const styles = {
  card: {
    width: '100%',
    maxWidth: '300px',
    margin: '0',
  }
};