import React, { useState } from 'react';
import { useForm, isNotEmpty, isEmail } from '@mantine/form';
import { Button, Group, TextInput, NumberInput, FileInput, Radio, px } from '@mantine/core';

function ConsentType() {
  const [hasConsent, setHasConsent] = useState(null);
  const [hasEC, setHasEC] = useState(null);

  const form = useForm({
    initialValues: {
      envClearanceNumber: '',
      consentType: '',
      consentNumber: '',
      issueDate: '',
      validUpto: '',
      grossCI: '',
      numberOfStuff: '',
      numberOfWorker: '',
      totalPlotArea: '',
      totalPlotAreaunit: '',
      totalGreenArea: '',
      totalGreenAreaunit: '',
      totalBuildUpArea: '',
      totalBuildUpAreaunit: '',
      openSpaceAvailable: '',
    },
    validate: {
      consentType: (value) => (hasEC && isNotEmpty(value) ? null : 'Required'),
      issueDate: (value) => (hasEC && isNotEmpty(value) ? null : 'Required'),
      validUpto: (value) => (hasEC && isNotEmpty(value) ? null : 'Required'),
      grossCI: (value) => (hasEC && isNotEmpty(value) ? null : 'Required'),
      numberOfStuff: (value) => (hasEC && isNotEmpty(value) ? null : 'Required'),
      numberOfWorker: (value) => (hasEC && isNotEmpty(value) ? null : 'Required'),
      totalPlotArea: (value) => (hasEC && isNotEmpty(value) ? null : 'Required'),
      totalGreenArea: (value) => (hasEC && isNotEmpty(value) ? null : 'Required'),
      totalBuildUpArea: (value) => (hasEC && isNotEmpty(value) ? null : 'Required'),
      openSpaceAvailable: (value) => (hasEC && isNotEmpty(value) ? null : 'Required'),
    },
  });

  const handleSubmit = (values) => {
    console.log('Form submitted with values:', values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="Consent Type"
                placeholder="Consent Type"
                mt="md"
                {...form.getInputProps('consentType')}
              />
              <NumberInput
                label="Consent Number"
                placeholder="Consent Number"
                mt="md"
                {...form.getInputProps('consentNumber')}
              />
              <TextInput
                label="Issue Date"
                placeholder="Issue Date"
                withAsterisk
                mt="md"
                {...form.getInputProps('issueDate')}
              />
              <TextInput
                label="Valid Upto"
                placeholder="Valid Upto"
                withAsterisk
                mt="md"
                {...form.getInputProps('validUpto')}
              />
              <TextInput
                label="Gross CI"
                placeholder="Gross CI"
                withAsterisk
                mt="md"
                {...form.getInputProps('grossCI')}
              />
              <TextInput
                label="Number of Staff"
                placeholder="Number of Staff"
                mt="md"
                {...form.getInputProps('numberOfStaff')}
              />
              <TextInput
                label="Number of Worker"
                placeholder="Number of Worker"
                mt="md"
                {...form.getInputProps('numberOfWorker')}
              />
              <TextInput
                label="Total Plot Area"
                placeholder="Total Plot Area"
                mt="md"
                {...form.getInputProps('totalPlotArea')}
              />
              <TextInput
                label="Total Plot Area unit"
                placeholder="Total Plot Area unit"
                mt="md"
                {...form.getInputProps('totalPlotAreaunit')}
              />
              <TextInput
                label="Total Green Area"
                placeholder="Total Green Area"
                mt="md"
                {...form.getInputProps('totalGreenArea')}
              />
              <TextInput
                label="Total Green Area Unit"
                placeholder="Total Green Area Unit"
                mt="md"
                {...form.getInputProps('totalGreenAreaunit')}
              />
              <TextInput
                label="Total Build Up Area"
                placeholder="Total Build Up Area"
                mt="md"
                {...form.getInputProps('totalBuildUpArea')}
              />
              <TextInput
                label="Total Build Up Area unit"
                placeholder="Total Build Up Area unit"
                mt="md"
                {...form.getInputProps('totalBuildUpAreaunit')}
              />
              <TextInput
                label="Open Space Available"
                placeholder="Open Space Available"
                mt="md"
                {...form.getInputProps('openSpaceAvailable')}
              />
              <FileInput
                label="Consent File"
                mt="md"
                placeholder="Consent File"
              />
    </form>
  );
}

export default ConsentType;
