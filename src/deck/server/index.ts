import { collectionOf } from "@/firestore/type"
import "server-only"
import { DeckSchema } from "../type"

export const decks = collectionOf("decks", DeckSchema)
