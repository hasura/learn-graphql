const config = {
  gatsby: {
    pathPrefix: "/learn/graphql/remix-fullstack-firebase",
    siteUrl: "https://hasura.io",
    gaTrackingId: "GTM-WBBW2LN",
    trailingSlash: true,
  },
  header: {
    logo: "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-remix/remix-favicon.png",
    logoLink: "https://hasura.io/learn/",
    title:
      "<a href='https://hasura.io/learn/'>learn</a><img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/chevron-right.svg' alt='Chevron Right' /><a href='https://hasura.io/learn/graphql/remix-fullstack-firebase/introduction/'>Remix</a>",
    githubUrl: "https://github.com/hasura/learn-graphql",
    helpUrl: "https://discord.com/invite/hasura",
    tweetText:
      "Check out this GraphQL course for Remix developers by @HasuraHQ https://hasura.io/learn/graphql/remix-fullstack-firebase/introduction/",
    links: [
      {
        text: "",
        link: "",
      },
    ],
    search: {
      enabled: true,
      indexName: "learn-remix-fullstack-firebase",
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      "/introduction/",
      "/frontend/",
      "/firebase/",
      "/auth-in-remix/",
      "/hasura-backend/",
      "/codegen/",
      "/launches-index-page/",
      "/launch-details-page/",
      "/cloud-deployment/",
      "/what-next/",
    ],
    links: [
      {
        text: "Hasura Docs",
        link: "https://hasura.io/docs/latest/graphql/core/index/",
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
    title: "A fullstack Remix tutorial with Firebase and Hasura GraphQL",
    description:
      "A tutorial that combines Remix with Firebase, Hasura and GraphQL",
    ogImage:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-remix-fullstack-firebase.png",
    docsLocation:
      "https://github.com/hasura/learn-graphql/tree/master/tutorials/frontend/remix-firebase/tutorial-site/content",
    favicon:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-favicon.png",
  },
};

module.exports = config;
