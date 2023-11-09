"use server"
import { updateCards } from "@/deck/card/batch/updateCards"

export const updateCardsByCardJson = async () => {
    await updateCards()
}
