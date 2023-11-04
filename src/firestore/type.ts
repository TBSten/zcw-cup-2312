import { z, ZodRawShape } from "zod"

export const FirestoreDocumentScheme = <Shape extends ZodRawShape>(shape: Shape) => z.object({
    id: z.string(),
    createAt: z.coerce.date(),
    updateAt: z.coerce.date(),
    ...shape,
})
