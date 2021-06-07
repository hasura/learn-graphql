const config = {
  gatsby: {
    pathPrefix: "/learn/graphql/rescript",
    siteUrl: "https://hasura.io",
    gaTrackingId: "GTM-WBBW2LN",
    trailingSlash: true,
  },
  header: {
    logo: "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/logo.png",
    logoLink: "https://hasura.io/learn/",
    title:
      "<a href='https://hasura.io/learn/'>/ graphql </a><a href='https://hasura.io/learn/graphql/rescript/introduction/'>/ react</a>",
    githubUrl: "https://github.com/hasura/learn-graphql",
    helpUrl: "https://discord.com/invite/hasura",
    tweetText:
      "Check out this GraphQL course for React developers by @HasuraHQ https://hasura.io/learn/graphql/rescript/introduction/",
    links: [
      {
        text: "Hasura Home",
        link: "https://hasura.io",
      },
    ],
    search: {
      enabled: true,
      indexName: "learn-rescript-react-apollo",
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
      "/mutations/",
      "/optimistic-update-mutations/",
      "/subscriptions/",
      "/what-next/",
    ],
    links: [
      {
        text: "Hasura Docs",
        link: "https://hasura.io/docs/latest/graphql/core/index.html",
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
    title: "2 hour GraphQL Apollo course for React developers | Hasura",
    description:
      "A concise and powerful tutorial that covers fundamental concepts of both GraphQL and using GraphQL in React with Apollo Hooks",
    ogImage:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-rescript-react-apollo.png",
    docsLocation:
      "https://github.com/hasura/learn-graphql/tree/master/tutorials/frontend/rescript-react-apollo/tutorial-site/content",
    favicon:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/react-favicon.png",
  },
};

module.exports = config;
