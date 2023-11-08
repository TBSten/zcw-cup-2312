import { collectionOf } from "@/firestore/type"
import "server-only"
import { ProfileSchema } from "../type"

export const profiles = collectionOf("profiles", ProfileSchema)
