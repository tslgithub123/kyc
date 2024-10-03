import { Card, Center, Divider, Grid, Group, Modal, Paper, Text, Title } from "@mantine/core";
import FancyButton from "../../../ui/FancyButton";
import { IconBuildingSkyscraper } from "@tabler/icons-react";
import { useState } from "react";
import classes from '../user/ModalStyles.module.css';
import global from "./../../../ui/Global.module.css";
import CompanyProfileForm from "./forms/CompanyProfileForm";

const CompanyModalContent = (
    <CompanyProfileForm/>
);

export default function CreateCompanyProfile() {
    const [opened, setOpened] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

    function openModal(content: JSX.Element) {
        setModalContent(content);
        setOpened(true);
    }

    function closeModal() {
        setOpened(false);
        setModalContent(null);
    }

    function modalClick(content: JSX.Element) {
        openModal(content);
    }

    return (
        <>
            <Paper withBorder mt='md' radius="sm">
                <Grid p="sm" pl='lg' bg={'gray.1'} justify="space-between" align="center">
                    <Grid.Col span={6}>

                            <Title className={global.title} order={3} c="gray.7">
                                Create Company Profile
                            </Title>

                    </Grid.Col>
                </Grid>
                <Divider />

                <Card>
                    <Grid >
                        <Grid.Col pt={0} span={6}>
                            <Center>
                                <FancyButton onClick={() => modalClick(CompanyModalContent)} color="yellow" icon={<IconBuildingSkyscraper/>} title={"Company"} />
                            </Center>
                        </Grid.Col>
                        <Grid.Col pt={0} span={6}>
                            
                        <Center m={'sm'}>
                        {/* <ThemeIcon  c={'blue'} variant="light" size={40} radius={40}>
                                        <IconExclamationMark
                                            style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                                    </ThemeIcon> */}
                                    <Text mt={'sm'} size="sm" c="dimmed" lh={1.6}>
                                        <Group>
                                            <ul>
                                                <li>Company profile creation is required before adding users.</li>
                                                <li>Company profile creation is required before adding users.</li>
                                                <li>Company profile creation is required before adding users.</li>
                                            </ul>
                                        </Group>
                                    </Text>
                                    
                                    </Center>
                            
                        </Grid.Col>
                    </Grid>
                    {/* <Overlay color="#000" backgroundOpacity={0.05} blur={15} /> */}
                </Card>

                
            </Paper>

            <Modal
                classNames={{ header: classes.modalHeader}}
                title={modalContent === CompanyModalContent ? "Create Company User" : ""}
                opened={opened}
                radius={'md'}
                onClose={closeModal}
                size="xl"
            >
                {modalContent}
            </Modal>
        </>
    );
}
