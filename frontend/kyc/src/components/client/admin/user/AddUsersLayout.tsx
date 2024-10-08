import { ActionIcon, Box, Button, Card, Center, Container, CopyButton, Divider, Flex, Grid, Group, Modal, Paper, PasswordInput, rem, SimpleGrid, Space, Stepper, Table, Text, TextInput, ThemeIcon, Title, Tooltip, UnstyledButton } from "@mantine/core";
import { showNotification } from '@mantine/notifications';
import FancyButton from "../../../ui/FancyButton";
import { IconArrowLeft, IconArrowRight, IconCalendar, IconCheck, IconCopy, IconDownload, IconExclamationMark, IconMail, IconMailFilled, IconPassword, IconPhone, IconPhoneFilled, IconUser, IconUserCheck, IconUserEdit, IconUserFilled, IconUserPlus, IconUserShield } from "@tabler/icons-react";
import { useState } from "react";
import classes from './ModalStyles.module.css';
import global from "./../../../ui/Global.module.css";
import AddUserForm from "./AddUserForm";
import { useForm } from "@mantine/form";
import { DateInput, DatePicker } from "@mantine/dates";
import * as XLSX from 'xlsx';

export default function AddUser() {
    const [active, setActive] = useState(0);

    const form = useForm({
        initialValues: {
            fullName: 'Dhananjay Jagannath Yelwande',
            email: 'example@example.com',
            dateOfBirth: null as Date | null,
            phoneNumber: '1234567895',
            username: 'dhananjay',
            password: '12345',
            confirmPassword: '12345',
        },

        // validate: {
        //     fullName: (value) => (value.trim().length < 2 ? 'Full name must have at least 2 characters' : null),
        //     email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        //     dateOfBirth: (value) => (value ? null : 'Date of birth is required'),
        //     phoneNumber: (value) => (/^\d{10}$/.test(value) ? null : 'Invalid phone number'),
        //     username: (value) => (value.trim().length < 3 ? 'Username must have at least 3 characters' : null),
        //     password: (value) =>
        //         value.length < 6 ? 'Password must be at least 6 characters' : null,
        //     confirmPassword: (value, values) =>
        //         value !== values.password ? 'Passwords do not match' : null,
        // },
    });

    const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const handleNext = () => {
        if (active === 0) {
            const isValid = form.validateField('fullName').hasError
                || form.validateField('email').hasError
                || form.validateField('dateOfBirth').hasError
                || form.validateField('phoneNumber').hasError;

            if (!isValid) {
                nextStep();
            }
        } else if (active === 1) {
            const isValid = form.validateField('username').hasError
                || form.validateField('password').hasError
                || form.validateField('confirmPassword').hasError;

            if (!isValid) {
                nextStep();
            }
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const validation = form.validate();
        if (validation.hasErrors) {
            return;
        }
        console.log('Form Data:', form.values);
    };

    const [opened, setOpened] = useState(false);
    const [userType, setUserType] = useState('');

    function openModal(type: string) {
        setUserType(type);
        setOpened(true);
    }

    function closeModal() {
        setOpened(false);
        setUserType('');
        setActive(0);
    }

    return (
        <>
            <Paper withBorder radius="sm">
                <Grid p="sm" pl='lg' bg={'gray.1'} justify="space-between" align="center">
                    <Grid.Col span={6}>
                        <Title className={global.title} order={3} c="gray.7" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Add User
                        </Title>
                    </Grid.Col>
                </Grid>
                <Divider />

                <Card>
                    <Grid >
                        <Grid.Col pt={0} span={4}>
                            <Center>
                                <FancyButton onClick={() => openModal('env')} color="green" icon={<IconUserEdit />} title={"Environment Officer"} />
                            </Center>
                        </Grid.Col>
                        <Grid.Col pt={0} span={4}>
                            <Center>
                                <FancyButton onClick={() => openModal('man')} color="yellow" icon={<IconUserShield />} title={"Management"} />
                            </Center>
                        </Grid.Col>
                        <Grid.Col pt={0} span={4}>
                            <Center>
                                <FancyButton onClick={() => openModal('thp')} color="violet" icon={<IconUserCheck />} title={"Third Party"} />
                            </Center>
                        </Grid.Col>
                    </Grid>
                </Card>

                <Card>
                    <Grid >
                        <Grid.Col pt={0} span={4}>
                            <Center>
                                <div className={classes.item}>
                                    <ThemeIcon c={'lime'} variant="light" size={40} radius={40}>
                                        <IconExclamationMark
                                            style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                                    </ThemeIcon>
                                    <Text mt={'sm'} size="sm" c="dimmed" lh={1.6} style={{ fontFamily: 'Arial, sans-serif' }}>
                                        <Group>
                                            <ul>
                                                <li>Fills daily input data.</li>
                                                <li>Monitors non-compliance by the Industry.</li>
                                                <li>Manages Consent to Establish/Operate.</li>
                                                <li>Handles Hazardous waste data.</li>
                                            </ul>
                                        </Group>
                                    </Text>
                                </div>
                            </Center>
                        </Grid.Col>

                        <Grid.Col pt={0} span={4}>
                            <Center>
                                <div className={classes.item}>
                                    <ThemeIcon c={'yellow'} variant="light" size={40} radius={40}>
                                        <IconExclamationMark
                                            style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                                    </ThemeIcon>

                                    <Text mt={'sm'} size="sm" c="dimmed" lh={1.6} style={{ fontFamily: 'Arial, sans-serif' }}>
                                        <Group>
                                            <ul>
                                                <li>Supervising work.</li>
                                                <li>Accessing outputs and statistics.</li>
                                                <li>Reviewing records and information.</li>
                                            </ul>
                                        </Group>
                                    </Text>
                                </div>
                            </Center>
                        </Grid.Col>

                        <Grid.Col pt={0} span={4}>
                            <Center>
                                <div className={classes.item}>
                                    <ThemeIcon c={'grape'} variant="light" size={40} radius={40}>
                                        <IconExclamationMark
                                            style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                                    </ThemeIcon>

                                    <Text mt={'sm'} size="sm" c="dimmed" lh={1.6} style={{ fontFamily: 'Arial, sans-serif' }}>
                                        <Group>
                                            <ul>
                                                <li>Uploads Ambient Air and Water Monitoring details.</li>
                                            </ul>
                                        </Group>
                                    </Text>
                                </div>
                            </Center>
                        </Grid.Col>
                    </Grid>
                </Card>
            </Paper>

            <Modal
                styles={{
                    body: {
                        height: '500px',
                        overflowY: 'auto'
                    }
                }}
                classNames={{ title: classes.title, header: `${userType === 'env' ? classes.envHeader : userType === 'man' ? classes.manHeader : userType === 'thp' ? classes.thpHeader : ''}` }}
                title={
                    userType === 'env' ? "Create Environment Officer" :
                        userType === 'man' ? "Create Management User" :
                            userType === 'thp' ? "Create Third Party User" :
                                ""
                }

                opened={opened}
                radius={'sm'}
                onClose={closeModal}
                size="1000px"
            >
                <Container my={40}>
                    <form id="form" onSubmit={handleSubmit}>
                        <Stepper color={userType === 'man' ? 'yellow' : userType === 'env' ? 'green' : userType === 'thp' ? 'grape' : 'green'} active={active} onStepClick={setActive} allowNextStepsSelect={true}>
                            <Stepper.Step c={active == 0 ? userType === 'man' ? 'yellow' : userType === 'env' ? 'green' : userType === 'thp' ? 'grape' : 'green' : ''} label="General" description="Employee details">
                                <TextInput
                                    required
                                    label="Full Name"
                                    placeholder="John Doe"
                                    {...form.getInputProps('fullName')}
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
                                        {...form.getInputProps('phoneNumber')}
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
                                </SimpleGrid>

                                <div style={{ height: '100px' }}></div>
                            </Stepper.Step>

                            <Stepper.Step c={active == 1 ? userType === 'man' ? 'yellow' : userType === 'env' ? 'green' : userType === 'thp' ? 'grape' : 'green' : ''} label="Authentication" description="Create credentials">
                                <TextInput
                                    required
                                    label="Username"
                                    placeholder="username"
                                    {...form.getInputProps('username')}
                                    mt="md"
                                    style={{ fontFamily: 'Arial, sans-serif' }}
                                />
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
                            </Stepper.Step>

                            <Stepper.Step c={active == 2 ? userType === 'man' ? 'yellow' : userType === 'env' ? 'green' : userType === 'thp' ? 'grape' : 'green' : ''} label="Confirmation" description="Verify">

                            <Paper ml='xl' mr='xl' radius='md' style={{ position: 'relative' }}>
    {/* <Button
    mt= '16px'
        style={{
            position: 'absolute',
            width: 'auto',
            right: '0px',
            zIndex: 1
        }}

        size="xs"
        color='gray'
        variant="default"
        onClick={() => {

            const worksheet = XLSX.utils.json_to_sheet([form.values]);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");

            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

            const downloadAnchorNode = document.createElement('a');
            const url = URL.createObjectURL(data);
            downloadAnchorNode.href = url;
            downloadAnchorNode.download = 'user_data.xlsx';
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            URL.revokeObjectURL(url);
            downloadAnchorNode.remove();
           
        }}
    >
        Download <Space w='xs'></Space>
        <IconDownload style={{ width: rem(16) }} />
    </Button>
    <Button
    mt= '80px'
        style={{
            position: 'absolute',
            width: 'auto',
            right: '0px',
            zIndex: 1
        }}

        size="xs"
        color='gray'
        variant="default"
        onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(form.values, null, 2));
            showNotification({
                icon: <IconCheck />,
                color: 'green',
                title: 'Copied!',
                message: 'User infromation copied to clipboard',
                mt: 'md',
                position: 'top-right',
            });
           
        }}
    >
        Copy <Space w='xs'></Space>
        <IconCopy style={{ width: rem(16) }} />
    </Button> */}
    <Center>
                                        <SimpleGrid mt='md' bg={`var(--mantine-color-${userType === 'man' ? 'yellow' : userType === 'env' ? 'green' : userType === 'thp' ? 'grape' : 'gray'}-0)`} style={{border: `1px solid var(--mantine-color-${userType === 'man' ? 'yellow' : userType === 'env' ? 'green' : userType === 'thp' ? 'grape' : 'gray'}-4)`, borderRadius: '4px'}} p='md' cols={2} spacing="sm">

                                            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                                                <ActionIcon c='gray.7' p='sm' variant="transparent" w='auto'> <IconUser style={{ margin: '12px' }} /> Name: </ActionIcon>
                                            </Text>
                                            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }} c='dimmed'>
                                                <ActionIcon c='gray.7' p='sm' variant="light" w='auto'> {form.values.fullName} </ActionIcon>
                                            </Text>

                                            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                                                <ActionIcon c='gray.7' p='sm' variant="transparent" w='auto'> <IconMail style={{ margin: '12px' }} /> Email: </ActionIcon>
                                            </Text>
                                            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }} c='dimmed'>
                                                <ActionIcon c='gray.7' p='sm' variant="light" w='auto'>{form.values.email}</ActionIcon>
                                            </Text>

                                            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                                                <ActionIcon c='gray.7' p='sm' variant="transparent" w='auto'> <IconPhone style={{ margin: '12px' }} /> Phone Number: </ActionIcon>
                                            </Text>
                                            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }} c='dimmed'>
                                                <ActionIcon c='gray.7' p='sm' variant="light" w='auto'>{form.values.phoneNumber}</ActionIcon>
                                            </Text>

                                            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                                                <ActionIcon c='gray.7' p='sm' variant="transparent" w='auto'> <IconCalendar style={{ margin: '12px' }} /> Date of Birth: </ActionIcon>
                                            </Text>
                                            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }} c='dimmed'>
                                                <ActionIcon c='gray.7' p='sm' variant="light" w='auto'>{form.values.dateOfBirth?.toLocaleDateString()}</ActionIcon>
                                            </Text>
                                            <Divider color="gray.5" my="sm" variant="dashed"/>
                                            <Divider color="gray.5" my="sm" variant="dashed"/>

                                            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                                                <ActionIcon c='gray.7' p='sm' variant="transparent" w='auto'> <IconUserCheck style={{ margin: '12px' }} /> Username: </ActionIcon>
                                            </Text>
                                            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }} c='dimmed'>
                                                <ActionIcon c='gray.7' p='sm' variant="light" w='auto'>{form.values.username}</ActionIcon>
                                            </Text>

                                            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                                                <ActionIcon c='gray.7' p='sm' variant="transparent" w='auto'> <IconPassword style={{ margin: '12px' }} /> Password: </ActionIcon>
                                            </Text>
                                            <Text size="xs" style={{ fontFamily: 'Arial, sans-serif' }} c='dimmed'>
                                                <ActionIcon c='gray.7' p='sm' variant="light" w='auto'>{form.values.password}</ActionIcon>
                                            </Text>
                                        </SimpleGrid>



                                    </Center>

                                </Paper>
                                <Center>
                                
     </Center>
                                <div style={{ height: '400px' }}></div>
                            </Stepper.Step>
                        </Stepper></form>
                    <Group justify="flex-end" mt="xl" style={{ position: 'sticky', bottom: 0, width: '100%' }}>
                        <Button variant="default" onClick={prevStep} disabled={active === 0}>
                            <IconArrowLeft />
                            <Text style={{paddingLeft: '8px'}}>Back</Text>
                            
                        </Button>
                        {active < 2 ? (
                            <Button onClick={handleNext}><Text style={{paddingRight: '8px'}}>Next</Text>
                            <IconArrowRight/></Button>
                        ) : (
                            <Button type="submit" form="form"><Text style={{paddingRight: '8px'}}>Create</Text><IconUserPlus/></Button>
                        )}
                    </Group>
                </Container>
            </Modal>
        </>
    );
}
