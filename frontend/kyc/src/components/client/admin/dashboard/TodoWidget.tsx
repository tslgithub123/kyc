import { faUserGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Anchor, Avatar, Card, Center, Divider, Grid, Paper, SimpleGrid, Text, Title } from "@mantine/core"

export default () => {
    return (

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" >
            <Paper withBorder >

                <Grid p={'xs'} pl='lg' bg={'gray.0'} justify="space-between" align="center">
                    <Grid.Col span={12}>
                    <Center>
            <Text
                size="xl"
                fw={900}
                c='dimmed'
                variant="text"
                bg={'gray.0'}
                
            >
                To Do
            </Text></Center>

                    </Grid.Col>
                </Grid>
                <Divider />

                <Card>
                    Card
                </Card>


            </Paper>

        </SimpleGrid>


    )
}