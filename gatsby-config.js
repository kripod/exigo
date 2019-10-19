module.exports = {
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
        background_color: '#663399', // TODO
        theme_color: '#663399', // TODO
        display: 'minimal-ui',
        icon: 'src/assets/favicon.png', // TODO
        /* eslint-enable */
      },
    },
    '@rhysforyou/gatsby-plugin-react-helmet-async',
    'gatsby-plugin-typescript',
    'gatsby-plugin-emotion',
    // TODO: 'gatsby-plugin-chakra-ui',
  ],
};
