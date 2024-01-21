const config = {
  gatsby: {
    pathPrefix: '/learn/graphql/hasura-v3-ts-connector',
    siteUrl: 'https://hasura.io',
    gaTrackingId: 'GTM-WBBW2LN',
    trailingSlash: true,
  },
  header: {
    logo: 'https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg',
    logoLink: 'https://hasura.io/learn/',
    title:
      "<a href='https://hasura.io/learn/'>learn</a><img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/chevron-right.svg' alt='Chevron Right' /><a href='https://hasura.io/learn/graphql/hasura/introduction/'>hasura</a>",
    githubUrl: 'https://github.com/hasura/learn-graphql',
    helpUrl: 'https://discord.com/invite/hasura',
    tweetText:
      'Check out this course in building TypeScript data connectors for Hasura DDN by @HasuraHQ https://hasura.io/learn/graphql/react-apollo-components/introduction/',
    links: [
      {
        text: '',
        link: '',
      },
    ],
    search: {
      enabled: true,
      indexName: 'learn-hasura-backend',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: ['/introduction/', '/get_started/', '/predicates/', '/ordering/', '/aggregates/', '/conclusion/'],
    links: [
      {
        text: 'Hasura Docs',
        link: 'https://hasura.io/docs/latest/graphql/core/index/',
      },
      {
        text: 'GraphQL API',
        link: 'https://hasura.io/graphql/',
      },
    ],
  },
  siteMetadata: {
    title: 'Build a data connector for Hasura DDN using TypeScript | Hasura',
    description:
      'A concise tutorial that covers the fundamental concepts of building a data connector for Hasura DDN using TypeScript',
    ogImage: 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-hasura.png',
    docsLocation: 'https://github.com/hasura/learn-graphql/tree/master/tutorials/backend/hasura/tutorial-site/content',
    favicon: 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-favicon.png',
  },
  language: {
    code: 'en',
    name: 'English',
    translations: [
      {
        code: 'ja',
        name: 'Japanese',
        link: 'https://hasura.io/learn/ja/graphql/hasura/introduction/',
      },
      {
        code: 'es',
        name: 'Spanish',
        link: 'https://hasura.io/learn/es/graphql/hasura/introduction/',
      },
      {
        code: 'zh',
        name: 'Chinese',
        link: 'https://hasura.io/learn/zh/graphql/hasura/introduction/',
      },
    ],
  },
  newsletter: {
    ebookAvailable: true,
  },
};

module.exports = config;
