"use server"

import { saveProfile } from "@/auth/server/saveProfile"
import { Profile } from "@/auth/type"

export const handleSaveProfile = async (userId: string, profile: Profile) => {
    await saveProfile(userId, profile)
}
