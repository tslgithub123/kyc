import { useMutation, UseMutationResult } from '@tanstack/react-query';
import api from '../../utils/api';

interface LoginResponse {
  data: {
    userId: string;
    token: string;
    role: string;
  };
}

interface Credentials {
  username: string;
  password: string;
}

export function useLogin(): UseMutationResult<LoginResponse, unknown, Credentials, unknown> {
  const loginMutation = useMutation<LoginResponse, unknown, Credentials>({
    mutationFn: api.loginApi.login
  });

  return loginMutation;
}
