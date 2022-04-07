const config = {
  gatsby: {
    pathPrefix: "/learn/database/yugabyte",
    siteUrl: "https://hasura.io",
    gaTrackingId: "GTM-WBBW2LN",
    trailingSlash: true,
  },
  header: {
    logo: "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/yugabyte-logo.png",
    logoLink: "https://hasura.io/learn/",
    title:
      "<a href='https://hasura.io/learn/'>learn</a><img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/chevron-right.svg' alt='Chevron Right' /><a href='https://hasura.io/learn/database/yugabyte/introduction/'>yugabyte</a>",
    githubUrl: "https://github.com/hasura/learn-graphql",
    helpUrl: "https://discord.com/invite/hasura",
    tweetText:
      "Check out this Yugabyte course for developers by @HasuraHQ https://hasura.io/learn/database/yugabyte/introduction/",
    links: [
      {
        text: "",
        link: "",
      },
    ],
    search: {
      enabled: true,
      indexName: "learn-database-yugabyte",
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      "/introduction/",
      "/installation/",
      "/connect-hasura-yugabyte/",
      "/create-sample-database/",
      "/query-data-graphql/",
      "/update-data-graphql/",
      "/connect-to-hasura-programatically/",
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
  },
  siteMetadata: {
    title: "Introduction to Yugabyte database for developers | Hasura",
    description:
      "A concise and powerful tutorial that covers fundamental concepts of Yugabyte instantly and how to leverage it with Hasura",
    ogImage:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-yugabyte.png",
    docsLocation:
      "https://github.com/hasura/learn-graphql/tree/master/tutorials/database/yugabyte/tutorial-site/content",
    favicon:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-favicon.png",
  },
};

module.exports = config;
