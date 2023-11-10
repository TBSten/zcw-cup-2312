import { auth } from "@/auth/server/auth"
import { getProfile } from "@/auth/server/getProfile"
import Stack from "@/components/Stack"
import { getDeck } from "@/deck/server/get"
import { Alert, Button, Flex, Text } from "@mantine/core"
import Link from "next/link"
import { FC, ReactNode } from "react"
import { BiEdit } from "react-icons/bi"

interface BannerSectionProps {
}
const BannerSection: FC<BannerSectionProps> = async () => {
    const alerts: ReactNode[] = []

    const session = await auth()
    if (!session) {
        alerts.push(
            <Alert variant="light" radius="0">
                <Flex justify="space-between" wrap="wrap">
                    <div>
                        <Text>
                            大会参加者 の方ですか？
                        </Text>
                        <Text c="dimmed" size="sm">
                            プロフィールやデッキの登録をお願いします。
                        </Text>
                    </div>
                    <Button
                        variant="subtle"
                        leftSection={<BiEdit />}
                        component={Link}
                        href="/join"
                    >
                        登録
                    </Button>
                </Flex>
            </Alert>
        )
    }

    const [deck, profile] = session
        ? await Promise.all([
            getDeck(session.user.id),
            getProfile(session.user.id),
        ])
        : [null, null]
    if (session && deck && profile) {
        alerts.push(
            <Alert variant="light" color="teal">
                登録ありがとうございます！
            </Alert>
        )
    }
    return (
        <Stack gap="xs">
            {alerts}
        </Stack>
    )
}

export default BannerSection
