import { Divider, Fieldset, Grid, Group, NumberInput, Paper, Radio, Text, Title, Transition } from "@mantine/core";
import global from '../../../ui/Global.module.css'
import { useState } from "react";

export default function ClearanceForm() {
    const [isApplicable, setIsApplicable] = useState(false);
    const [ecGrantedFrom, setEcGrantedFrom] = useState("");
    console.log('isApplicable', isApplicable);

    return (
        <div >
            <Paper w={'100vw'} withBorder radius="sm">
                <Grid  p="sm" pl='lg' bg={'gray.1'} justify="space-between" align="center">
                    <Grid.Col span={6}>
                        <Title w={'100vw'} className={global.title} order={3} c="gray.7">
                            Add Environmental Clearance
                        </Title>
                    </Grid.Col>
                    <Grid.Col span={6} style={{ textAlign: 'right' }}>
                        <Text size="sm" c="dimmed" style={{ marginRight: '1rem' }}>
                            {/* Total Users: <Text component="span" c='blue'>

                            </Text> */}
                        </Text>
                    </Grid.Col>
                </Grid>
                <Divider />
                <Paper p="sm" radius="lg">
                    {/* <ImageCheckboxes/> */}
                    <Fieldset variant="filled" style={{ width: 'fit-content' }} legend="Applicability">
                        <Radio.Group
                            name="applicability"
                            value={isApplicable ? "1" : "0"}
                            onChange={(value) => setIsApplicable(value === "1")}
                            withAsterisk
                        >
                            <Group mt="xs" >
                                <Radio value="1" label="Yes" />
                                <Radio value="0" label="No" defaultChecked />
                            </Group>
                        </Radio.Group>
                    </Fieldset>

                    <div style={{ overflow: 'hidden' }}>
                        <Transition
                            mounted={isApplicable}
                            transition="scale-y"
                            duration={300}
                            timingFunction="ease"

                        >
                            {(styles) => (
                                <div style={styles}>
                                    <Fieldset mt='sm' variant="filled" legend="Environmental Clearance Form">
                                <NumberInput label="Existing Environmental Clearance Number" placeholder="XYZ" />
                                <Fieldset mt='sm' variant="filled" style={{ width: 'fit-content' }} legend="EC granted from">
                                    <Radio.Group
                                        name="ecGrantedFrom"
                                        value={ecGrantedFrom}
                                        onChange={(value) => setEcGrantedFrom(value)}
                                        withAsterisk
                                    >
                                        <Group mt="xs" >
                                            <Radio value="SEIAA" label="S.E.I.A.A." />
                                            <Radio value="MOEF" label="M.O.E.F." />
                                        </Group>
                                    </Radio.Group>
                                </Fieldset>
                            </Fieldset>
                                </div>
                            )}
                        </Transition>
                    </div>
                </Paper></Paper>
        </div>
    )
}