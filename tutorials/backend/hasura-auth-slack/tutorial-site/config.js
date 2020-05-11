const config = {
	"gatsby": {
		"pathPrefix": "/learn/graphql/hasura-auth-slack",
		"siteUrl": "https://hasura.io",
		"gaTrackingId": "GTM-WBBW2LN",
		"trailingSlash": true
	},
	"header": {
		"logo": "https://graphql-engine-cdn.hasura.io/img/hasura_icon_white.svg",
		"logoLink": "https://hasura.io/learn/",
		"title": "<a href='https://hasura.io/learn/'>/ graphql </a><a href='https://hasura.io/learn/graphql/hasura-auth-slack/introduction/'>/ hasura-auth-slack</a>",
		"githubUrl": "https://github.com/hasura/learn-graphql",
		"helpUrl": "https://discordapp.com/invite/vBPpJkS",
		"tweetText": "Check out this Hasura GraphQL Auth backend course by @HasuraHQ https://hasura.io/learn/graphql/hasura-auth-slack/introduction/",
		"links": [{
			"text": "hasura.io",
			"link": "https://hasura.io"
		}],
		"search": {
			"enabled": true,
			"indexName": "learn-hasura-auth-slack",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction/",
    		"/setup/",
    		"/data-modelling/",
    		"/thinking-in-roles/",
    		"/access-control/",
    		"/choosing-jwt-mode/",
    		"/production-ready-auth/",
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
		]
	},
	"siteMetadata": {
		"title": "Hasura Auth Tutorial",
		"description": "A concise and powerful tutorial that covers fundamental concepts of integrating Auth with GraphQL backends instantly using Hasura",
		"ogImage": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-hasura-auth-slack.png",
		"docsLocation": "https://github.com/hasura/learn-graphql/tree/master/tutorials/backend/hasura-auth-slack/tutorial-site/content",
		"favicon": "https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg"
	},
};

module.exports = config;
