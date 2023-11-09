import "server-only"
import { profiles } from "."
import { Profile } from "../type"

export const getProfile = async (userId: string): Promise<Profile | null> => {
    const snapshot = await profiles.doc(userId).get()
    const profile = snapshot.data()
    return profile ?? null
}
