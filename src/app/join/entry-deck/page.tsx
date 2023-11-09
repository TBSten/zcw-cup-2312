import { auth } from "@/auth/server/auth"
import Banner from "@/components/Banner"
import CenterLoader from "@/components/CenterLoader"
import SectionTitle from "@/components/SectionTitle"
import { getAllCards } from "@/deck/card/getAllCards"
import { getDeck } from "@/deck/server/get"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { getStepPath, steps } from "../steps"
import EntryDeckForm, { EntryDeckFormProps } from "./EntryDeckForm"

export default async function JoinEntryDeckPage() {
    const session = await auth()
    if (!session) return redirect(getStepPath(steps[0].segment))
    const deck = await getDeck(session.user.id)
    return (
        <div>
            <SectionTitle>
                デッキを登録する
            </SectionTitle>

            <Banner type="info">
                登録したデッキは大会前日まで変更可能です。
            </Banner>

            <Suspense fallback={<CenterLoader />}>
                <EntryDeckFormContainer
                    userId={session.user.id}
                    defaultValue={deck}
                />
            </Suspense>
        </div>
    )
}

const EntryDeckFormContainer = async (props: Omit<EntryDeckFormProps, "cards">) => {
    const cards = await getAllCards()
    return (
        <EntryDeckForm
            {...props}
            cards={cards}
        />
    )
}
