"use client"
import { loginGoogle, logout } from "@/auth/client/login"
import { useUser } from "@/auth/client/useUser"
import { Box, Button, Container, Flex, Loader, Menu, Space } from "@mantine/core"
import { User } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import { useQuery } from "react-query"
import Logo from "../Logo"
import styles from "./Header.module.css"
import { getProfileByUserId } from "./actions"

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
                                ? <Avatar user={user} />
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

interface AvatarProps {
    user: User
}
const Avatar: FC<AvatarProps> = ({ user }) => {
    const { data: profile, isLoading } = useQuery({
        queryKey: ["profile", user?.id],
        queryFn: async () => {
            const userId = user?.id
            if (!userId) return
            return await getProfileByUserId(userId)
        },
    })
    return (
        <Menu>
            <Menu.Target>
                <Image
                    className={styles.icon}
                    src={user.image ?? "/default-user-icon.png"}
                    alt={user.name ?? "不明なユーザ"}
                    width={30}
                    height={30}
                    unoptimized
                />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>{user.name}</Menu.Label>
                <Menu.Item component={Link} href="/profile/edit">
                    {(!isLoading && !profile) ? "プロフィールを登録" : "プロフィールを編集"}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={() => logout()}>
                    ログアウト
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
