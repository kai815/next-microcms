const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? 'https://next-microcms-5rv0wjxp4.vercel.app/' : ''
};
