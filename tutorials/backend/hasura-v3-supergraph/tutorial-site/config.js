const config = {
  gatsby: {
    pathPrefix: "/learn/graphql/hasura-v3-supergraph",
    siteUrl: "https://hasura.io",
    gaTrackingId: "GTM-WBBW2LN",
    trailingSlash: true,
  },
  header: {
    logo: "https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg",
    logoLink: "https://hasura.io/learn/",
    title:
      "<a href='https://hasura.io/learn/'>learn</a><img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/chevron-right.svg' alt='Chevron Right' /><a href='https://hasura.io/learn/graphql/hasura/hasura-v3-supergraph/introduction/'>hasura</a>",
    githubUrl: "https://github.com/hasura/learn-graphql",
    helpUrl: "https://discord.com/invite/hasura",
    tweetText:
      "Check out this Introduction to the Hasura v3 Supergraph modeling course for architects and backend engineers by @HasuraHQ https://hasura.io/learn/graphql/hasura/hasura-v3-supergraph/introduction/",
    links: [
      {
        text: "",
        link: "",
      },
    ],
    search: {
      enabled: true,
      indexName: "learn-hasura-v3-supergraph",
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: ["/introduction/", "/setup/", "/supergraph-modeling/", "/what-next/"],
    links: [
      {
        text: "Hasura Docs",
        link: "https://hasura.io/docs/3.0/",
      },
      {
        text: "GraphQL API",
        link: "https://hasura.io/graphql/",
      },
    ],
  },
  siteMetadata: {
    title: "Introduction to Hasura v3 Supergraph modeling course for architects and backend engineers | Hasura",
    description:
      "A concise and powerful tutorial that covers fundamental concepts of modeling a supergraph and instantly getting an API using Hasura",
    ogImage: "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-hasura.png",
    docsLocation:
      "https://github.com/hasura/learn-graphql/tree/master/tutorials/backend/hasura/hasura-v3-supergraph/tutorial-site/content",
    favicon: "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-favicon.png",
  },
  newsletter: {
    ebookAvailable: false,
  },
};

module.exports = config;
