"use server"

import { saveProfile } from "@/auth/server/saveProfile"
import { Profile } from "@/auth/type"
import { saveDeck } from "@/deck/server/save"

export const handleSaveProfile = async (userId: string, profile: Profile) => {
    await saveProfile(userId, profile)
}

export const handleSaveDeck = saveDeck
