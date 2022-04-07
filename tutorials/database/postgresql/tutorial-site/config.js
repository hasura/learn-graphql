const config = {
  gatsby: {
    pathPrefix: "/learn/database/postgresql",
    siteUrl: "https://hasura.io",
    gaTrackingId: "GTM-WBBW2LN",
    trailingSlash: true,
  },
  header: {
    logo: "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-postgresql/postgres-logo.png",
    logoLink: "https://hasura.io/learn/",
    title:
      "<a href='https://hasura.io/learn/'>learn</a><img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/chevron-right.svg' alt='Chevron Right' /><a href='https://hasura.io/learn/database/postgresql/introduction/'>postgresql</a>",
    githubUrl: "https://github.com/hasura/learn-graphql",
    helpUrl: "https://discord.com/invite/hasura",
    tweetText:
      "Check out this PostgreSQL course for developers by @HasuraHQ https://hasura.io/learn/database/postgresql/introduction/",
    links: [
      {
        text: "",
        link: "",
      },
    ],
    search: {
      enabled: true,
      indexName: "learn-database-postgresql",
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      "/introduction/",
      "/what-is-postgresql/",
      "/installation/",
      "/core-concepts/",
      "/create-alter-drop-ddl/",
      "/querying-inserting-dml/",
      "/views/",
      "/triggers/",
      "/performance/",
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
    title: "Introduction to PostgreSQL database for developers | Hasura",
    description:
      "A concise and powerful tutorial that covers fundamental concepts of PostgreSQL instantly and how to leverage it with Hasura",
    ogImage:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-postgresql.png",
    docsLocation:
      "https://github.com/hasura/learn-graphql/tree/master/tutorials/database/postgresql/tutorial-site/content",
    favicon:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-favicon.png",
  },
};

module.exports = config;
