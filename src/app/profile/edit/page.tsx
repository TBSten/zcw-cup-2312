
import { auth } from "@/auth/server/auth"
import { getProfile } from "@/auth/server/getProfile"
import SectionTitle from "@/components/SectionTitle"
import { getAllCards } from "@/deck/card/getAllCards"
import { getDeck } from "@/deck/server/get"
import { Divider } from "@mantine/core"
import { FC } from "react"
import PleaseLogin from "../PleaseLogin"
import EditDeckForm from "./EditDeckForm"
import EditProfileForm from "./EditProfileForm"

interface ProfileEditPageProps {
}
const ProfileEditPage: FC<ProfileEditPageProps> = async () => {
    const session = await auth()
    if (!session) return <PleaseLogin />
    const [profile, deck] = await Promise.all([
        getProfile(session.user.id),
        getDeck(session.user.id),
    ])
    const allCards = await getAllCards()
    return (
        <div>
            <SectionTitle>
                プロフィールの編集
            </SectionTitle>
            <EditProfileForm
                session={session}
                profile={profile}
            />
            <Divider my="xl" />
            <SectionTitle>
                デッキの編集
            </SectionTitle>
            <EditDeckForm
                session={session}
                deck={deck}
                cards={allCards}
            />
        </div>
    )
}

export default ProfileEditPage

