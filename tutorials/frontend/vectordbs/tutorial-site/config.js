const config = {
  gatsby: {
    pathPrefix: "/learn/graphql/vectordbs",
    siteUrl: "https://hasura.io",
    gaTrackingId: "GTM-WBBW2LN",
    trailingSlash: true,
  },
  header: {
    logo: "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-nextjs/nextjs-favicon.png",
    logoLink: "https://hasura.io/learn/",
    title:
      "<a href='https://hasura.io/learn/'>learn</a><img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/chevron-right.svg' alt='Chevron Right' /><a href='https://hasura.io/learn/graphql/vectordbs/introduction/'>vectordbs</a>",
    githubUrl: "https://github.com/hasura/learn-graphql",
    helpUrl: "https://discord.com/invite/hasura",
    tweetText: "Check out this VectorDBs course by @HasuraHQ https://hasura.io/learn/vectordbs/introduction/",
    links: [
      {
        text: "",
        link: "",
      },
    ],
    search: {
      enabled: true,
      indexName: "learn-vectordbs",
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      "/introduction/",
      "/setup-and-installation/",
      "/connect-hasura/",
      "/query-data/",
      "/handle-events/",
      "/add-a-frontend/",
      "/what-next/",
    ],
    links: [
      {
        text: "Hasura Docs",
        link: "https://hasura.io/docs/latest/index/",
      },
      {
        text: "GraphQL API",
        link: "https://hasura.io/graphql/",
      },
    ],
    frontline: false,
    ignoreIndex: true,
  },
  siteMetadata: {
    title: "1-hour VectorDB course for fullstack developers",
    description: "Everything you need to build a VectorDBs app and integrate LLMs with your modern application!",
    ogImage:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-vectordbs.png",
    docsLocation: "https://github.com/hasura/learn-graphql/tree/master/tutorials/frontend/vectordbs/tutorial-site/content",
    favicon: "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-favicon.png",
  },
};

module.exports = config;
