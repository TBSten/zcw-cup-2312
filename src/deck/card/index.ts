import { collectionOf } from "@/firestore/type";
import { CardSchema } from "./type";

export const cards = collectionOf("cards", CardSchema)
