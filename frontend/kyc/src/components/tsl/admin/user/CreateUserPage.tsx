import { Button, Card, Center, Divider, Grid, Modal, Paper, Text, Title } from "@mantine/core";
import FancyButton from "../../../ui/FancyButton";
import { IconUserCheck, IconUserEdit, IconUserShield } from "@tabler/icons-react";
import { useState } from "react";
import classes from './ModalStyles.module.css'
import CreateUserForm from "./CreateUserForm";

const EnvironmentOfficerModalContent = (
   <CreateUserForm/>
);

const ManagementModalContent = (
    <>
        <Text>This is the modal content for Management.</Text>
        
    </>
);

const ThirdPartyModalContent = (
    <>
        <Text>This is the modal content for Third Party.</Text>
        
    </>
);

export default function CreateUserPage() {
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
            <Paper withBorder radius="sm">
                <Grid p="lg" justify="space-between" align="center">
                    <Grid.Col span={6}>
                        <Title order={3} fw={700} c="dark">Create Users</Title>
                    </Grid.Col>
                    <Grid.Col span={6} style={{ textAlign: 'right' }}>
                        {/* <Text size="sm" c="dimmed">Total Profiles: {userProfiles.length}</Text> */}
                    </Grid.Col>
                </Grid>
                <Divider />

                <Card>
                    <Grid >
                        <Grid.Col pt={0} span={4}>
                            <Center>
                                <FancyButton onClick={() => modalClick(EnvironmentOfficerModalContent)} color="green" icon={<IconUserEdit />} title={"Environment Officer"} />
                            </Center>
                        </Grid.Col>
                        <Grid.Col pt={0} span={4}>
                            <Center>
                                <FancyButton onClick={() => modalClick(ManagementModalContent)} color="yellow" icon={<IconUserShield />} title={"Management"} />
                            </Center>
                        </Grid.Col>
                        <Grid.Col pt={0} span={4}>
                            <Center>
                                <FancyButton onClick={() => modalClick(ThirdPartyModalContent)} color="violet" icon={<IconUserCheck />} title={"Third Party"} />
                            </Center>
                        </Grid.Col>
                    </Grid>
                </Card>
            </Paper>

            <Modal 
            classNames={{ header: classes.modalHeader }}
                title={
                    modalContent === EnvironmentOfficerModalContent ? "Create Environment Officer" :
                    modalContent === ManagementModalContent ? "Create Management User" :
                    modalContent === ThirdPartyModalContent ? "Create Third Party User" :
                    ""
                } 
                
                

                opened={opened} 
                onClose={closeModal}
            >
                {modalContent}
            </Modal>
        </>
    );
}
