import { Anchor, Avatar, Card, Paper, SimpleGrid, Text } from "@mantine/core";
import { faUserGear, faUserPen, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default () => {
    return (
        <Card mb={'md'} withBorder padding="md" radius="sm">
            <SimpleGrid cols={{ base: 1, sm: 4 }} spacing="sm" >
                <Paper withBorder  p='md' m="md">
                    
                        <Avatar color="red" size='lg' ><FontAwesomeIcon style={{ marginLeft: '5px' }} icon={faUserGear} /></Avatar>
                        
                    
                        <Text
                        mt={'sm'}
                        mb={'sm'}
                        
                        
                            size="lg"
                            fw={900}
                            variant="gradient"
                            gradient={{ from: 'red', to: 'orange', deg: 90 }}
                        >
                            Administrator
                        </Text>
                    
                    
                        <Anchor mt='lg' size="md" href={`https://`} c='dimmed' target="_blank" underline="hover">
                            Firstname Lastname
                        </Anchor>
                    

                </Paper>
                <Paper withBorder p='md' m="md">
                    
                        <Avatar color="green" size='lg'><FontAwesomeIcon style={{ marginLeft: '5px' }} icon={faUserPen} /></Avatar>
                        
                    
                        <Text
                        mt={'sm'}
                        mb={'sm'}
                        
                        
                            size="lg"
                            fw={900}
                            variant="gradient"
                            gradient={{ from: 'green', to: 'lime', deg: 90 }}
                        >Environment Officer
                        </Text>
                    
                    
                        <Anchor mt='lg' size="md" href={`https://`} c='dimmed' target="_blank" underline="hover">
                            Firstname Lastname
                        </Anchor>
                    

                </Paper>
                <Paper withBorder p='md' m="md">
                    
                        <Avatar color="yellow" size='lg'><FontAwesomeIcon icon={faUserTie} /></Avatar>
                        
                    
                        <Text
                        mt={'sm'}
                        mb={'sm'}
                        
                        
                            size="lg"
                            fw={900}
                            variant="gradient"
                            gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                        >
                            Management
                        </Text>
                    
                    
                        <Anchor mt='lg' size="md" href={`https://`} c='dimmed' target="_blank" underline="hover">
                            Firstname Lastname
                        </Anchor>
                    

                </Paper>
                <Paper withBorder p='md' m="md">
                    
                    <Avatar color="grape" size='lg'><FontAwesomeIcon icon={faUsers} /></Avatar>
                    
                
                    <Text
                    mt={'sm'}
                    mb={'sm'}
                    
                    
                        size="lg"
                        fw={900}
                        variant="gradient"
                        gradient={{ from: 'grape', to: 'orange', deg: 90 }}
                    >
                        Third Party
                    </Text>
                
                
                    <Anchor mt='lg' size="md" href={`https://`} c='dimmed' target="_blank" underline="hover">
                        Firstname Lastname
                    </Anchor>
                

            </Paper>
                </SimpleGrid>
        </Card>
    );
}