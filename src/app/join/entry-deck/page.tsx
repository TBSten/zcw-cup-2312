import { auth } from "@/auth/server/auth"
import Banner from "@/components/Banner"
import SectionTitle from "@/components/SectionTitle"
import { redirect } from "next/navigation"
import { getStepPath, steps } from "../steps"
import EntryDeckForm from "./EntryDeckForm"

export default async function JoinEntryDeckPage() {
    const session = await auth()
    if (!session) return redirect(getStepPath(steps[0].segment))
    return (
        <div>
            <SectionTitle>
                デッキを登録する
            </SectionTitle>

            <Banner type="info">
                登録したデッキは大会前日まで変更可能です。
            </Banner>

            <EntryDeckForm
                userId={session.user.id}
            />
        </div>
    )
}
