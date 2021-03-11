require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title:  'TITLE',
    description: `DESCRIPTION`,
    title_en:  'TITLE_EN',
    title_da: 'TITLE_DA',
    description_en: "DESCRIPTION_EN",
    description_da: "DESCRIPTION_DA",
    siteUrl: 'https://siteurl.com', //to be changed
    author: 'Lars Ejaas',
    right_en: 'All rights reserved Lars Ejaas. Please contact me directly to get my consent before using any content from this page',
    right_da: 'Alle rettigheder forbeholdes Lars Ejaas. Kontakt mig direkte for at få mit samtykke, inden du bruger indhold fra denne side',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-image`,
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    `gatsby-plugin-brotli`,
    `gatsby-plugin-preact`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-tmdb',
      options: {
        apiKey: process.env.GATSBY_API_KEY,
        sessionID: process.env.SESSION_ID,
        region: 'DK',
        modules: {
          account: {
            activate: true,
            endpoints: {
              tvs: ['accountFavoriteTv', 'accountTvWatchlist'],
              movies: ['accountFavoriteMovies', 'accountMovieWatchlist'],
              list: 'accountLists',
            },
          },
        },
        timezone: 'Europe/Berlin',
        reqPerTenSeconds: 32,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'NAME',
        short_name: 'SHORTNAME',
        start_url: '/',
        background_color: '#272B35',
        theme_color: '#00d374',
        display: 'standalone',
        orientation: `portrait`,
        include_favicon: false,
        icons: [
          {
            src: `icons/icon-48x48.png`,
            sizes: `48x48`,
            type: `image/png`,
            purpose: `maskable any`
          },
          {
            src: `icons/icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
            purpose: `maskable any`
          },
          {
            src: `icons/icon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
            purpose: `maskable any`
          },
          {
            src: `icons/icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
            purpose: `maskable any`
          },
	        {
            src: `icons/icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
            purpose: `maskable any`
          },
          {
            src: `icons/icon-256x256.png`,
            sizes: `256x256`,
            type: `image/png`,
            purpose: `maskable any`
          },
          {
            src: `icons/icon-384x384.png`,
            sizes: `384x384`,
            type: `image/png`,
            purpose: `maskable any`
          },
          {
            src: `icons/icon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
            purpose: `maskable any`
          },
        ],
        cache_busting_mode: 'none'
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
         precachePages: [`/*`,`/en/*` ],
         workboxConfig: {
            globPatterns: ['**/icon-*']
         }
      }
   }
  ],
}
