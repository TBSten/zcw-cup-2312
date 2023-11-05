import type { NextAuthOptions } from "next-auth"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"
import { FirestoreAdapter } from "./firestore-adapter"

export const authOptions: NextAuthOptions = {
    adapter: FirestoreAdapter(),
    providers: [
        // google login
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                },
            },
            async profile(profile: GoogleProfile, tokens) {
                return {
                    id: `google-${profile.sub}`,
                    name: profile.name,
                    email: profile.email_verified ? profile.email : null,
                    image: profile.picture,
                    type: "google",
                }
            },
        }),
    ],
    callbacks: {
        async session(params) {
            if (params.user.id) params.session.user.id = params.user.id
            return params.session
        },
    },
    session: {
        strategy: "database",
    },
    secret: process.env.NEXTAUTH_SECRET,
}
