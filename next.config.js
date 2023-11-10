/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // ZCW の画像
            {
                protocol: "https",
                hostname: 'firebasestorage.googleapis.com',
            },
            // アップロードしたファイル
            {
                protocol: "https",
                hostname: 'storage.googleapis.com',
            },
        ]
    },
}

module.exports = nextConfig
