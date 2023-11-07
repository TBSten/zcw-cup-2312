import { z } from "zod"
import { CardSchema } from "./card/type"

export const DeckSchema = z.object({
    userId: z.string(),
    cards: CardSchema.array(),
})
export type Deck = z.infer<typeof DeckSchema>
