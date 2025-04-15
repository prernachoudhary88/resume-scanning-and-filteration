import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias || {}),
        'pdfjs-dist/build/pdf.worker.entry':
          path.resolve(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.entry.js'),
      },
    };

    return config;
  },
};

export default nextConfig;
