module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    reactStrictMode: true,

    env: (() => {
      const BASE_PATH = process.env.BASE_PATH || (() => {
        switch (process.env.NODE_ENV) {
          case 'development': return 'http://localhost:3000'
          default: return 'https://sportdevs.com'
        }
      })()

      return {
        BASE_PATH,
        GTM_ENABLED: process.env.GTM_ENABLED === 'true' || process.env.NODE_ENV === 'production'
      }
    })(),

    webpack: config => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      })
      return config
    }
  }

  return nextConfig
}
