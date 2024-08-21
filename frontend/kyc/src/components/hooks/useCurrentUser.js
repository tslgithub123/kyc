import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';
import { useAuthStore } from '../../store/store';

export function useCurrentUser() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => api.fetchCurrentUser(token),
    enabled: !!token,
    retry: false
  });
}
