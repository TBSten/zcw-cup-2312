"use client"
import { Card } from "@/deck/card/type"
import { deckCardCount } from "@/deck/constants"
import { Deck } from "@/deck/type"
import { Grid } from "@mantine/core"
import { FC, Fragment, memo, useCallback, useMemo, useState } from "react"
import CardInput from "./CardInput"

interface DeckInputProps {
    deck: Deck
    onChangeDeck: (updater: (prev: Deck) => Deck) => void
    allCards: Card[]
}
const DeckInput: FC<DeckInputProps> = ({ deck, onChangeDeck, allCards }) => {
    const cards: (Card | null)[] = useMemo(() => Array.from(
        { length: deckCardCount },
        (_, i) => deck.cards[i] ?? null,
    ), [deck.cards])
    const handleSelectCard = (index: number, card: Card | null) => {
        onChangeDeck(p => {
            const newCards = [...p.cards]
            if (card) {
                newCards[index] = card
            } else {
                newCards.slice(index, 1)
            }
            console.log(p.cards, newCards)
            return {
                ...p,
                cards: newCards,
            }
        })
    }
    return (
        <div>
            <Grid my="md" gutter="0">
                {cards.map((card, i) =>
                    <Fragment key={i}>
                        <Grid.Col
                            span={{ xs: 12, sm: 6, md: 4 }}
                        >
                            <CardInput
                                selectedCard={card}
                                onChangeSelected={(card) => handleSelectCard(i, card)}
                                cards={allCards}
                                index={i + 1}
                            />
                        </Grid.Col>
                    </Fragment>
                )}
            </Grid>
        </div>
    )
}

export default memo(DeckInput)

export const useDeckInput = (defaultValue: Deck) => {
    const [deck, setDeck] = useState<Deck>(defaultValue)
    const reset = useCallback(() => setDeck(defaultValue), [defaultValue])
    const props = {
        deck,
        onChangeDeck: setDeck,
    } satisfies Partial<DeckInputProps>
    return {
        deck,
        setDeck,
        reset,
        props,
    }
}
