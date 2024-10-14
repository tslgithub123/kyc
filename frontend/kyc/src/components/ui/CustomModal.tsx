import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Text } from '@mantine/core';
import classes from '../client/admin/user/ModalStyles.module.css';
interface PromptModalProps {
    title: string;
    userType: string;
  icon: React.ReactNode;
  showComponent: React.ReactNode;
  disabled: boolean;
  exportButtonText: string;
  size?: string;
  disableExportButton?: boolean;
  onConfirm?: () => void;
}

const CustomModal: React.FC<PromptModalProps> = ({
    userType,
    title,
  icon,
  showComponent,
  disabled,
  exportButtonText,
  size,
  disableExportButton,
  onConfirm,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    close();
  };


  return (
    <>
      <Modal styles={{
                    body: {
                        height: '500px',
                        padding: '0',
                    }
                }}
                classNames={{ title: classes.title, header: `${userType === 'Environment Officer' ? classes.envHeader : userType === 'Manager' ? classes.manHeader : userType === 'Third Party' ? classes.thpHeader : userType === 'Director' ? classes.dirHeader : userType === 'TSL' ? classes.tslHeader : userType === 'Administrator' ? classes.adminHeader : ''}` }}
                title={title}

                opened={opened}
                radius={'sm'}
                onClose={close}
                size={size}>
        {showComponent}
        
      </Modal>

      <Button
        mr={'sm'}
        style={{ minWidth: '140px' }}
        leftSection={icon}
        onClick={open}
        disabled={disabled}
      >
        {exportButtonText}
      </Button>
    </>
  );
};

export default CustomModal;
