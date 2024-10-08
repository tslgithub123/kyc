import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store/store';
import api from '../../utils/api';


export function useCurrentUser() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => {
      if (token) {
        return api.fetchCurrentUser(token);
      }
      return Promise.reject(new Error('No token available'));
    },
    enabled: !!token,
    retry: false
  });
}
