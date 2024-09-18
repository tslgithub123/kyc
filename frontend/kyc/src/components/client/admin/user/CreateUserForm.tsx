import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Container, Paper, Title, Group, UnstyledButton, ThemeIcon, Center } from '@mantine/core';
import { IconUserEdit } from '@tabler/icons-react';

export default function CreateUserForm() {
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnBlur: true,
    initialValues: { name: '', email: '', age: 0 },

    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
    },
  });

  return (
    <Container size={420} my={40}>
      <Center>
      <ThemeIcon size={50}  variant="light"><IconUserEdit size={40} color="var(--mantine-color-green-5)" /></ThemeIcon>
      </Center><Title ></Title>
      <Paper withBorder p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(console.log)}>
          <TextInput
            label="Name"
            placeholder="Name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            mt="sm"
            label="Email"
            placeholder="Email"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <NumberInput
            mt="sm"
            label="Age"
            placeholder="Age"
            min={0}
            max={99}
            key={form.key('age')}
            {...form.getInputProps('age')}
          />
          <Group ta="center" mt="xl">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}