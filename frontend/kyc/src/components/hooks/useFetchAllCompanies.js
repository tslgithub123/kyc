export default function useFetchAllCompanies() {
    const token = useAuthStore((state) => state.token);
    return useQuery({
        queryKey: ['companies'],
        queryFn: () => api.fetchCompanies(token),
        enabled: !!token,
        retry: false
    });
}