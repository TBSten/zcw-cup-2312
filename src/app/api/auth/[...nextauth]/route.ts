import { randomId } from "@/util/random"
import NextAuth, { type User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        // anonymous session
        CredentialsProvider({
            id: "anonymous",
            name: "anonymous",
            credentials: {},
            async authorize(credentials, req) {
                const user: User = {
                    id: "anonymous-" + randomId(),
                }
                return user
            },
        }),
        // google login
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
        }),
    ],
})

export { handler as GET, handler as POST }

