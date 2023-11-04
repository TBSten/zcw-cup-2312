import { credentials, projectId } from '@/gcp/credentials';
import { Firestore } from "@google-cloud/firestore";

export const db = new Firestore({
    projectId,
    credentials,
})
