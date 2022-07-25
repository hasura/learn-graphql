const config = {
  gatsby: {
    pathPrefix: "/learn/graphql/flutter-graphql",
    siteUrl: "https://hasura.io",
    gaTrackingId: "GTM-WBBW2LN",
    trailingSlash: true,
  },
  header: {
    logo: "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-flutter/flutter-favicon.png",
    logoLink: "https://hasura.io/learn/",
    title:
      "<a href='https://hasura.io/learn/'>learn</a><img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/chevron-right.svg' alt='Chevron Right' /><a href='https://hasura.io/learn/graphql/flutter-graphql/introduction/'>flutter</a>",
    githubUrl: "https://github.com/hasura/learn-graphql",
    helpUrl: "https://discord.com/invite/hasura",
    tweetText:
      "Check out this GraphQL course for Flutter developers by @HasuraHQ https://hasura.io/learn/graphql/flutter-graphql/introduction/",
    links: [
      {
        text: "hasura.io",
        link: "",
      },
    ],
    search: {
      enabled: true,
      indexName: "learn-flutter-graphql",
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      "/introduction/",
      "/intro-to-graphql/",
      "/setup/",
      "/graphql-client/",
      "/queries/",
      "/mutations/",
      "/update-delete-mutations/",
      "/subscriptions/",
      "/realtime-feed/",
      "/logout/",
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
    title: "2 hour GraphQL course for Flutter developers | Hasura",
    description:
      "A concise and powerful tutorial that covers fundamental concepts of both GraphQL and using GraphQL in Flutter",
    ogImage:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-flutter.png",
    docsLocation:
      "https://github.com/hasura/learn-graphql/tree/master/tutorials/mobile/flutter-graphql/tutorial-site/content",
    favicon: "",
  },
};

module.exports = config;
