import { auth } from '@/auth/server/auth'
import { getProfile } from '@/auth/server/getProfile'
import { Box, Button, Center, Divider, Title } from '@mantine/core'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineEdit } from 'react-icons/ai'
import PleaseLogin from './PleaseLogin'
import PleaseSaveProfile from './PleaseSaveProfile'

interface Props {
}
const ProfilePage: NextPage<Props> = async ({ }) => {
    const session = await auth()
    if (!session) return <PleaseLogin />
    const profile = await getProfile(session.user.id)
    if (!profile) return <PleaseSaveProfile />
    return (
        <div>
            <Center style={{ flexDirection: "column" }}>
                <Image
                    src={profile.icon}
                    alt={profile.name ?? "名前未設定"}
                    width={200}
                    height={200}
                />
                <Title order={3} my="md">
                    {profile.name}
                </Title>
            </Center>
            <Box my="sm">
                TonamelのID
                {" : "}
                {profile.tonamelId}
            </Box>
            <Divider my="md" />
            <div>
                <div>
                    運営に伝えておきたいこと
                </div>
                {profile.detail}
            </div>
            <Divider my="md" />
            <div>
                <Button component={Link} href="/profile/edit" leftSection={<AiOutlineEdit />}>
                    編集
                </Button>
            </div>
        </div>
    )
}
export default ProfilePage
