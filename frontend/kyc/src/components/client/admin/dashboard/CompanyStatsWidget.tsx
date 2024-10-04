import { Anchor, Avatar, Card, Center, Paper, SimpleGrid, Text } from "@mantine/core";
import { faAtom, faUserPen, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default () => {
    return (
        <Card mb={'md'} withBorder padding="md" radius="sm">
            <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm" >
                <Paper withBorder p='md' m="md">
                    
                        <Avatar color="red" size='lg'><FontAwesomeIcon icon={faUserTie} /></Avatar>
                        
                    
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
                    
                        <Avatar color="green" size='lg'><FontAwesomeIcon icon={faUserPen} /></Avatar>
                        
                    
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
                    
                        <Avatar color="red" size='lg'><FontAwesomeIcon icon={faUserTie} /></Avatar>
                        
                    
                        <Text
                        mt={'sm'}
                        mb={'sm'}
                        
                        
                            size="lg"
                            fw={900}
                            variant="gradient"
                            gradient={{ from: 'red', to: 'orange', deg: 90 }}
                        >
                            Management
                        </Text>
                    
                    
                        <Anchor mt='lg' size="md" href={`https://`} c='dimmed' target="_blank" underline="hover">
                            Firstname Lastname
                        </Anchor>
                    

                </Paper>
                <Paper withBorder p='md' m="md">
                    
                    <Avatar color="red" size='lg'><FontAwesomeIcon icon={faUserTie} /></Avatar>
                    
                
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
                </SimpleGrid>
        </Card>
    );
}