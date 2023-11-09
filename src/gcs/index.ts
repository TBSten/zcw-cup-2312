import { credentials, projectId } from "@/gcp/credentials";
import { Storage } from "@google-cloud/storage";

export const storage = new Storage({
    projectId,
    credentials,
})
