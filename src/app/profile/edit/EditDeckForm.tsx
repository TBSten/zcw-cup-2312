"use client"
import DeckInput, { useDeckInput } from "@/components/deck/DeckInput"
import { Card } from "@/deck/card/type"
import { Deck } from "@/deck/type"
import { useMutate } from "@/util/useMutate"
import { Button, Loader } from "@mantine/core"
import { Session } from "next-auth"
import { FC } from "react"
import { handleSaveDeck } from "./actions"

interface EditDeckFormProps {
    session: Session
    deck: Deck | null
    cards: Card[]
}
const EditDeckForm: FC<EditDeckFormProps> = ({ deck, session, cards: allCards }) => {
    const deckInput = useDeckInput(deck ?? {
        cards: [],
        userId: session.user.id,
    })
    const saveDeck = useMutate(async () => {
        await handleSaveDeck(deckInput.deck)
    }, {
        onSuccess: { toast: "デッキを保存しました！" },
        onError: { toast: "エラーが発生しました...\nもう一度やり直してください。" },
    })
    return (
        <div>
            <DeckInput
                allCards={allCards}
                {...deckInput.props}
            />
            <Button
                onClick={saveDeck.mutate}
                disabled={saveDeck.isLoading}
                leftSection={saveDeck.isLoading && <Loader size="sm" />}
            >
                デッキを保存
            </Button>
        </div>
    )
}

export default EditDeckForm
