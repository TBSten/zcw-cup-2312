import { z } from "zod"

export const ProfileSchema = z.object({
    name: z.string().optional(),
    tonamelId: z.string().optional(),
    detail: z.string().optional(),
})
export type Profile = z.infer<typeof ProfileSchema>
