// eslint-disable-next-line @typescript-eslint/no-var-requires
const proxy = require('http-proxy-middleware');

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
        background_color: '#fff', // TODO
        theme_color: '#fff', // TODO
        display: 'minimal-ui',
        icon: 'src/assets/favicon.png', // TODO
        /* eslint-enable */
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: ['/app/*'],
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

  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:4000',
        pathRewrite: {
          '^/.netlify/functions/': '/',
        },
      }),
    );
  },
};
