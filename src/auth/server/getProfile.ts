import { User } from "next-auth"
import "server-only"
import { profiles } from "."
import { Profile } from "../type"

export const getProfile = async (userId: string, user: User | null = null): Promise<Profile | null> => {
    const snapshot = await profiles.doc(userId).get()
    const profile = snapshot.data()
    return profile ?? null
}
