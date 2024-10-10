// RegistrationStepper.tsx
import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';

export default function RegistrationStepper() {
  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      dateOfBirth: null as Date | null,
      phoneNumber: '',
      username: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      fullName: (value) => (value.trim().length < 2 ? 'Full name must have at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      dateOfBirth: (value) => (value ? null : 'Date of birth is required'),
      phoneNumber: (value) => (/^\d{10}$/.test(value) ? null : 'Invalid phone number'),
      username: (value) => (value.trim().length < 3 ? 'Username must have at least 3 characters' : null),
      password: (value) =>
        value.length < 6 ? 'Password must be at least 6 characters' : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleNext = () => {
    // Validate current step fields before proceeding
    // const stepValidations = [
    //   () => form.validateField('fullName') || form.validateField('email') || form.validateField('dateOfBirth') || form.validateField('phoneNumber'),
    //   () => form.validateField('username') || form.validateField('password') || form.validateField('confirmPassword'),
    // ];
    nextStep();
    if (active < 2) {
    //   const validations = stepValidations[active]();
      if (form.isValid()) {
        nextStep();
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }
    console.log('Form Data:', form.values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stepper color='green.4' active={active} onStepClick={setActive} allowNextStepsSelect={true}>
        <Stepper.Step label="General" description="Employee details">
          <TextInput
            required
            label="Full Name"
            placeholder="John Doe"
            {...form.getInputProps('fullName')}
            mt="md"
          />
          <TextInput
            required
            label="Email"
            placeholder="john.doe@example.com"
            {...form.getInputProps('email')}
            mt="md"
          />
          <DatePicker
            
            
            {...form.getInputProps('dateOfBirth')}
            mt="md"
          />
          <TextInput
            required
            label="Phone Number"
            placeholder="1234567890"
            {...form.getInputProps('phoneNumber')}
            mt="md"
          />
        </Stepper.Step>

        <Stepper.Step label="Authentication" description="Create credentials">
          <TextInput
            required
            label="Username"
            placeholder="username"
            {...form.getInputProps('username')}
            mt="md"
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            {...form.getInputProps('password')}
            mt="md"
          />
          <PasswordInput
            required
            label="Confirm Password"
            placeholder="Confirm your password"
            {...form.getInputProps('confirmPassword')}
            mt="md"
          />
          <div style={{height: '100px'}}></div>
        </Stepper.Step>

        <Stepper.Step label="Confirmation" description="Verify">
          <Text size="sm" w={500}>
            <strong>Full Name:</strong> {form.values.fullName}
          </Text>
          <Text size="sm" w={500}>
            <strong>Email:</strong> {form.values.email}
          </Text>
          <Text size="sm" w={500}>
            <strong>Date of Birth:</strong> {form.values.dateOfBirth?.toLocaleDateString()}
          </Text>
          <Text size="sm" w={500}>
            <strong>Phone Number:</strong> {form.values.phoneNumber}
          </Text>
          <Text size="sm" w={500}>
            <strong>Username:</strong> {form.values.username}
          </Text>
          <div style={{height: '300px'}}></div>
        </Stepper.Step>
      </Stepper>

   
    </form>
  );
}
