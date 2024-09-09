import { useDisclosure } from '@mantine/hooks';
import { Calendar } from '@mantine/dates';
import { Group } from '@mantine/core';
export default function CalendarAction({ isOpen }) {
    return (
        <>
            <Group style={{justifyContent: 'center'}}>
                <Calendar/>
            </Group>
        </>
    );
}
