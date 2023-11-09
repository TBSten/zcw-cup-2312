import { Box, Center, Title } from "@mantine/core"
import { FC } from "react"
import FullScreenWidth from "./BaseLayout/FullScreenWidth"

interface PreparingProps {
    fullScreen?: boolean
}
const Preparing: FC<PreparingProps> = ({ fullScreen = false }) => {
    return (
        <FullScreenWidth>
            <Box h={fullScreen ? "100vh" : "auto"} bg="gray.0">
                <Center w="100%" h="100%" ta="center">
                    <Title order={1}>
                        準備中です...
                    </Title>
                </Center>
            </Box>
        </FullScreenWidth>
    )
}

export default Preparing
