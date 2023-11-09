import { cards } from "."
import { Card, CardCategory } from "./type"

const categories: CardCategory[] = [
    '1st',
    '2nd',
    'local/techno_poor',
    'collab/OIOI',
    'bonus/jinkougaku',
]

export const getAllCards = async (): Promise<Card[]> => {
    const snapshot = await cards.orderBy("category", "asc").orderBy("no", "asc").get()
    return snapshot.docs.map(d => d.data()).sort((a, b) => {
        const aCategoryIndex = categories.findIndex((c) => a.category === c)
        const bCategoryIndex = categories.findIndex((c) => b.category === c)
        if (aCategoryIndex - bCategoryIndex !== 0) {
            return aCategoryIndex - bCategoryIndex
        } else {
            return a.order - b.order
        }
    })
}
