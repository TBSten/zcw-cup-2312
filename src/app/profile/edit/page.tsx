
import { auth } from "@/auth/server/auth"
import { getProfile } from "@/auth/server/getProfile"
import SectionTitle from "@/components/SectionTitle"
import { Divider } from "@mantine/core"
import { FC } from "react"
import PleaseLogin from "../PleaseLogin"
import EditProfileForm from "./EditProfileForm"

interface ProfileEditPageProps {
}
const ProfileEditPage: FC<ProfileEditPageProps> = async () => {
    const session = await auth()
    if (!session) return <PleaseLogin />
    const profile = await getProfile(session.user.id)
    return (
        <div>
            <SectionTitle>
                プロフィールの編集
            </SectionTitle>
            <EditProfileForm
                session={session}
                profile={profile}
            />
            <Divider />
        </div>
    )
}

export default ProfileEditPage

