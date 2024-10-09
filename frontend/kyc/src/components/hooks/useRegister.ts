import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';
import { IUserRegistration, RegistrationResponse } from '../../utils/types';


export function useRegister(): UseMutationResult<RegistrationResponse, unknown, [IUserRegistration], unknown> {
  const registerUser = async (data: [IUserRegistration]): Promise<RegistrationResponse> => {
    const response = await axios.post('http://192.168.1.36:8080/api/auth/register', data);
    return response.data as RegistrationResponse;
};

  const registerMutation = useMutation<RegistrationResponse, unknown, [IUserRegistration]>({
    mutationFn: registerUser
});

  return registerMutation;
}