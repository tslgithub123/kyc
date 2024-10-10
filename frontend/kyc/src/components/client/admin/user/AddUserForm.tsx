import { useForm } from '@mantine/form';
import { TextInput, Button, Container, Paper, Group, Center, Modal } from '@mantine/core';
import { useState } from 'react';
import classes from './ModalStyles.module.css';
import RegistrationStepper from './RegistrationStepper';

interface AddUserFormProps {
  userType: string;
}

export default function AddUserForm({ userType }: AddUserFormProps) {
  
  return (
    <Container my={40}>
      <RegistrationStepper/>
    </Container>)
}