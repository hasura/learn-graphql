const config = {
  gatsby: {
    pathPrefix: "/learn/graphql/hasura-authorization-advanced",
    siteUrl: "https://hasura.io",
    gaTrackingId: "GTM-WBBW2LN",
    trailingSlash: true,
  },
  header: {
    logo: "https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg",
    logoLink: "https://hasura.io/learn/",
    title:
      "<a href='https://hasura.io/learn/'>learn</a><img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/chevron-right.svg' alt='Chevron Right' /><a href='https://hasura.io/learn/graphql/hasura-advanced/introduction/'>hasura-advanced</a>",
    githubUrl: "https://github.com/hasura/learn-graphql",
    helpUrl: "https://discord.com/invite/hasura",
    tweetText:
      "Check out this Advanced Hasura Authorization course by @HasuraHQ https://hasura.io/learn/graphql/hasura-authorization-advanced/introduction/",
    links: [
      {
        text: "",
        link: "",
      },
    ],
    search: {
      enabled: true,
      indexName: "learn-hasura-authorization-advanced",
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      "/introduction/",
      "/multi-tenant-authorization/"
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
    title: "Hasura Advanced Authorization Course",
    description:
      "A concise and powerful tutorial that covers advanced concepts of authorization patterns in production using Hasura Cloud",
    ogImage:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-hasura-authorization-advanced.png",
    docsLocation:
      "https://github.com/hasura/learn-graphql/tree/master/tutorials/backend/hasura-authorization-advanced/tutorial-site/content",
    favicon:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-favicon.png",
  }
};

module.exports = config;
