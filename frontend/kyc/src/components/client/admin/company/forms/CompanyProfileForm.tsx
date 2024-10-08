import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';

     
        export default function CompanyProfileForm() {
            const form = useForm({
                initialValues: {
                    contactPerson: '',
                    mpcbId: '',
                    industryLink: '',
                    branch: 'Main Branch',
                    category: 'IT',
                    name: 'Techknowgreen Ltd.',
                    email: 'it@techknowgreen.com',
                    fax: '',
                    lastEnvironment: '',
                    workDay: '',
                    phoneNumber: '1234567890',
                    website: '',
                    workingHour: '',
                    yearEstablished: '',
                },
            });

            return (
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput label="Contact Person" {...form.getInputProps('contactPerson')} />
                    <TextInput label="MPCB ID" {...form.getInputProps('mpcbId')} />
                    <TextInput label="Industry Link" {...form.getInputProps('industryLink')} />
                    <TextInput label="Branch" {...form.getInputProps('branch')} />
                    <TextInput label="Category" {...form.getInputProps('category')} />
                    <TextInput label="Name" {...form.getInputProps('name')} />
                    <TextInput label="Email" {...form.getInputProps('email')} />
                    <TextInput label="Fax" {...form.getInputProps('fax')} />
                    <TextInput label="Last Environment" {...form.getInputProps('lastEnvironment')} />
                    <TextInput label="Work Day" {...form.getInputProps('workDay')} />
                    <TextInput label="Phone Number" {...form.getInputProps('phoneNumber')} />
                    <TextInput label="Website" {...form.getInputProps('website')} />
                    <TextInput label="Working Hour" {...form.getInputProps('workingHour')} />
                    <TextInput label="Year Established" {...form.getInputProps('yearEstablished')} />
                    <Group  mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            );
        }
    
