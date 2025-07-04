import { NextConfig } from "next"

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "jejnrdxxcxixydvfecxi.supabase.co",
      },
    ],
  },
}

export default config
