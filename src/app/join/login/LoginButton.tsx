"use client"
import { loginGoogle } from "@/auth/client/login"
import { Button } from "@mantine/core"
import { FC } from "react"
import { Step, getNextStep, getStepPath } from "../steps"

interface LoginButtonProps {
}
const LoginButton: FC<LoginButtonProps> = () => {
    return (
        <Button onClick={() => loginGoogle({ callbackUrl: getStepPath(getNextStep("login") as Step) })}>
            ログイン
        </Button>
    )
}

export default LoginButton
