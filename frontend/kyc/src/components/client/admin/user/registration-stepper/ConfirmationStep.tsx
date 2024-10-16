import { Paper, Center } from "@mantine/core";
import AuthCard from "../../../../ui/cards/AuthCard";
import { UseFormReturnType } from "@mantine/form";
import { useEffect } from "react";

interface ConfirmationStepProps {
    isRegistered: boolean;
    userType: string;
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

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ isRegistered, userType, form }) => {
    useEffect(() => {
        console.log(form.values);
    }, [form]);

    return (
        <Paper ml='xl' mr='xl' radius='md' style={{ position: 'relative' }}>
            <Center>
                <AuthCard
                    isRegistered={isRegistered}
                    userType={userType}
                    form={form}
                />
            </Center>
            <div style={{ height: '100px' }}></div>
        </Paper>
    );
};

export default ConfirmationStep;
