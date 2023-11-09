import { CardCategory, CardType } from "./type";

export const cardCategoryText: Record<CardCategory, string> = {
    "1st": "第1弾",
    "2nd": "第2弾",
    "bonus/jinkougaku": "沈香学 特典",
    "collab/OIOI": "OIOI 特典",
    "local/techno_poor": "テクノプア ご当地",
}

export const cardTypeText: Record<CardType, string> = {
    character: "CHARACTER",
    enchant: "ENCHANT",
    area_enchant: "AREA ENCHANT"
}