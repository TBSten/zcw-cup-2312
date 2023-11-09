import { Text } from "@mantine/core"
import Link from "next/link"
import { FC } from "react"

interface LogoProps {
}
const Logo: FC<LogoProps> = () => {
    return (
        <Text component={Link} href="/">
            ZutomayoCard大会
        </Text>
    )
}

export default Logo
