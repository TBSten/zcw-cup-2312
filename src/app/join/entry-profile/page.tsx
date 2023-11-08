import { auth } from "@/auth/server/auth"
import { getProfile } from "@/auth/server/getProfile"
import SectionTitle from "@/components/SectionTitle"
import { redirect } from "next/navigation"
import ProfileForm from "./ProfileForm"

export default async function JoinEntryProfilePage() {
    const session = await auth()
    if (!session) return redirect("/join/login")
    const user = await getProfile(session?.user.id)
    return (
        <div>
            <SectionTitle>
                プロフィールを入力する
            </SectionTitle>

            <ProfileForm
                userId={session.user.id}
                defaultValues={{
                    name: user?.name ?? session.user.name ?? "",
                    tonamelId: user?.tonamelId ?? "",
                    other: user?.detail ?? "",
                }}
            />
        </div>
    )
}
