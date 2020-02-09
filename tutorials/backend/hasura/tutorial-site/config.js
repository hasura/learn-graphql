const config = {
	"gatsby": {
		"pathPrefix": "/learn/graphql/hasura",
		"siteUrl": "https://hasura.io/learn",
		"gaTrackingId": "UA-59768903-1"
	},
	"header": {
		"logo": "https://graphql-engine-cdn.hasura.io/img/hasura_icon_white.svg",
		"title": "/ graphql / hasura",
		"githubUrl": "https://github.com/hasura/learn-graphql",
		"helpUrl": "https://discordapp.com/invite/vBPpJkS",
		"tweetText": "Check out this Introduction to Hasura GraphQL backend course for frontend developers by @HasuraHQ https://hasura.io/learn/graphql/hasura",
		"links": [{
			"text": "hasura.io",
			"link": "https://hasura.io"
		}],
		"search": {
			"enabled": true,
			"indexName": "learn-hasura-backend",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction",
    		"/setup",
    		"/data-modelling",
    		"/relationships",
    		"/data-transformations",
    		"/authorization",
    		"/authentication",
    		"/custom-business-logic",
    		"/what-next"
    	],
		"links": [
			{
			"text": "Hasura Docs",
			"link": "https://docs.hasura.io"
			},
			{
			"text": "GraphQL Docs",
			"link": "https://graphql.org/learn"
			}
		]
	},
	"siteMetadata": {
		"title": "Introduction to Hasura backend course for frontend developers | Hasura",
		"description": "A concise and powerful tutorial that covers fundamental concepts of developing GraphQL backends instantly using Hasura",
		"ogImage": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-hasura.png",
		"docsLocation": "https://github.com/hasura/learn-graphql/tree/master/tutorials/backend/hasura/tutorial-site/content",
		"favicon": "https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg"
	},
};

module.exports = config;
