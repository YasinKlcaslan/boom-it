/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['magika'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  turbopack: {
    resolveAlias: {
      fs: '',
      net: '',
      tls: '',
    },
  },
};

export default nextConfig;
