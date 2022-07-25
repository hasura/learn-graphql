const config = {
    gatsby: {
        pathPrefix: "/learn/graphql/vue",
        siteUrl: "https://hasura.io",
        gaTrackingId: "GTM-WBBW2LN",
        trailingSlash: true,
    },
    header: {
        logo: "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-vue/vue-favicon.png",
        logoLink: "https://hasura.io/learn/",
        title: "<a href='https://hasura.io/learn/'>learn</a><img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/chevron-right.svg' alt='Chevron Right' /><a href='https://hasura.io/learn/graphql/vue/introduction/'>vue-3</a>",
        githubUrl: "https://github.com/hasura/learn-graphql",
        helpUrl: "https://discord.com/invite/hasura",
        tweetText:
            "Check out this GraphQL course for Vue developers by @HasuraHQ https://hasura.io/learn/graphql/vue/introduction/",
        links: [
            {
                text: "",
                link: "",
            },
        ],
        search: {
            enabled: true,
            indexName: "learn-vue-apollo",
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
        title: "2 hour GraphQL course for Vue developers | Hasura",
        description:
            "A concise and powerful tutorial that covers fundamental concepts of both GraphQL and using GraphQL in Vue",
        ogImage: "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-vue.png",
        docsLocation:
            "https://github.com/hasura/learn-graphql/tree/master/tutorials/frontend/vue-apollo/tutorial-site/content",
        favicon: "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-favicon.png",
    },
}

module.exports = config
