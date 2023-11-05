import {
    Firestore,
    Timestamp,
} from "@google-cloud/firestore"

import type {
    Adapter,
    AdapterAccount,
    AdapterSession,
    AdapterUser,
    VerificationToken,
} from "next-auth/adapters"

import { db as firestore } from "@/firestore"

export function FirestoreAdapter(db: Firestore = firestore): Adapter {
    const C = collectionsFactory(db)
    const mapper = mapFieldsFactory()

    return {
        async createUser(userInit) {
            console.log("fb adapter create user", userInit)

            const { id: userId } = await C.users.add(userInit as AdapterUser)

            const user = await getDoc(C.users.doc(userId))
            if (!user) throw new Error("[createUser] Failed to fetch created user")

            return user
        },

        async getUser(id) {
            return await getDoc(C.users.doc(id))
        },

        async getUserByEmail(email) {
            return await getOneDoc(C.users.where("email", "==", email))
        },

        async getUserByAccount({ provider, providerAccountId }) {
            const account = await getOneDoc(
                C.accounts
                    .where("provider", "==", provider)
                    .where(mapper.toDb("providerAccountId"), "==", providerAccountId)
            )
            if (!account) return null

            return await getDoc(C.users.doc(account.userId))
        },

        async updateUser(partialUser) {
            if (!partialUser.id) throw new Error("[updateUser] Missing id")

            const userRef = C.users.doc(partialUser.id)

            await userRef.set(partialUser, { merge: true })

            const user = await getDoc(userRef)
            if (!user) throw new Error("[updateUser] Failed to fetch updated user")

            return user
        },

        async deleteUser(userId) {
            await db.runTransaction(async (transaction) => {
                const accounts = await C.accounts
                    .where(mapper.toDb("userId"), "==", userId)
                    .get()
                const sessions = await C.sessions
                    .where(mapper.toDb("userId"), "==", userId)
                    .get()

                transaction.delete(C.users.doc(userId))

                accounts.forEach((account) => transaction.delete(account.ref))
                sessions.forEach((session) => transaction.delete(session.ref))
            })
        },

        async linkAccount(accountInit) {
            const ref = await C.accounts.add(accountInit)
            const account = await ref.get().then((doc) => doc.data())
            return account ?? null
        },

        async unlinkAccount({ provider, providerAccountId }) {
            await deleteDocs(
                C.accounts
                    .where("provider", "==", provider)
                    .where(mapper.toDb("providerAccountId"), "==", providerAccountId)
                    .limit(1)
            )
        },

        async createSession(sessionInit) {
            const ref = await C.sessions.add(sessionInit)
            const session = await ref.get().then((doc) => doc.data())

            if (session) return session ?? null

            throw new Error("[createSession] Failed to fetch created session")
        },

        async getSessionAndUser(sessionToken) {
            const session = await getOneDoc(
                C.sessions.where(mapper.toDb("sessionToken"), "==", sessionToken)
            )
            if (!session) return null

            const user = await getDoc(C.users.doc(session.userId))
            if (!user) return null

            return { session, user }
        },

        async updateSession(partialSession) {
            const sessionId = await db.runTransaction(async (transaction) => {
                const sessionSnapshot = (
                    await transaction.get(
                        C.sessions
                            .where(
                                mapper.toDb("sessionToken"),
                                "==",
                                partialSession.sessionToken
                            )
                            .limit(1)
                    )
                ).docs[0]
                if (!sessionSnapshot?.exists) return null

                transaction.set(sessionSnapshot.ref, partialSession, { merge: true })

                return sessionSnapshot.id
            })

            if (!sessionId) return null

            const session = await getDoc(C.sessions.doc(sessionId))
            if (session) return session
            throw new Error("[updateSession] Failed to fetch updated session")
        },

        async deleteSession(sessionToken) {
            await deleteDocs(
                C.sessions
                    .where(mapper.toDb("sessionToken"), "==", sessionToken)
                    .limit(1)
            )
        },

        async createVerificationToken(verificationToken) {
            await C.verification_tokens.add(verificationToken)
            return verificationToken
        },

        async useVerificationToken({ identifier, token }) {
            const verificationTokenSnapshot = (
                await C.verification_tokens
                    .where("identifier", "==", identifier)
                    .where("token", "==", token)
                    .limit(1)
                    .get()
            ).docs[0]

            if (!verificationTokenSnapshot) return null

            const data = verificationTokenSnapshot.data()
            await verificationTokenSnapshot.ref.delete()
            return data
        },
    }
}

