import { storage } from "@/gcs"
import { randomId } from "@/util/random"

export const dynamic = "force-dynamic"

export const GET = async () => {
    const fileName = randomId()
    const bucket = storage.bucket("zcw-cup--user-contents")
    const file = bucket.file(fileName)
    const [uploadUrl] = await file.getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 3 * 60 * 1000,
    })
    return Response.json({
        uploadUrl,
        publicUrl: file.publicUrl(),
    })
}
