import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Text } from '@mantine/core';
import { IconTrash, IconTrashFilled } from '@tabler/icons-react';

interface PromptModalProps {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  disabled: boolean;
  exportButtonText: string;
  trueButtonText: string;
  onConfirm?: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({
  title,
  description,
  color,
  icon,
  disabled,
  exportButtonText,
  trueButtonText,
  onConfirm,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleConfirm = () => {
    console.log(color);
    if (onConfirm) onConfirm();
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        <Text justify-content="center" mb="md">
          {description}
        </Text>
        <Group align="center">
          <Button color={color} onClick={handleConfirm}>
            {trueButtonText}
          </Button>
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Modal>

      <Button
        mr={'sm'}
        style={{ width: '100%' }}
        disabled={disabled}
        color={color}
        leftSection={icon}
        onClick={open}
      >
        {exportButtonText}
      </Button>
    </>
  );
};

export default PromptModal;
