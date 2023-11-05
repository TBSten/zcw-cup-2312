import { DefaultSession, AdapterUser as NextAuthAdapterUser, DefaultUser as NextAuthDefaultUser } from "next-auth"

type UserType = "google" | "anonymous"
type UserCustomField = {
    id: string
}

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & UserCustomField
    }
    type User = NextAuthDefaultUser & UserCustomField
    type AdapterUser = NextAuthAdapterUser & UserCustomField
}
