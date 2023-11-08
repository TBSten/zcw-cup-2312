import "server-only"
import { profiles } from "."
import { Profile } from "../type"

export const saveProfile = async (userId: string, profile: Profile) => {
    await profiles.doc(userId).set(profile)
}
