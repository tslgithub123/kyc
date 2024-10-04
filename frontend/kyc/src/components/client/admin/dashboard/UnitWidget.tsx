import { Card, Center, Text } from "@mantine/core"

export default () => {
    return (
        <Card mb={'md'} withBorder radius="sm">
            <Center>
            <Text
                size="xl"
                fw={900}
                c='dimmed'
                variant="text"
                
            >
                Unit Name
            </Text></Center>
        </Card>
    )
}