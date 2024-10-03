import React, { useState } from 'react';
import { Flex, Button, Group, Radio, TextInput, Paper, NumberInput, FileInput } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';

const EcApplicable = () => {
  const [q2, setQ2] = useState(null);
  const [formData, setFormData] = useState(null);

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
      totalGreenArea: '',
      totalBuildUpArea: '',
      openSpaceAvailable: '',
      consentFile: null,
    },
    validate: {
      consentType: (value) => (q2 === true && isNotEmpty(value) ? null : 'Required'),
      issueDate: (value) => (q2 === true && isNotEmpty(value) ? null : 'Required'),
      validUpto: (value) => (q2 === true && isNotEmpty(value) ? null : 'Required'),
      grossCI: (value) => (q2 === true && isNotEmpty(value) ? null : 'Required'),
      numberOfStuff: (value) => (q2 === true && isNotEmpty(value) ? null : 'Required'),
      numberOfWorker: (value) => (q2 === true && isNotEmpty(value) ? null : 'Required'),
      totalPlotArea: (value) => (q2 === true && isNotEmpty(value) ? null : 'Required'),
      totalGreenArea: (value) => (q2 === true && isNotEmpty(value) ? null : 'Required'),
      totalBuildUpArea: (value) => (q2 === true && isNotEmpty(value) ? null : 'Required'),
      openSpaceAvailable: (value) => (q2 === true && isNotEmpty(value) ? null : 'Required'),
      consentFile: (value) => (q2 === true && !value ? 'Required' : null),
    },
  });

  const handleFileChange = (file) => {
    form.setFieldValue('consentFile', file);
  };

  const handleSubmit = (values) => {
    console.log('Form submitted with values:', values);
    // Handle form submission logic here
  };

  return (
    // <Paper shadow="xs" p="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div>
          <label style={{ display: 'block', marginBottom: '10px' }}>Q2: EC Applicable</label>
          <Group>
            <Radio label="Yes" checked={q2 === true} onChange={() => setQ2(true)} />
            <Radio label="No" checked={q2 === false} onChange={() => setQ2(false)} />
          </Group>
        </div>

        {q2 !== null && (
          <>
            {q2 ? (
              <>
                <NumberInput
                  label="Env Clearance Number"
                  mt="md"
                  {...form.getInputProps('envClearanceNumber')}
                />
                <TextInput
                  label="Consent Type"
                  placeholder="Consent Type"
                  mt="md"
                  {...form.getInputProps('consentType')}
                />
                <NumberInput
                  label="Consent Number"
                  mt="md"
                  {...form.getInputProps('consentNumber')}
                />
                <TextInput
                  label="Issue Date"
                  mt="md"
                  withAsterisk
                  {...form.getInputProps('issueDate')}
                />
                <TextInput
                  label="Valid Upto"
                  mt="md"
                  withAsterisk
                  {...form.getInputProps('validUpto')}
                />
                <TextInput
                  label="Gross CI"
                  mt="md"
                  withAsterisk
                  {...form.getInputProps('grossCI')}
                />
                <TextInput
                  label="Number of Staff"
                  mt="md"
                  {...form.getInputProps('numberOfStuff')}
                />
                <TextInput
                  label="Number of Workers"
                  mt="md"
                  {...form.getInputProps('numberOfWorker')}
                />
                <TextInput
                  label="Total Plot Area"
                  mt="md"
                  {...form.getInputProps('totalPlotArea')}
                />
                <TextInput
                  label="Total Green Area"
                  mt="md"
                  {...form.getInputProps('totalGreenArea')}
                />
                <TextInput
                  label="Total Build Up Area"
                  mt="md"
                  {...form.getInputProps('totalBuildUpArea')}
                />
                <TextInput
                  label="Open Space Available"
                  mt="md"
                  {...form.getInputProps('openSpaceAvailable')}
                />
                <FileInput
                  label="Consent File"
                  mt="md"
                  placeholder="Upload Consent File"
                  onChange={handleFileChange}
                />
              </>
            ) : (
              // <p>No EC applicable, please fill the required fields.</p>
              <>
              <TextInput
                  label="Consent Type"
                  placeholder="Consent Type"
                  mt="md"
                  {...form.getInputProps('consentType')}
                />
                <NumberInput
                  label="Consent Number"
                  mt="md"
                  {...form.getInputProps('consentNumber')}
                />
                <TextInput
                  label="Issue Date"
                  mt="md"
                  withAsterisk
                  {...form.getInputProps('issueDate')}
                />
                <TextInput
                  label="Valid Upto"
                  mt="md"
                  withAsterisk
                  {...form.getInputProps('validUpto')}
                />
                <TextInput
                  label="Gross CI"
                  mt="md"
                  withAsterisk
                  {...form.getInputProps('grossCI')}
                />
                <TextInput
                  label="Number of Staff"
                  mt="md"
                  {...form.getInputProps('numberOfStuff')}
                />
                <TextInput
                  label="Number of Workers"
                  mt="md"
                  {...form.getInputProps('numberOfWorker')}
                />
                <TextInput
                  label="Total Plot Area"
                  mt="md"
                  {...form.getInputProps('totalPlotArea')}
                />
                <TextInput
                  label="Total Green Area"
                  mt="md"
                  {...form.getInputProps('totalGreenArea')}
                />
                <TextInput
                  label="Total Build Up Area"
                  mt="md"
                  {...form.getInputProps('totalBuildUpArea')}
                />
                <TextInput
                  label="Open Space Available"
                  mt="md"
                  {...form.getInputProps('openSpaceAvailable')}
                />
                <FileInput
                  label="Consent File"
                  mt="md"
                  placeholder="Upload Consent File"
                  onChange={handleFileChange}
                />
              </>
            )}
          </>
        )}
      </form>
    // </Paper>
  );
};

export default EcApplicable;


