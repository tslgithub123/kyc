import React, { useState } from 'react';
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
import { IconCategory } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import classes from './ServicesGrid.module.css';

interface ActionItem {
  title: string;
  icon: React.ElementType;
  color: string;
  component: React.ReactNode;
}

interface ActionsGridProps {
  data: ActionItem[];
}

export default function ServicesGrid({ data = [] }: ActionsGridProps) {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [menuOpened, setMenuOpened] = useState(false);

  const openAction = (action: string) => {
    setMenuOpened(false);
    const selectedAction = data.find(item => item.title === action);
    setModalContent(selectedAction ? selectedAction.component : null);
    open();
  };

  const items = data.map((item) => (
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
        {modalContent}
      </Modal>
    </Group>
  );
}
