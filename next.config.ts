import { NextConfig } from "next"

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jejnrdxxcxixydvfecxi.supabase.co",
      },
    ],
  },
}

export default config
