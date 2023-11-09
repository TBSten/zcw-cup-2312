import FullScreenWidth from '@/components/BaseLayout/FullScreenWidth'
import { Center, Stack, Text, Title } from '@mantine/core'
import { NextPage } from 'next'

interface Props {
}
const NotFound: NextPage<Props> = ({ }) => {
    return (
        <FullScreenWidth>
            <Center w="100%" h="100vh" p="lg" bg="red.1" ta="center">
                <Stack>
                    <Center>
                        <Title order={1} c="red">404</Title>
                    </Center>
                    <Center>
                        <Text size="lg">
                            ページが見つかりません...
                        </Text>
                    </Center>
                    <Center>
                        <Text size="md">
                            URLが正しいか確認してください。
                        </Text>
                    </Center>
                </Stack>
            </Center>
        </FullScreenWidth>
    )
}
export default NotFound
