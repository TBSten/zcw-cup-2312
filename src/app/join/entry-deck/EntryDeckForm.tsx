"use client"
import DeckInput, { useDeckInput } from "@/components/deck/DeckInput"
import Reward from "@/components/reward/Reward"
import { Card } from "@/deck/card/type"
import { deckCardCount } from "@/deck/constants"
import { Deck } from "@/deck/type"
import { sleep } from "@/util/sleep"
import { useMutate } from "@/util/useMutate"
import { Alert, Anchor, Button, Loader } from "@mantine/core"
import Link from "next/link"
import { FC, useMemo } from "react"
import { AiOutlineCheck } from "react-icons/ai"
import { useReward } from "react-rewards"
import { Step, getPrevStep, getStepPath } from "../steps"
import { handleSaveDeck } from "./actions"

export interface EntryDeckFormProps {
    defaultValue: Deck | null
    userId: string
    cards: Card[]
}
const EntryDeckForm: FC<EntryDeckFormProps> = ({ defaultValue, userId, cards }) => {
    const segment = "entry-deck"
    const prevStepPath = getStepPath(getPrevStep(segment) as Step)

    const deckInput = useDeckInput(defaultValue ?? {
        userId,
        cards: [],
    })
    const isOk = useMemo(() =>
        deckInput.deck.cards.filter(card => !!card).length === deckCardCount,
        [deckInput.deck.cards]
    )

    const confettiId = "join-complete"
    const confetti = useReward(confettiId, 'confetti', { position: "fixed" })

    const handleReward = async () => {
        confetti.reward()
        await sleep(300)
        confetti.reward()
        await sleep(300)
        confetti.reward()
    }
    const saveDeck = useMutate(async () => {
        await handleSaveDeck(deckInput.deck)
        // アニメーションの都合でawaitしない
        handleReward()
    })

    return (
        <div>
            <DeckInput
                {...deckInput.props}
                allCards={cards}
            />

            <div>
                <Button
                    component={Link}
                    href={prevStepPath}
                    variant="default"
                >
                    戻る
                </Button>

                <Button
                    leftSection={saveDeck.isLoading ? <Loader size="xs" /> : <AiOutlineCheck />}
                    disabled={!isOk || saveDeck.isLoading || saveDeck.isSuccess}
                    onClick={saveDeck.mutate}
                >
                    完了
                </Button>

                <Reward id={confettiId} />

            </div>

            {saveDeck.isSuccess &&
                <Alert color="green" icon="🎉" my="md">
                    <div>
                        デッキを登録しました！
                    </div>
                    <div>
                        <Anchor component={Link} href="/">
                            トップに戻る
                        </Anchor>
                    </div>
                </Alert>
            }
        </div>
    )
}

export default EntryDeckForm
