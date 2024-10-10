import { Calendar } from '@mantine/dates';
import { Group } from '@mantine/core';
export default function CalendarAction(): React.ReactNode {
    return (
        <>
            <Group style={{justifyContent: 'center'}}>
                <Calendar/>
            </Group>
        </>
    );
}
