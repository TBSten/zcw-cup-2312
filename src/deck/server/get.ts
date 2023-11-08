import { decks } from "."

export const getDeck = async (userId: string) => {
    const snapshot = await decks.doc(userId).get()
    return snapshot.data() ?? null
}
