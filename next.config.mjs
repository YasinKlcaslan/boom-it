/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['magika'],
  webpack: (config, { isServer }) => {
    // Magika için gerekli polyfill'ler
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
};

export default nextConfig;
