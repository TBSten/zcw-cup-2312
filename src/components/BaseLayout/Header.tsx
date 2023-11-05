"use client"
import { loginGoogle } from "@/auth/client/login"
import { useUser } from "@/auth/client/useUser"
import { Button, Flex, Space } from "@mantine/core"
import { FC } from "react"
import Logo from "../Logo"
import styles from "./Header.module.css"

interface HeaderProps {
}
const Header: FC<HeaderProps> = () => {
    const { status, user } = useUser()
    console.log("header", status, user)

    return (
        <header className={styles.header}>
            <Flex align="center" h="100%">
                <Logo />
                <Space style={{ flex: "1 1" }} />
                {status}
                {status === "logined"
                    ? <>{user.name}</>
                    : <>
                        <Button mr="sm" size="xs" onClick={() => loginGoogle()}>
                            ログイン
                        </Button>
                    </>
                }
            </Flex>
        </header>
    )
}

export default Header
