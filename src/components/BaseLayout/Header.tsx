import { AppShell } from "@mantine/core"
import { FC } from "react"
import Logo from "../Logo"

interface HeaderProps {
}
const Header: FC<HeaderProps> = () => {
    return (
        <AppShell.Header>
            <Logo />
        </AppShell.Header>
    )
}

export default Header
