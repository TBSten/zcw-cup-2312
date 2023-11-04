
export const projectId = process.env.FIRESTORE_PROJECT_ID as string
export const credentials = {
    client_email: process.env.FIRESTORE_CLIENT_EMAIL,
    private_key: process.env.FIRESTORE_PRIVATE_KEY?.replaceAll("\\n", "\n"),
}