// for consistency, store all fields as snake_case in the database
const MAP_TO_FIRESTORE: Record<string, string | undefined> = {
    userId: "user_id",
    sessionToken: "session_token",
    providerAccountId: "provider_account_id",
    emailVerified: "email_verified",
}
const MAP_FROM_FIRESTORE: Record<string, string | undefined> = {}

for (const key in MAP_TO_FIRESTORE) {
    MAP_FROM_FIRESTORE[MAP_TO_FIRESTORE[key]!] = key
}

const identity = <T>(x: T) => x

/** @internal */
export function mapFieldsFactory(preferSnakeCase?: boolean) {
    if (preferSnakeCase) {
        return {
            toDb: (field: string) => MAP_TO_FIRESTORE[field] ?? field,
            fromDb: (field: string) => MAP_FROM_FIRESTORE[field] ?? field,
        }
    }
    return { toDb: identity, fromDb: identity }
}

/** @internal */
function getConverter<Document extends Record<string, any>>(options: {
    excludeId?: boolean
    preferSnakeCase?: boolean
}): FirebaseFirestore.FirestoreDataConverter<Document> {
    const mapper = mapFieldsFactory(options?.preferSnakeCase ?? false)

    return {
        toFirestore(object) {
            const document: Record<string, unknown> = {}

            for (const key in object) {
                if (key === "id") continue
                const value = object[key]
                if (value !== undefined) {
                    document[mapper.toDb(key)] = value
                } else {
                    console.warn(`FirebaseAdapter: value for key "${key}" is undefined`)
                }
            }

            return document
        },

        fromFirestore(
            snapshot: FirebaseFirestore.QueryDocumentSnapshot<Document>
        ): Document {
            const document = snapshot.data()! // we can guarantee it exists

            const object: Record<string, unknown> = {}

            if (!options?.excludeId) {
                object.id = snapshot.id
            }

            for (const key in document) {
                let value: any = document[key]
                if (value instanceof Timestamp) value = value.toDate()

                object[mapper.fromDb(key)] = value
            }

            return object as Document
        },
    }
}

/** @internal */
export async function getOneDoc<T>(
    querySnapshot: FirebaseFirestore.Query<T>
): Promise<T | null> {
    const querySnap = await querySnapshot.limit(1).get()
    return querySnap.docs[0]?.data() ?? null
}

/** @internal */
async function deleteDocs<T>(
    querySnapshot: FirebaseFirestore.Query<T>
): Promise<void> {
    const querySnap = await querySnapshot.get()
    for (const doc of querySnap.docs) {
        await doc.ref.delete()
    }
}

/** @internal */
export async function getDoc<T>(
    docRef: FirebaseFirestore.DocumentReference<T>
): Promise<T | null> {
    const docSnap = await docRef.get()
    return docSnap.data() ?? null
}

/** @internal */
export function collectionsFactory(
    db: FirebaseFirestore.Firestore,
    preferSnakeCase = false
) {
    return {
        users: db
            .collection("users")
            .withConverter(getConverter<AdapterUser>({ preferSnakeCase })),
        sessions: db
            .collection("sessions")
            .withConverter(getConverter<AdapterSession>({ preferSnakeCase })),
        accounts: db
            .collection("accounts")
            .withConverter(getConverter<AdapterAccount>({ preferSnakeCase })),
        verification_tokens: db
            .collection(
                preferSnakeCase ? "verification_tokens" : "verificationTokens"
            )
            .withConverter(
                getConverter<VerificationToken>({ preferSnakeCase, excludeId: true })
            ),
    }
}
