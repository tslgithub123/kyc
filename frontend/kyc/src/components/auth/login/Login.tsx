import { useState, FormEvent } from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Alert,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import {useAuthStore} from '../../../store/store';

export default function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const loginResponse = await loginMutation.mutateAsync({ username, password });
      console.log('loginResponse: '+JSON.stringify(loginResponse));
      setToken(loginResponse.token);
      setUser(loginResponse.user);
      const data = loginResponse;
      const roles: string[] = data.user.roles.map((role: any) => role.authority);
      console.log('roles: '+JSON.stringify(roles[0]));
      switch (roles[0]) {
        case 'ROLE_SUPERADMIN':
          navigate('/superadmin');
          break;
        case 'ROLE_MPCB':
          navigate('/mpcb');
          break;
        case 'ROLE_ADMIN':
          navigate('/admin');
          break;
        case 'ROLE_ENVIRONMENT_OFFICER':
          navigate('/env');
          break;
        case 'ROLE_MANAGEMENT':
          navigate('/man');
          break;
        case 'ROLE_THIRD_PARTY':
          navigate('/thp');
          break;
        default:
          navigate('/dashboard');
          break;
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>
      <Paper withBorder p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert color="red" mb="md">
              {error}
            </Alert>
          )}
          <TextInput
            label="Username"
            placeholder="your_username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}