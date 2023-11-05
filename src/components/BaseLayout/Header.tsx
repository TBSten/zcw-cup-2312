"use client"
import { loginGoogle } from "@/auth/client/login"
import { useUser } from "@/auth/client/useUser"
import { Box, Button, Container, Flex, Loader, Space } from "@mantine/core"
import Image from "next/image"
import { FC } from "react"
import Logo from "../Logo"
import styles from "./Header.module.css"

interface HeaderProps {
}
const Header: FC<HeaderProps> = () => {
    const { status, user } = useUser()

    return (
        <Box component="header" className={styles.header}>
            <Container h="100%">
                <Flex align="center" h="100%">
                    <Logo />
                    <Space style={{ flex: "1 1" }} />
                    {
                        status === "loading"
                            ? <Loader size="xs" />
                            : status === "logined"
                                ? <Image
                                    className={styles.icon}
                                    src={user.image ?? "/default-user-icon.png"}
                                    alt={user.name ?? "不明なユーザ"}
                                    width={30}
                                    height={30}
                                    unoptimized
                                />
                                : <>
                                    <Button mr="sm" size="xs" onClick={() => loginGoogle()}>
                                        ログイン
                                    </Button>
                                </>
                    }
                </Flex>
            </Container>
        </Box>
    )
}

export default Header
