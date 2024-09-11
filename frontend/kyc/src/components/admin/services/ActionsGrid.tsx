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
} from '@mantine/core';
import {
  IconFile,
  IconMail,
  IconCalendar,
  IconCategory,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import Files from './actions/FilesAction';
import classes from './ActionsGrid.module.css';
import { useState } from 'react';
import CalendarAction from './actions/CalendarAction';
import EmailAction from './actions/EmailAction';

const mockdata = [
  { title: 'Files', icon: IconFile, color: 'violet' },
  { title: 'Email', icon: IconMail, color: 'indigo' },
  { title: 'Calendar', icon: IconCalendar, color: 'blue' },
];

export function ActionsGrid() {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [menuOpened, setMenuOpened] = useState(false);

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

  const view = (
    <Card className={classes.card}>
      <Group justify="space-between">
        <Text className={classes.title}>Services</Text>
      </Group>
      <SimpleGrid cols={3} mt="md">
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
          <ActionIcon variant="default" size={'lg'}>
            <IconCategory stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Box>
          <Menu.Dropdown>{view}</Menu.Dropdown>
        </Box>
      </Menu>
      <Modal opened={opened} onClose={close} centered>
        {modalContent === 'Files' && <Files />}
        {modalContent === 'Email' && <EmailAction/>}
        {modalContent === 'Calendar' && <CalendarAction />}
      </Modal>
    </Group>
  );
}

export default ActionsGrid;