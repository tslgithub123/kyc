import {
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    Group,
    useMantineTheme,
    ActionIcon,
    Menu,
    Box,
    Modal,
    Indicator,
} from '@mantine/core';
import {
    IconFile,
    IconMail,
    IconCalendar,
    IconBell,
    TablerIcon,
    IconBellFilled,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import classes from './Notifications.module.css';
import { useState, ReactNode } from 'react';

interface MockDataItem {
    title: string;
    icon: TablerIcon;
    color: string;
}

const mockdata: MockDataItem[] = [
    { title: 'Files', icon: IconFile, color: 'violet' },
    { title: 'Email', icon: IconMail, color: 'indigo' },
    { title: 'Calendar', icon: IconCalendar, color: 'blue' },
];

export function Notifications() {
    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);
    const [modalContent, setModalContent] = useState<string | null>(null);
    const [menuOpened, setMenuOpened] = useState<boolean>(false);

    const openAction = (action: string) => {
        setMenuOpened(false);
        switch (action) {
            case 'Files':
                setModalContent('Files');
                break;
            case 'Email':
                setModalContent('Email');
                break;
            case 'Calendar':
                setModalContent('Calendar');
                break;
            default:
                setModalContent(null);
        }
        open();
    };

    const items = mockdata.map((item) => (
        <UnstyledButton onClick={() => openAction(item.title)} p={'lg'} key={item.title} className={classes.item}>
            <item.icon color={theme.colors[item.color][6]} size="2rem" />
            <Text size="xs" mt={7}>
                {item.title}
            </Text>
        </UnstyledButton>
    ));

    const view: ReactNode = (
        <Card className={classes.card}>
            <Group justify="space-between">
                <Text className={classes.title}>Services</Text>
            </Group>
            <SimpleGrid cols={1} mt="md">
                {items}
            </SimpleGrid>
        </Card>
    );

    return (
        <Group>
            <Menu
                opened={menuOpened}
                onChange={setMenuOpened}
                withArrow
                arrowSize={20}
                shadow="lg"
                position="bottom"
                transitionProps={{ transition: 'pop' }}
                withinPortal
            >
                <Menu.Target>
                    <Indicator color='red'>
                        <ActionIcon variant="default" size={'lg'}>
                            <IconBellFilled style={{color: 'var(--mantine-color-blue-7)'}} stroke={1.5} />
                        </ActionIcon>
                    </Indicator>
                </Menu.Target>
                <Box>
                    <Menu.Dropdown>{view}</Menu.Dropdown>
                </Box>
            </Menu>
            <Modal opened={opened} onClose={close} centered>
                {modalContent === 'Files' && ''}
                {modalContent === 'Email' && <Text>Email Action Content</Text>}
                {modalContent === 'Calendar' && <Text>Calendar Action Content</Text>}
            </Modal>
        </Group>
    );
}

export default Notifications;