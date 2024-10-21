import { TextInput, SimpleGrid, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../../../../store/store";

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

const GeneralStep: React.FC<GeneralStepProps> = ({ form }) => {
    const [companyUnits, setCompanyUnits] = useState<{ value: string; label: string }[]>([]);

    const companyProfileId = useAuthStore((state) => state.user?.companyUnit?.companyProfile?.id);

    

    useEffect(() => {
        axios.get(`http://localhost:8080/api/company-unit/company-profile/options/${companyProfileId}`)
            .then(response => {
                const units = response.data.map((unit: any) => ({
                    value: unit.companyUnitId,
                    label: unit.companyUnitName
                }));
                setCompanyUnits(units);
            })
            .catch(error => {
                console.error('Error fetching company units:', error);
            });

        console.log('Company profile ID:', companyProfileId);   
    }, [companyProfileId]);

    return (
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
                <Select
                required
                    label="Company Unit"
                    placeholder="Pick value"
                    data={companyUnits}
                    searchable
                    clearable
                    nothingFoundMessage="No units found..."
                    defaultValue={companyUnits.length > 0 ? companyUnits[0].value : undefined}
                    allowDeselect={false}
                    mt="md"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                />
                <div style={{ height: '200px' }}></div>
            </SimpleGrid>
        </>
    );
};

export default GeneralStep;
