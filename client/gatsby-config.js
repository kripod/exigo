module.exports = {
  pathPrefix: '/exigo',
  siteMetadata: {
    title: 'Exigo',
    description: '', // TODO
    languageCode: 'en',
    countryCode: 'US',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        /* eslint-disable @typescript-eslint/camelcase */
        name: 'Exigo',
        short_name: 'Exigo',
        start_url: '/',
        background_color: '#fff', // TODO
        theme_color: '#fff', // TODO
        display: 'minimal-ui',
        icon: 'src/assets/favicon.png', // TODO
        /* eslint-enable */
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    '@rhysforyou/gatsby-plugin-react-helmet-async',
    'gatsby-plugin-typescript',
    'gatsby-plugin-emotion',
    'gatsby-plugin-chakra-ui',
  ],
};