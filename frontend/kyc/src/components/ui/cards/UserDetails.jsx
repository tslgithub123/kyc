import { Avatar, Text, Card, Paper, Button, Badge } from "@mantine/core";
import classes from './UserDetails.module.css';

export default function UserDetails({ profile }) {


    console.log('profile', profile);
    return (
        <Paper  radius="md" withBorder p="lg">
            <Badge color="green" className={classes.badge}>{profile.status}</Badge>
            <Avatar src="" size={120} radius={120} mx="auto" />
            <Text ta="center" fz="lg" fw={500} mt="md">
                {profile.employeeName}
            </Text>
            <Text ta="center" c="dimmed">{profile.user.designation}</Text>
            <Text ta="center" c="dimmed" fz="sm">
                {profile.email} • {profile.companyProfile.compName}
            </Text>
        </Paper>
    );
}