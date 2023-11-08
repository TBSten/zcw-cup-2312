import "server-only"
import { decks } from "."
import { Deck } from "../type"

export const saveDeck = async (deck: Deck) => {
    await decks.doc(deck.userId).set(deck)
}
