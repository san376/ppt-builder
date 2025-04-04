// import type { NextConfig } from "next";
// import { hostname } from "os";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images:{
//     remotePatterns:[
//       {
//         protocol: 'https',
//       hostname:'images.unsplash.com',
//       port:'',
//       pathname:'/**',
//       },
//       {
//         protocol: 'https',
//       hostname:'plus.unsplash.com',
//       port:'',
//       pathname:'/**',
//       },
//       {
//         protocol: 'https',
//       hostname:'via.placeholder.com',
//       port:'',
//       pathname:'/**',
//       },
//       {
//         protocol: 'https',
//       hostname:'placehold.co',
//       port:'',
//       pathname:'/**',
//       },
//       {
//         protocol: 'https',
//       hostname:'placeimg.com',
//       port:'',
//       pathname:'/**',
//       },
//       {
//         protocol: 'https',
//       hostname:'oaidalleapiprodscus.blob.core.windows.net',
//       port:'',
//       pathname:'/**',
//       },
//     ],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  images: {
    unoptimized: isDev, // ✅ Disable optimization in development
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placeimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
