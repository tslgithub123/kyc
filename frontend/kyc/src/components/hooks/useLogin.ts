import { useMutation, UseMutationResult } from '@tanstack/react-query';
import api from '../../utils/api';
import { AuthResponse, Credentials } from '../../utils/types';


export function useLogin(): UseMutationResult<AuthResponse, unknown, Credentials, unknown> {
  const loginMutation = useMutation<AuthResponse, unknown, Credentials>({
    mutationFn: async (credentials: Credentials) => {
      const response = await api.loginApi.login(credentials);
      return {
        token: response.data.token,
        user: response.data.user,
      } as AuthResponse;
    }
  });

  return loginMutation;
}
