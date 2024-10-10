import { Button, Card, Center, Container, Divider, Grid, Group, Modal, Paper, PasswordInput, rem, SimpleGrid, Stepper, Text, TextInput, ThemeIcon, Title } from "@mantine/core";
import FancyButton from "../../../ui/FancyButton";
import { IconArrowLeft, IconArrowRight, IconExclamationMark, IconUserCheck, IconUserEdit, IconUserPlus, IconUserShield, IconCheck, IconFileExcel, IconImageInPicture } from "@tabler/icons-react";
import { useState } from "react";
import './userStepper.css';
import classes from './ModalStyles.module.css';
import global from "./../../../ui/Global.module.css";
import { DateInput } from "@mantine/dates";
import { useRegister } from "../../../hooks/useRegister";
import { RegistrationResponse } from "../../../../utils/types";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import AuthCard from "../../../ui/cards/AuthCard";
import DownloadExcelButton from "../../../ui/buttons/DownloadExcelButton";
import CaptureButton from "../../../ui/buttons/CaptureScreenshotButton";
import api from "../../../../utils/api";
import UserRegistrationToasts from "../../../notifications/toasts/UserRegistrationToasts";
import { getUserTypeColor } from "../../../../utils/colorUtils";
import GeneralStep from "./registration-stepper/GeneralStep";
import AuthenticationStep from "./registration-stepper/AuthenticationStep";
import ConfirmationStep from "./registration-stepper/ConfirmationStep";
import FormNavigationButtons from "./FormNavigationButtons";

export default function AddUser() {
    const [active, setActive] = useState(0);
    const [isRegistered, setIsRegistered] = useState(false);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    

    const form = useForm({
        initialValues: {
            employeeFullName: 'Dhananjay Yelwande',
            email: 'yelwandedhananjay@gmail.com',
            dateOfBirth: null as Date | null,
            roleId: '1',
            phone: '9685741235',
            username: 'dhananjay1',
            password: 'dhananjay1',
            confirmPassword: 'dhananjay1',
            companyUnitId: '32b33b0f-16ce-4fcc-abed-24e7c8c5eace'
        },

        validate: {
            employeeFullName: (value) => (value.trim().length < 2 ? 'Full name must have at least 2 characters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            dateOfBirth: (value) => (value ? null : 'Date of birth is required'),
            phone: (value) => (/^\d{10}$/.test(value) ? null : 'Invalid phone number'),
            username: (value) => (value.trim().length < 3 ? 'Username must have at least 3 characters' : null),
            password: (value) =>
                value.length < 6 ? 'Password must be at least 6 characters' : null,
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords do not match' : null,
        },
    });

    const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const checkUsername = async (username: string) => {
        return api.checkUsernameExists(username);
    }

    const handleNext = async () => {
        if (active === 0) {
            const isValid = form.validateField('employeeFullName').hasError
                || form.validateField('email').hasError
                || form.validateField('dateOfBirth').hasError
                || form.validateField('phone').hasError;

            if (!isValid) {
                nextStep();
            }
        } else if (active === 1) {
            const isValid = form.validateField('username').hasError
                || form.validateField('password').hasError
                || form.validateField('confirmPassword').hasError;

            if (!isValid) {
                const username = form.values.username;
                const isUnAvailable = await checkUsername(username);

                if (isUnAvailable) {
                    setUsernameError('Username is already taken');
                } else {
                    setUsernameError(null);
                    nextStep();
                }
            }
        }
    };


    const registerMutation = useRegister();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const validation = form.validate();
        if (validation.hasErrors) {
            notifications.show({
                icon: <IconExclamationMark />,
                color: 'red',
                bg: userType == "env" ? 'green.1' : userType == 'man' ? 'yellow.1' : userType == 'thp' ? 'grape.1' : 'gray.1',
                title: 'Validation Error',
                message: 'Please correct the errors in the form',
                mt: 'md',
                position: 'top-center',
            });
            console.error('Validation errors:', validation.errors);
            return;
        }

        const registrationResponse: RegistrationResponse = await registerMutation.mutateAsync([form.values]);
        UserRegistrationToasts({
            response: registrationResponse,
            userType,
            setIsRegistered,
        });
    };

    const [opened, setOpened] = useState(false);
    const [userType, setUserType] = useState('');

    function openModal(type: string) {
        setUserType(type);
        setOpened(true);
    }

    function closeModal() {
        setIsRegistered(false);
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
                        padding: '0',
                    }
                }}
                classNames={{ title: classes.title, header: `${userType === 'env' ? classes.envHeader : userType === 'man' ? classes.manHeader : userType === 'thp' ? classes.thpHeader : ''}` }}
                title={
                    userType === 'env' ? "Environment Officer" :
                        userType === 'man' ? "Management" :
                            userType === 'thp' ? "Third Party" :
                                ""
                }

                opened={opened}
                radius={'sm'}
                onClose={closeModal}
                size="1000px"
            >
                <Container my={40}>
                    <Stepper className={isRegistered ? 'user-stepper' : ''} color={getUserTypeColor(userType)} active={active} onStepClick={setActive} allowNextStepsSelect={true}>
                        <Stepper.Step c={getUserTypeColor(userType)} label="General" description="Employee details">
                            <GeneralStep form={form} />
                        </Stepper.Step>
                        <Stepper.Step c={active == 1 ? getUserTypeColor(userType) : ''} label="Authentication" description="Create credentials">
                            <AuthenticationStep form={form} usernameError={usernameError} />
                        </Stepper.Step>
                        <Stepper.Step c={active == 2 ? getUserTypeColor(userType) : ''} label="Confirmation" description="Verify">
                            <ConfirmationStep isRegistered={isRegistered} userType={userType} form={form} />
                        </Stepper.Step>
                    </Stepper>

                </Container>
                <div style={{ backgroundColor: getUserTypeColor(userType, '2', true), height: '56px', width: 'auto', position: 'sticky', bottom: 0 }}>
                <FormNavigationButtons
        active={active}
        setActive={setActive}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
        prevStep={prevStep}
        isRegistered={isRegistered}
        userType={userType}
        form={form}
    />
                </div>
            </Modal>
        </>
    );
}
