
const uploadServerUrl = "/file-upload"

export const upload = async (file: File) => {
    const { uploadUrl, publicUrl } = await fetch(uploadServerUrl).then(r => r.json())
    await fetch(uploadUrl, {
        method: "PUT",
        body: file,
    })
    return publicUrl as string
}

export const selectFile = ({ accept = "*/*" }: Partial<{ accept: string }> = {}) => new Promise<File | null>((resolve, reject) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = accept
    input.addEventListener("change", (e) => {
        const file = input.files?.[0] ?? null
        resolve(file)
    })
    input.click()
})
