const config = {
	"gatsby": {
		"pathPrefix": "/learn/graphql/unity",
		"siteUrl": "https://hasura.io",
		"gaTrackingId": "GTM-WBBW2LN",
		"trailingSlash": true
	},
	"header": {
		"logo": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/unity-favicon.png",
		"logoLink": "https://hasura.io/learn/",
		"title": "learn <a href='https://hasura.io/learn/'>/ graphql </a><a href='https://hasura.io/learn/graphql/unity/introduction/'>/ unity</a>",
		"githubUrl": "https://github.com/hasura/learn-graphql",
		"helpUrl": "https://discord.com/invite/hasura",
		"tweetText": "Check out this GraphQL course for Unity Developers by @HasuraHQ https://hasura.io/learn/graphql/unity/introduction/",
		"links": [{
			"text": "Hasura Home",
			"link": "https://hasura.io"
		}],
		"search": {
			"enabled": false,
			"indexName": "learn-unity",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction/",
    		"/intro-to-graphql/",
    		"/unity-setup/",
    		"/hasura-setup/",
			"/matchmaking/",
    		"/realtime-gameplay/",
    		"/authentication/",
			"/leaderboard/"
    	],
		"links": [
			{
			"text": "Hasura Docs",
			"link": "https://hasura.io/docs/latest/graphql/core/index.html"
			},
			{
			"text": "GraphQL API",
			"link": "https://hasura.io/graphql/"
			}
		],
		"frontline": false,
		"ignoreIndex": true
	},
	"siteMetadata": {
		"title": "GraphQL Tutorial for Unity Developers | Hasura",
		"description": "A great tutorial showing how to integrate multiplayer features in Unity games using Hasura",
		"ogImage": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-unity.png",
		"docsLocation": "https://github.com/hasura/learn-graphql/tree/master/tutorials/mobile/unity/tutorial-site/content",
		"favicon": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-favicon.png"
	},
};

module.exports = config;
