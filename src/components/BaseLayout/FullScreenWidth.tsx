import { Box } from "@mantine/core"
import { FC, ReactNode } from "react"

interface FullScreenWidthProps {
    children?: ReactNode
}
const FullScreenWidth: FC<FullScreenWidthProps> = ({ children }) => {
    const width = "100vw"
    return (
        <Box mx={`calc(((${width} - 100%) / 2) * -1)`} w={width}>
            {children}
        </Box>
    )
}

export default FullScreenWidth
