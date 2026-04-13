import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lastfm.freetls.fastly.net",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      {
        protocol: "https",
        hostname: "www.techreclaimss.com",
      },
      {
        protocol: "https",
        hostname: "www.gigabyte.com",
      },
      {
        protocol: "https",
        hostname: "www.notebookcheck.net",
      },
      {
        protocol: "https",
        hostname: "coreva-normal.trae.ai",
      },
      {
        protocol: "https",
        hostname: "www.pcvarge.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
