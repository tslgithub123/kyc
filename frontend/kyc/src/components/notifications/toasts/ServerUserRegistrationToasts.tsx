import React from 'react';
import { notifications } from '@mantine/notifications';
import { IconExclamationMark, IconCheck } from '@tabler/icons-react';


export interface UserResult {
    email: string;
    status: "SUCCESS" | "ALREADY_EXISTS" | "INVALID_PASSWORD" | "EMAIL_FAILURE" | "EMPTY_FIELDS" | "FAILURE";
    message?: string;
}


interface UserRegistrationToastsProps {
    response: {
        results: UserResult[];
        overallStatus: string;
    };
    userType: string;
    setIsRegistered: (isRegistered: boolean) => void;
}

const UserRegistrationToasts: React.FC<UserRegistrationToastsProps> = ({ response, userType, setIsRegistered }) => {
    const { results, overallStatus } = response;

    if (overallStatus === 'SUCCESS') {
        console.log('All users registered successfully');
    }

    results.forEach((result: UserResult) => {
        console.log('here is the result status:', result.status);
        switch (result.status) {
            case 'EMPTY_FIELDS':
                console.error(`Empty fields for ${result.email}: ${result.message}`);
                notifications.show({
                    icon: <IconExclamationMark />,
                    color: 'red',
                    bg: 'yellow.1',
                    title: 'Empty fields',
                    message: `Input the required information`,
                    mt: 'md',
                    position: 'top-center',
                });
                break;
            case 'SUCCESS':
                console.log(`User ${result.email} registered successfully`);
                setIsRegistered(true);
                notifications.show({
                    icon: <IconCheck />,
                    color: 'green',
                    bg: userType === "env" ? 'green.1' : userType === 'man' ? 'yellow.1' : userType === 'thp' ? 'grape.1' : 'gray.1',
                    title: 'User created',
                    message: `User ${result.email} registered successfully`,
                    mt: 'md',
                    position: 'top-center',
                });
                break;
            case 'ALREADY_EXISTS':
                console.warn(`User ${result.email} already exists`);
                notifications.show({
                    icon: <IconExclamationMark />,
                    color: 'red',
                    bg: userType === "env" ? 'green.1' : userType === 'man' ? 'yellow.1' : userType === 'thp' ? 'grape.1' : 'gray.1',
                    title: 'User already exists',
                    message: `User ${result.email} already exists`,
                    mt: 'md',
                    position: 'top-center',
                });
                break;
            case 'INVALID_PASSWORD':
                console.error(`Invalid password for ${result.email}: ${result.message}`);
                notifications.show({
                    icon: <IconExclamationMark />,
                    color: 'red',
                    bg: 'yellow.1',
                    title: 'Invalid password',
                    message: `Invalid password for ${result.email}`,
                    mt: 'md',
                    position: 'top-center',
                });
                break;
            case 'EMAIL_FAILURE':
                console.error(`Failed to send confirmation email to ${result.email}: ${result.message}`);
                notifications.show({
                    icon: <IconExclamationMark />,
                    color: 'red',
                    bg: 'yellow.1',
                    title: 'Email failure',
                    message: `Failed to send confirmation email to ${result.email}`,
                    mt: 'md',
                    position: 'top-center',
                });
                break;
            case 'FAILURE':
                console.error(`An unexpected error occurred for ${result.email}: ${result.message}`);
                notifications.show({
                    icon: <IconExclamationMark />,
                    color: 'red',
                    bg: 'yellow.1',
                    title: 'Registration failure',
                    message: `An unexpected error occurred for ${result.email}`,
                    mt: 'md',
                    position: 'top-center',
                });
                break;
            default:
                console.error(`Unknown status for ${result.email}: ${result.message}`);
                notifications.show({
                    icon: <IconExclamationMark />,
                    color: 'red',
                    bg: 'yellow.1',
                    title: 'Unknown status',
                    message: `Unknown status for ${result.email}`,
                    mt: 'md',
                    position: 'top-center',
                });
                break;
        }
    });

    return <></>;
};

export default UserRegistrationToasts;