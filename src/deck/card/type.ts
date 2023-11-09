import { z } from "zod"

export const CardElementSchema = z.union([
    z.literal("flame"),
    z.literal("wind"),
    z.literal("electricity"),
    z.literal("darkness"),
])
export type CardElement = z.infer<typeof CardElementSchema>

export const CardCategorySchema = z.union([
    z.literal("1st"),
    z.literal("2nd"),
    z.literal("local/techno_poor"),
    z.literal("collab/OIOI"),
    z.literal("bonus/jinkougaku"),
])
export type CardCategory = z.infer<typeof CardCategorySchema>

export const CardRaritySchema = z.union([
    z.literal("N"),
    z.literal("N+"),
    z.literal("R"),
    z.literal("R+"),
    z.literal("SR"),
    z.literal("SR+"),
    z.literal("UR"),
    z.literal("SE"),
])
export type CardRarity = z.infer<typeof CardRaritySchema>

export const CardTypeSchema = z.union([
    z.literal("character"),
    z.literal("enchant"),
    z.literal("area_enchant"),
])
export type CardType = z.infer<typeof CardTypeSchema>

export const CardRankSchema = z.union([
    z.literal("S"),
    z.literal("A"),
    z.literal("B"),
    z.literal("C"),
    z.literal("D"),
])
export type CardRank = z.infer<typeof CardRankSchema>

export const CardSchema = z.object({
    id: z.string(),
    image: z.object({
        url: z.string(),
        filename: z.string(),
        full_path: z.string(),
    }).optional(),
    resized_image: z.object({
        url: z.string(),
        filename: z.string(),
        full_path: z.string(),
    }).optional(),
    category: CardCategorySchema,
    order: z.number(),
    no: z.string(),
    special_denominator: z.string().optional(),
    special_procurement_method: z.string().optional(),
    rarity: CardRaritySchema.optional(),
    element: CardElementSchema.optional(),
    name: z.string().optional(),
    name_furigana: z.string().optional(),
    effect: z.string().optional(),
    day_offensive_strength: z.number().optional(),
    night_offensive_strength: z.number().optional(),
    clock: z.number().optional(),
    power_cost: z.number().optional(),
    power: z.number().optional(),
    type: CardTypeSchema.optional(),
    rank: CardRankSchema.optional(),
    rank_description: z.string().optional(),
    youtube_id: z.string().optional(),
})
export type Card = z.infer<typeof CardSchema>
