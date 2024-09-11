import { Avatar, Text, Paper, Badge } from "@mantine/core";
import classes from './UserDetails.module.css';

interface Profile {
    status: string;
    employeeName: string;
    user: {
        designation: string;
    };
    email: string;
    companyProfile: {
        compName: string;
    };
}

export default function UserDetails({ profile }: { profile: Profile }) {


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