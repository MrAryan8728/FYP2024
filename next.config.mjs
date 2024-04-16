/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "ipfs.io",
            port: "",
            // pathname: "/account123/**",
        }, ],
    },
};

export default nextConfig;