import { auth } from "@/auth/server/auth"
import { getProfile } from "@/auth/server/getProfile"
import SectionTitle from "@/components/SectionTitle"
import { redirect } from "next/navigation"
import JoinProfileForm from "./JoinProfileForm"

export default async function JoinEntryProfilePage() {
    const session = await auth()
    if (!session) return redirect("/join/login")
    const profile = await getProfile(session?.user.id)
    return (
        <div>
            <SectionTitle>
                プロフィールを入力する
            </SectionTitle>

            <JoinProfileForm
                user={session.user}
                defaultValues={{
                    name: profile?.name ?? session.user.name ?? "",
                    tonamelId: profile?.tonamelId ?? "",
                    detail: profile?.detail ?? "",
                    icon: profile?.icon ?? "/default-icon.png",
                }}
            />
        </div>
    )
}
