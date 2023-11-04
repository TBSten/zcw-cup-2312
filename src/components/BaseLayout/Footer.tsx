import { Box } from "@mantine/core"
import { FC } from "react"
import Logo from "../Logo"

interface FooterProps {
}
const Footer: FC<FooterProps> = () => {
    return (
        <Box component="footer" bg="gray.1" p="sm" pb="md">
            <Logo />
        </Box>
    )
}

export default Footer
