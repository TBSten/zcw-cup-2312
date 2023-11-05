"use client"

import { useSession } from "next-auth/react"

export const useUser = () => {
    const session = useSession()
    if (session.status === "loading") {
        return {
            status: "loading",
        } as const
    } else if (session.status === "authenticated") {
        // google logined
        return {
            status: "logined",
            user: session.data.user,
        } as const
    } else {
        // not logined
        return {
            status: "not-logined",
        } as const
    }
}
