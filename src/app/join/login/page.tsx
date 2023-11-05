import { auth } from "@/auth/server/auth";
import Banner from "@/components/Banner";
import SectionTitle from "@/components/SectionTitle";
import { Box, Button } from "@mantine/core";
import Link from "next/link";
import { Step, getNextStep, getStepPath } from "../steps";
import LoginButton from "./LoginButton";
import LoginOtherUserButton from "./LoginOtherUserButton";

export default async function JoinLoginPage() {
    const segment = "login"
    const nextStepPath = getStepPath(getNextStep(segment) as Step)
    const session = await auth()
    return (
        <div>
            <SectionTitle>
                ログインする
            </SectionTitle>
            {session &&
                <Box py="md">
                    <Banner type="info">
                        <div>
                            既に 「{session.user.name}」 としてログイン済みです。
                        </div>
                        <div>
                            <LoginOtherUserButton />
                        </div>
                    </Banner>
                </Box>
            }
            {session
                ? <Button component={Link} href={nextStepPath}>
                    次へ
                </Button>
                : <LoginButton />
            }
        </div>
    )
}
