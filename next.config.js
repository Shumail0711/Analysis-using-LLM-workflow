import withPWAInit from '@ducanh2912/next-pwa';

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse'],
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

const withPWA = withPWAInit({
  dest: 'public',
});

export default withPWA(config);
