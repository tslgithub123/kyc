import { Container, Title, Text, Center, Image, Button, Space } from '@mantine/core';
import hal9000 from '../../assets/icons/hal9000.png';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
    document.title = 'Unauthorized Access';
    document.body.style.fontSize = '16px';
    const navigate = useNavigate();

    useEffect(() => {
        useAuthStore.getState().logout();
    }
    , []);
    return (
        <Container>
            <Center style={{flexDirection: 'column' }}>
            <Image
                src={hal9000}
                alt="Unauthorized Access"
                h='auto'
                w={200}
                mb="md"
            />
            <Title order={1}>Unauthorized</Title>
            <Text size="lg">
                I'm sorry Dave, I'm afraid I can't let you do that.
            </Text>
            <Space h="lg" />
            <hr/>
           <Button variant='light' onClick={()=>{
            navigate('/login');
           }}> Login</Button>
            </Center>
        </Container>
    );
}