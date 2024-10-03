import React, { useState } from 'react';
import { Flex, Paper, Group, Radio, Text, TextInput, NumberInput, FileInput, Button } from '@mantine/core';

const EcApplicable = ({ formData, onChange }) => {
  return (
    <Flex direction="column" gap="md">
      {/* <Text>Consent Details:</Text> */}
      <TextInput
        label="Consent Type"
        value={formData.consentType}
        onChange={(e) => onChange({ ...formData, consentType: e.currentTarget.value })}
      />
      <NumberInput
        label="Consent Number"
        value={formData.consentNumber}
        onChange={(value) => onChange({ ...formData, consentNumber: value })}
      />
      <TextInput
        label="Issue Date"
        value={formData.issueDate}
        onChange={(e) => onChange({ ...formData, issueDate: e.currentTarget.value })}
      />
      <TextInput
        label="Valid Upto"
        value={formData.validUpto}
        onChange={(e) => onChange({ ...formData, validUpto: e.currentTarget.value })}
      />
      <TextInput
        label="Gross CI"
        value={formData.grossCI}
        onChange={(e) => onChange({ ...formData, grossCI: e.currentTarget.value })}
      />
      <NumberInput
        label="Number of Staff"
        value={formData.numberOfStuff}
        onChange={(value) => onChange({ ...formData, numberOfStuff: value })}
      />
      <NumberInput
        label="Number of Workers"
        value={formData.numberOfWorker}
        onChange={(value) => onChange({ ...formData, numberOfWorker: value })}
      />
      <NumberInput
        label="Total Plot Area"
        value={formData.totalPlotArea}
        onChange={(value) => onChange({ ...formData, totalPlotArea: value })}
      />
      <NumberInput
        label="Total Green Area"
        value={formData.totalGreenArea}
        onChange={(value) => onChange({ ...formData, totalGreenArea: value })}
      />
      <NumberInput
        label="Total Build Up Area"
        value={formData.totalBuildUpArea}
        onChange={(value) => onChange({ ...formData, totalBuildUpArea: value })}
      />
      <NumberInput
        label="Open Space Available"
        value={formData.openSpaceAvailable}
        onChange={(value) => onChange({ ...formData, openSpaceAvailable: value })}
      />
      <FileInput
        label="Consent File"
        value={formData.consentFile}
        onChange={(file) => onChange({ ...formData, consentFile: file })}
      />
    </Flex>
  );
};

const ConsentForm = () => {
  const [formData, setFormData] = useState({
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
  });
  const [q1, setQ1] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with values:', formData);
  };

  return (
    <Paper shadow="xs" p="xl">
      <Flex direction="column" gap="md">
        <Text>Consent Flow</Text>
        <form onSubmit={handleSubmit}>
          <div>
            <Text>Q1: Do you have valid consent to establish for Existing consent to operate?</Text>
            <Group>
              <Radio label="Yes" checked={q1 === true} onChange={() => setQ1(true)} />
              <Radio label="No" checked={q1 === false} onChange={() => setQ1(false)} />
            </Group>
          </div>

          {q1 !== null && (
            <EcApplicable formData={formData} onChange={setFormData} />
          )}

          <Button variant="light" type="submit">Submit</Button>
        </form>
      </Flex>
    </Paper>
  );
};

// Main App Component
const ConsentView = () => {
  return <ConsentForm />;
};

export default ConsentView;
