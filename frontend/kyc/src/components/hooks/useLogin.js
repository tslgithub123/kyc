import { useMutation } from '@tanstack/react-query';
import api from '../../utils/api';

export function useLogin() {
  const loginMutation = useMutation({
    mutationFn: api.loginApi.login,
    onSuccess: (data) => {
      const { token, role } = data.data;
      console.log('Login successful: ' + token);
    },
  });

  return loginMutation;
}
