require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title:  'A tribute to Bruce Willis',
    description: `Celebrating one of Hollywood's Greatest Movie Stars`,
    siteUrl: 'https://bruce-willis.com', //to be changed
    author: 'Lars Ejaas',
    logo: '/logo.png',
    right: 'All rights reserved Lars Ejaas. Please contact me directly to get my consent before using any content from this page',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-image`,
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    `gatsby-plugin-brotli`,
    `gatsby-plugin-preact`,
  {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /\.inline\.svg$/
      }
    } 
  },
  {
    resolve: `gatsby-plugin-react-i18next`,
    options: {
      localeJsonSourceName: `locale`,
      languages: [`en`, `da`],
      redirect: true,
      siteUrl: 'https://bruce-willis.com', //to be changed,
      defaultLanguage: `da`,
      // you can pass any i18next options
      // pass following options to allow message content as a key
      i18nextOptions: {
        lowerCaseLng: true,
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
        keySeparator: ".",
        nsSeparator: ":",
      },
      pages: [
        {
          matchPath: "/:lang/",
          getLanguageFromPath: true,
          excludeLanguages: ["da"],
        }
      ],
    },
  },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
      },
    },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        pure: true,
        displayName: false
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Bruce Willis',
        short_name: 'Bruce Willis',
        start_url: '/',
        background_color: '#080705',
        theme_color: '#7c6f6c',
        display: 'standalone',
        orientation: `portrait`,
        icon: `src/images/favicon.png`,
        // icons: [
        //   {
        //     src: `icons/icon-48x48.png`,
        //     sizes: `48x48`,
        //     type: `image/png`,
        //     purpose: `maskable any`
        //   },
        //   {
        //     src: `icons/icon-72x72.png`,
        //     sizes: `72x72`,
        //     type: `image/png`,
        //     purpose: `maskable any`
        //   },
        //   {
        //     src: `icons/icon-96x96.png`,
        //     sizes: `96x96`,
        //     type: `image/png`,
        //     purpose: `maskable any`
        //   },
        //   {
        //     src: `icons/icon-144x144.png`,
        //     sizes: `144x144`,
        //     type: `image/png`,
        //     purpose: `maskable any`
        //   },
	      //   {
        //     src: `icons/icon-192x192.png`,
        //     sizes: `192x192`,
        //     type: `image/png`,
        //     purpose: `maskable any`
        //   },
        //   {
        //     src: `icons/icon-256x256.png`,
        //     sizes: `256x256`,
        //     type: `image/png`,
        //     purpose: `maskable any`
        //   },
        //   {
        //     src: `icons/icon-384x384.png`,
        //     sizes: `384x384`,
        //     type: `image/png`,
        //     purpose: `maskable any`
        //   },
        //   {
        //     src: `icons/icon-512x512.png`,
        //     sizes: `512x512`,
        //     type: `image/png`,
        //     purpose: `maskable any`
        //   },
        // ],
        cache_busting_mode: 'none'
      },
    },
  ],
}