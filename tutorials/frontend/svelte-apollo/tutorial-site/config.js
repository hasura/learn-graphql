const config = {
  gatsby: {
    pathPrefix: "/learn/graphql/svelte-apollo",
    siteUrl: "https://hasura.io",
    gaTrackingId: "GTM-WBBW2LN",
    trailingSlash: true,
  },
  header: {
    logo: "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-svelte/svelte-favicon.png",
    logoLink: "https://hasura.io/learn/",
    title:
      "<a href='https://hasura.io/learn/'>learn</a><img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/chevron-right.svg' alt='Chevron Right' /><a href='https://hasura.io/learn/graphql/svelte-apollo/introduction/'>svelte</a>",
    githubUrl: "https://github.com/hasura/learn-graphql",
    helpUrl: "https://discord.com/invite/hasura",
    tweetText:
      "Check out this GraphQL course for Svelte developers by @HasuraHQ https://hasura.io/learn/graphql/svelte-apollo/introduction/",
    links: [
      {
        text: "",
        link: "",
      },
    ],
    search: {
      enabled: true,
      indexName: "learn-svelte-apollo",
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
      "/apollo-client/",
      "/queries/",
      "/mutations-variables/",
      "/optimistic-update-mutations/",
      "/subscriptions/",
      "/realtime-feed/",
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
    title: "2 hour GraphQL Apollo course for Svelte developers | Hasura",
    description:
      "A concise and powerful tutorial that covers fundamental concepts of both GraphQL and using GraphQL in Svelte apps with Apollo",
    ogImage:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-svelte-apollo.png",
    docsLocation:
      "https://github.com/hasura/learn-graphql/tree/master/tutorials/frontend/svelte-apollo/tutorial-site/content",
    favicon:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-favicon.png",
  },
};

module.exports = config;
