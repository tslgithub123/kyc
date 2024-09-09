import { Card, Image, Text, Button, Stack } from '@mantine/core';
import CreateProfileIcon from '../../../assets/icons/create_profile.png';

export default function CreateUserProfileCard() {
  return (
    <Card withBorder padding="lg" style={styles.card}>
      <Stack align="center" spacing="md">
        <Image
          style={{ width: 65 }}
          src={CreateProfileIcon}
          alt="Create User Profiles"
        />
        <Text size="sm" ta="center">
          Create user profiles to get started
        </Text>
        <Button color="blue" fullWidth mt="md" radius="md">
          Create User Profiles
        </Button>
      </Stack>
    </Card>
  );
}

const styles = {
  card: {
    width: '100%',
    height: '100%',
    maxWidth: '300px',
    margin: '0',
  }
};
