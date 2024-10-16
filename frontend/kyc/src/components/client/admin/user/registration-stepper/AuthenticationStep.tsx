import { TextInput, PasswordInput, SimpleGrid } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";


interface AuthenticationStepProps {
    form: UseFormReturnType<{
        employeeFullName: string;
        email: string;
        dateOfBirth: Date | null;
        roleId: string;
        phone: string;
        username: string;
        password: string;
        confirmPassword: string;
        companyUnitId: string;
    }>;
    usernameError: string | null;
}


const AuthenticationStep: React.FC<AuthenticationStepProps> = ({ form, usernameError }) => (
    <>
        <TextInput
            required
            label="Username"
            placeholder="username"
            {...form.getInputProps('username')}
            mt="md"
            style={{ fontFamily: 'Arial, sans-serif' }}
        />
        {usernameError && <div style={{ color: 'red' }}>{usernameError}</div>}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="sm" mb="xl">
            <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                {...form.getInputProps('password')}
                mt="md"
                style={{ fontFamily: 'Arial, sans-serif' }}
            />
            <PasswordInput
                required
                label="Confirm Password"
                placeholder="Confirm your password"
                {...form.getInputProps('confirmPassword')}
                mt="md"
                style={{ fontFamily: 'Arial, sans-serif' }}
            />
        </SimpleGrid>
        <div style={{ height: '200px' }}></div>
    </>
);

export default AuthenticationStep;
