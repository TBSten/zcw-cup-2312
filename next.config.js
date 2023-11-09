/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            // ZCW の画像
            'firebasestorage.googleapis.com',
            "storage.googleapis.com",
        ],
    },
}

module.exports = nextConfig
