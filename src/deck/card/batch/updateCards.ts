import { cards } from "@/deck/card/index"
import { CardSchema } from "@/deck/card/type"
import { onlyDevelopFunction } from "@/util/onlyDevelop"
import cardsJson from "../cards.json"

export const updateCards = onlyDevelopFunction(async () => {
    const promises = cardsJson.map(async cardJson => {
        console.log("☑️ updating card", cardJson.id, cardJson.name)
        await cards.doc(cardJson.id).set(CardSchema.parse(cardJson))
        console.log("✅ finish update card", cardJson.id, cardJson.name)
    })
    await Promise.all(promises)
})
