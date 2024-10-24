import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/store";
import api from "../../utils/api";

export default function useFetchAllCompanies() {
    const token = useAuthStore((state) => state.token);
    return useQuery({
        queryKey: ['companies'],
        queryFn: () => api.fetchCompanies(token),
        enabled: !!token,
        retry: false
    });
}