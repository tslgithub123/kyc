import { TextInput, SimpleGrid } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";


interface GeneralStepProps {
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
}


const GeneralStep: React.FC<GeneralStepProps> = ({ form }) => (
    <>
        <TextInput
            required
            label="Full Name"
            placeholder="John Doe"
            {...form.getInputProps('employeeFullName')}
            mt="md"
            style={{ fontFamily: 'Arial, sans-serif' }}
        />
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="sm" mb="xl">
            <TextInput
                required
                label="Email"
                placeholder="john.doe@example.com"
                {...form.getInputProps('email')}
                mt="md"
                style={{ fontFamily: 'Arial, sans-serif' }}
            />
            <TextInput
                required
                label="Phone Number"
                placeholder="1234567890"
                {...form.getInputProps('phone')}
                mt="md"
                style={{ fontFamily: 'Arial, sans-serif' }}
            />
            <DateInput
                required
                label="Date of Birth"
                placeholder="Date input"
                {...form.getInputProps('dateOfBirth')}
                mt="md"
                style={{ fontFamily: 'Arial, sans-serif' }}
            />
            <div style={{height: '200px'}}></div>
        </SimpleGrid>
    </>
);

export default GeneralStep;
