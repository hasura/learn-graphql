const config = {
	"gatsby": {
		"pathPrefix": "/learn/graphql/intro-graphql",
		"siteUrl": "https://hasura.io",
		"gaTrackingId": "GTM-WBBW2LN",
		"trailingSlash": true
	},
	"header": {
		"logo": 'https://graphql-engine-cdn.hasura.io/img/hasura_icon_white.svg',
		"logoLink": "https://hasura.io/learn/",
		"title": "<a href='https://hasura.io/learn/'>/ graphql </a><a href='https://hasura.io/learn/graphql/intro-graphql/introduction/'>/ intro-graphql</a>",
		"githubUrl": "https://github.com/hasura/learn-graphql",
		"helpUrl": "https://hasura.io/discord",
		"tweetText": "Check out this Introduction to GraphQL course for Fullstack developers by @HasuraHQ https://hasura.io/learn/graphql/intro-graphql/introduction/",
		"links": [{
			"text": "hasura.io",
			"link": "https://hasura.io"
		}],
		"search": {
			"enabled": true,
			"indexName": "learn-intro-graphql",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction/",
    		"/what-is-graphql/",
    		"/graphql-vs-rest/",
    		"/core-concepts/",
    		"/introspection/",
    		"/graphql-queries/",
    		"/graphql-mutations/",
    		"/graphql-subscriptions/",
    		"/graphql-server/",
    		"/graphql-client/",
    		"/what-next/"
    	],
		"links": [
			{
			"text": "Hasura Docs",
			"link": "https://hasura.io/docs"
			},
			{
			"text": "GraphQL Docs",
			"link": "https://graphql.org/learn"
			}
		],
		"frontline": false,
		"ignoreIndex": true
	},
	"siteMetadata": {
		"title": "Introduction to GraphQL Tutorial for Fullstack Developers",
		"description": "A concise and powerful tutorial that covers fundamental concepts of GraphQL, GraphQL vs REST, GraphQL server and client",
		"ogImage": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-intro-graphql.png",
		"docsLocation": "https://github.com/hasura/learn-graphql/tree/master/tutorials/graphql/intro-graphql/tutorial-site/content",
		"favicon": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-intro/graphql-favicon.png"
	},
};

module.exports = config;
