/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  dryRun: !process.env.SENTRY_AUTH_TOKEN, // Set to true will skip the upload release step
  // https://stackoverflow.com/questions/61011281/next-js-source-maps-with-typescript-on-sentry
  urlPrefix: '~/_next',
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['static-nft.pancakeswap.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: true,
      },
    ]
  },
}

module.exports = withBundleAnalyzer(withSentryConfig(config, sentryWebpackPluginOptions))
