import { z } from "zod"

export const CardSchema = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    resizedImage: z.string(),
})
export type Card = z.infer<typeof CardSchema>
