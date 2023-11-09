import { z } from "zod"

export const ProfileSchema = z.object({
    name: z.string().optional(),
    tonamelId: z.string().optional(),
    detail: z.string().optional(),
    icon: z.string(),
})
export type Profile = z.infer<typeof ProfileSchema>
