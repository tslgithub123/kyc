import { Text, UnstyledButton, useMantineTheme } from '@mantine/core';
import classes from './FancyButton.module.css';
import React from 'react';

interface FancyButtonProps {
    icon: React.ReactNode;
    color: string;
    title: string;
    onClick: (title: string) => void;
}

export default function FancyButton({ icon, color, title, onClick }: FancyButtonProps) {
    const theme = useMantineTheme();

    let bgColor = ''
    switch (title) {
        case "Environment Officer":
            bgColor = 'lime.2';
            break;
        case "Management":
            bgColor = 'yellow.2';
            break;
        case "Third Party":
            bgColor = 'grape.2';
            break;
            case "Company":
                bgColor = 'cyan.2';
                break;
        default:
            bgColor = 'lime.1';
    }

    const handleClick = () => {
        onClick(title);
    };

    return (
        <UnstyledButton bg={bgColor} onClick={handleClick} className={classes.item} mt="md">
            {React.cloneElement(icon as React.ReactElement, { color: theme.colors[color][6], size: "2rem" })}
            <Text size="sm" mt={7}>
                {title}
            </Text>
        </UnstyledButton>
    );
}
