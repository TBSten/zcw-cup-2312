"use server"

import { saveDeck } from "@/deck/server/save"
import { Deck } from "@/deck/type"

export const handleSaveDeck = async (deck: Deck) => {
    await saveDeck(deck)
}
