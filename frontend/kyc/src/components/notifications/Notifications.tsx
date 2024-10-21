import {
    ActionIcon,
} from '@mantine/core';
import {
    IconBellFilled,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/store';



export function Notifications() {
    const navigate = useNavigate();
    const designation = useAuthStore((state) => state.user?.designation);
    let role;
    switch (designation) {
        case 'TSL':
            role = 'tsl';
            break;
        case 'Director':
            role = 'director';
            break;
        case 'Administrator':
            role = 'admin';
            break;
        case 'Environment Officer':
            role = 'env';
            break;
        case 'Manager':
            role = 'man';
            break;
        case 'Third Party':
            role = 'thp';
            break;
        default:
            role = 'user';
    }

    return (
        <ActionIcon variant="default" size={'lg'} onClick={() => navigate(`/${role}/notifications`)}>
            <IconBellFilled style={{color: 'var(--mantine-color-blue-7)'}} stroke={1.5} />
        </ActionIcon>
    );
}

export default Notifications;