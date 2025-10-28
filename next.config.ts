// next.config.ts
// -- itt allitjuk be, hogy a frontendrol a /backend/... kerdesek
//    lokalisan at legyenek iranyitva a Spring Boot szerverre (8081)
//    igy NINCS CORS gond, mert a bongeszo sajat originre kerdez.

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // minden /backend/:path* atmegy a http://localhost:8081/:path* cimre
        source: "/backend/:path*",
        destination: "http://localhost:8082/:path*",
      },
    ];
  },
};

export default nextConfig;
