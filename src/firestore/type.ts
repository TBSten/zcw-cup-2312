import { FirestoreDataConverter } from "@google-cloud/firestore"
import { z, ZodRawShape, ZodSchema } from "zod"
import { db } from "."

export const FirestoreDocumentScheme = <Shape extends ZodRawShape>(shape: Shape) => z.object({
    createAt: z.coerce.date(),
    updateAt: z.coerce.date(),
    ...shape,
})

export const collectionOf = <T extends object>(name: string, schema: ZodSchema<T>) => {
    const conv: FirestoreDataConverter<T> = {
        fromFirestore(snap) {
            return schema.parse(snap.data())
        },
        toFirestore(data) {
            return { ...data }
        }
    }
    const collection = db.collection(name)
        .withConverter(conv)
    return collection
}
