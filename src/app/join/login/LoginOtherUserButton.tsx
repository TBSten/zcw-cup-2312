"use client"
import { loginGoogle } from "@/auth/client/login"
import { Anchor } from "@mantine/core"
import { FC } from "react"

interface LoginOtherUserButtonProps {
}
const LoginOtherUserButton: FC<LoginOtherUserButtonProps> = () => {
    return (
        <Anchor component="span" onClick={() => loginGoogle()}>
            別のアカウントでログインする
        </Anchor>
    )
}

export default LoginOtherUserButton
