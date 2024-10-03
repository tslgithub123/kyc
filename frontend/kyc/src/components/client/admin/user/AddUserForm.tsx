import { useForm } from '@mantine/form';
import { TextInput, Button, Container, Paper, Group, Center } from '@mantine/core';

export default function AddUserForm() {
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnBlur: true,
    initialValues: { name: '', username: '', email: '', age: 0 },

    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      username: (value) => (value.length < 2 ? 'Username must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Container my={40}>
      <Paper  p={10} radius="md">
        <form onSubmit={form.onSubmit(console.log)}>
          <Group grow>
            <TextInput 
              label="Employee Name"
              placeholder="Full Name"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            
          </Group>
          <TextInput
              label="Username"
              placeholder="Username"
              key={form.key('username')}
              {...form.getInputProps('username')}
            />  
          <TextInput
            mt="sm"
            label="Email"
            placeholder="Email"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <TextInput
            mt="sm"
            label="Phone"
            placeholder="Phone"
            key={form.key('phone')}
            {...form.getInputProps('phone')}
          />
          <Group grow mt="sm">
            <TextInput
              label="Plot No"
              placeholder="Plot No"
              key={form.key('plotNo')}
              {...form.getInputProps('plotNo')}
            />
            <TextInput
              label="Street"
              placeholder="Street"
              key={form.key('street')}
              {...form.getInputProps('street')}
            />
          </Group>
          <TextInput
            mt="sm"
            label="City"
            placeholder="City"
            key={form.key('city')}
            {...form.getInputProps('city')}
          />
          <Center mt={'xl'}>
            <Button type="submit">Create</Button>
            </Center>
        </form>
      </Paper>
    </Container>
  );
}