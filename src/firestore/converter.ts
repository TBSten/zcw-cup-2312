import { FirestoreDataConverter } from '@google-cloud/firestore';
import { ZodSchema } from "zod";

export const getConverter = <T extends { id: string },>(scheme: ZodSchema<T>): FirestoreDataConverter<T> => ({
    fromFirestore(snapshot) {
        const data = scheme.parse(snapshot.data())
        if (data.id !== snapshot.id) throw new Error(`ConverterError: invalid id on fromFirestore`)
        return data
    },
    toFirestore(data) {
        return data
    },
})
