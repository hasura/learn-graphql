const config = {
	"gatsby": {
		"pathPrefix": "/learn/graphql/unity",
		"siteUrl": "https://hasura.io",
		"gaTrackingId": "UA-59768903-1",
		"trailingSlash": true
	},
	"header": {
		"logo": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/logo.png",
		"logoLink": "https://hasura.io/learn/",
		"title": "<a href='https://hasura.io/learn/'>/ graphql </a><a href='https://hasura.io/learn/graphql/unity/introduction/'>/ unity</a>",
		"githubUrl": "https://github.com/hasura/learn-graphql",
		"helpUrl": "https://discordapp.com/invite/vBPpJkS",
		"tweetText": "Check out this GraphQL course for Unity Developers by @HasuraHQ https://hasura.io/learn/graphql/unity/introduction/",
		"links": [{
			"text": "hasura.io",
			"link": "https://hasura.io"
		}],
		"search": {
			"enabled": true,
			"indexName": "learn-android-apollo",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction/",
    		"/intro-to-graphql/",
			"/matchmaking/",
    		"/realtime-gameplay/",
    		"/authentication/",
			"/leaderboard/"
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
		"title": "GraphQL course for Unity Developers | Hasura",
		"description": "A great tutorial showing how to integrate multiplayer features in Unity games using Hasura",
		"ogImage": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-android.png",
		"docsLocation": "https://github.com/hasura/learn-graphql/tree/master/tutorials/mobile/unity/tutorial-site/content",
		"favicon": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-android/android-favicon.png"
	},
};

module.exports = config;
