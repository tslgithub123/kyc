import { Button, Center, Divider, FileInput, Grid, Group, NativeSelect, NumberInput, Paper, Radio, rem, SimpleGrid, TextInput, Title, Tooltip } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import { IconPaperclip } from "@tabler/icons-react";

export default function ClearanceForm() {
    const [isApplicable, setIsApplicable] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState('');
    const [customUnit, setCustomUnit] = useState('');

    const unitOptions = [
        { value: 'hector', label: 'Hector' },
        { value: 'sqMeters', label: 'Sq. Meters' },
        { value: 'nos', label: 'Nos' },
        { value: 'unit', label: 'Unit' },
        { value: 'other', label: 'Other' }
    ];

    const form = useForm({
        initialValues: {
            existingEcNumber: '',
            issueDate: '',
            expiryDate: '',
            ecGrantedFrom: '',
            generalConditionApplicability: '',
            categoryOfProject: '',
            totalPlotArea: '',
            builtupArea: '',
            greenBeltArea: '',
            totalNoOfPlants: '',
            productName: '',
            productQuantity: '',
            productUnit: '',
            byProductName: '',
            byProductQuantity: '',
            byProductUnit: ''
        },
    });

    const unitSelect = (
        <NativeSelect
            data={unitOptions}
            value={selectedUnit}
            onChange={(event) => setSelectedUnit(event.currentTarget.value)}
            rightSectionWidth={28}
            styles={{ input: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, width: rem(88) } }}
            mr={'xl'}
        />
    );

    const renderProductInputs = (nameKey: string, quantityKey: string, unitKey: string, label: string) => (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="sm" mb="xl">
            <TextInput
                m='md'
                withAsterisk
                label={label + " Name"}
                placeholder="Name"
                {...form.getInputProps(nameKey)}
            />
            <NumberInput
                m='md'
                withAsterisk
                label={label + " Quantity"}
                placeholder="0"
                rightSection={unitSelect}
                {...form.getInputProps(quantityKey)}
            />
            {selectedUnit === 'other' && (
                <TextInput
                    m='md'
                    withAsterisk
                    label="Custom Unit"
                    placeholder="Enter unit"
                    value={customUnit}
                    onChange={(event) => setCustomUnit(event.currentTarget.value)}
                />
            )}
        </SimpleGrid>
    );

    return (
        <Paper w={'100%'} withBorder radius="sm">
            <Grid p="sm" bg="gray.1" justify="space-between" align="center">
                <Grid.Col span={6}>
                    <Title order={3} c="gray.7">
                        Add Environmental Clearance
                    </Title>
                </Grid.Col>
            </Grid>
            <Divider />
            <Paper p="sm" radius="lg">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    
                    <Radio.Group
                        label="Is Applicable?"
                        name="applicability"
                        value={isApplicable ? "1" : "0"}
                        onChange={(value) => setIsApplicable(value === "1")}
                        withAsterisk
                        ml={'md'}
                    >
                        <Group mt="xs">
                            <Radio value="1" label="Yes" />
                            <Radio value="0" label="No" defaultChecked />
                        </Group>
                    </Radio.Group>
                    
                    {isApplicable && (
                        <>
                            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm" >
                                <TextInput
                                    m='md'
                                    withAsterisk
                                    label="Existing Env. Clearance Number"
                                    placeholder="XYZ123"
                                    {...form.getInputProps('existingEcNumber')}
                                />
                                <FileInput
                                    m="md"
                                    leftSection={<IconPaperclip style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                                    label="Upload EC Document"
                                    placeholder="pdf"
                                />
                            </SimpleGrid>
                            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm" mb="xl">
                                <Radio.Group
                                    label="EC Granted From"
                                    name="ecGrantedFrom"
                                    {...form.getInputProps('ecGrantedFrom')}
                                    withAsterisk
                                    m="md"
                                >
                                    <Group mt="xs">
                                        <Radio value="SEIAA" label="S.E.I.A.A." />
                                        <Radio value="MOEF" label="M.O.E.F." />
                                    </Group>
                                </Radio.Group>

                                <Radio.Group
                                    name="generalConditionApplicability"
                                    label="General Condition Applicability"
                                    withAsterisk
                                    {...form.getInputProps('generalConditionApplicability')}
                                    m="md"
                                >
                                    <Group mt="xs">
                                        <Radio value="yes" label="Yes" />
                                        <Radio value="no" label="No" defaultChecked />
                                    </Group>
                                </Radio.Group>

                                <Radio.Group
                                    name="categoryOfProject"
                                    label="Category of Project"
                                    withAsterisk
                                    {...form.getInputProps('categoryOfProject')}
                                    m="md"
                                >
                                    <Group mt="xs">
                                        <Radio value="A" label="A" />
                                        <Radio value="B1" label="B1" />
                                        <Radio value="B2" label="B2" />
                                    </Group>
                                </Radio.Group></SimpleGrid>
                            {/* <SimpleGrid cols={{ base: 1, sm: 4 }} spacing="sm" mb="md">
                            <FileInput
                                m="md"
                                leftSection={<IconPaperclip style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                                label="Upload EC Document"
                                placeholder="pdf"
                            />
</SimpleGrid> */}
                            <Divider label="Validity" />
                            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" mb="xl">
                                <DateInput
                                    m='md'
                                    label="Issued Date"
                                    placeholder="YYYY-MM-DD"
                                    {...form.getInputProps('issueDate')}
                                />
                                <DateInput
                                    m='md'
                                    label="Expiry Date"
                                    placeholder="YYYY-MM-DD"
                                    {...form.getInputProps('expiryDate')}
                                />
                            </SimpleGrid>

                            <Divider label="Area" />
                            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="sm" mb="xl">
                                <NumberInput
                                    m='md'
                                    withAsterisk
                                    label="Total plot area"
                                    placeholder="0"
                                    rightSection={unitSelect}
                                    {...form.getInputProps('totalPlotArea')}
                                />
                                <NumberInput
                                    m='md'
                                    withAsterisk
                                    label="Builtup area"
                                    placeholder="0"
                                    rightSection={unitSelect}
                                    {...form.getInputProps('builtupArea')}
                                />
                                <NumberInput
                                    m='md'
                                    withAsterisk
                                    label="Green belt area"
                                    placeholder="0"
                                    rightSection={unitSelect}
                                    {...form.getInputProps('greenBeltArea')}
                                />
                                <NumberInput
                                    m='md'
                                    withAsterisk
                                    label="Total no. of plants"
                                    placeholder="0"
                                    rightSection={unitSelect}
                                    {...form.getInputProps('totalNoOfPlants')}
                                />
                            </SimpleGrid>

                            <Divider label="Products" />
                            {renderProductInputs('productName', 'productQuantity', 'productUnit', 'Product')}

                            <Divider label="By Products" />
                            {renderProductInputs('byProductName', 'byProductQuantity', 'byProductUnit', 'By Product')}

                            <Center>
                                <Button w="25%" type="submit">Save</Button>
                            </Center>
                        </>
                    )}
                </form>
            </Paper>
        </Paper>
    );
}
