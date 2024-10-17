import { AppShell, Group, Burger, Paper, Divider, Transition, AppShellFooter, Text } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { getUserTypeColor } from "../../utils/colorUtils";
import ThemeButton from "../ui/ThemeButton";
import Login from "../auth/login/Login";
import HomePage from "./HomePage";

export default () => {
    return (
        <AppShell
            layout="default"
            header={{ height: { base: 60, md: 70, lg: 60 } }}
            padding="md"
        >
            <AppShell.Header >
                <Group h="100%" px="md" justify="center">
                    <Text c='blue' size="1.4rem">Know Your Compliance</Text>
                </Group>
            </AppShell.Header>
            <AppShell.Main
                style={{
                    display: 'block',
                }}
                pt={'76px'}
            >
                <HomePage />
            </AppShell.Main>
        </AppShell>
    );
}