const config = {
	"gatsby": {
		"pathPrefix": "/learn/graphql/ios",
		"siteUrl": "https://hasura.io",
		"gaTrackingId": "GTM-WBBW2LN",
		"trailingSlash": true
	},
	"header": {
		"logo": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/logo.png",
		"logoLink": "https://hasura.io/learn/",
		"title": "<a href='https://hasura.io/learn/'>/ graphql </a><a href='https://hasura.io/learn/graphql/ios/introduction/'>/ ios</a>",
		"githubUrl": "https://github.com/hasura/learn-graphql",
		"helpUrl": "https://hasura.io/discord",
		"tweetText": "Check out this GraphQL course for iOS developers by @HasuraHQ https://hasura.io/learn/graphql/ios/introduction/",
		"links": [{
			"text": "hasura.io",
			"link": "https://hasura.io"
		}],
		"search": {
			"enabled": true,
			"indexName": "learn-ios-apollo",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction/",
    		"/intro-to-graphql/",
    		"/setup/",
    		"/apollo-client/",
    		"/queries/",
    		"/mutations-variables/",
    		"/optimistic-update-mutations/",
    		"/subscriptions/",
    		"/realtime-feed/",
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
		"title": "2 hour GraphQL course for iOS developers | Hasura",
		"description": "A concise and powerful tutorial that covers fundamental concepts of both GraphQL and using GraphQL in iOS",
		"ogImage": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-ios.png",
		"docsLocation": "https://github.com/hasura/learn-graphql/tree/master/tutorials/mobile/ios-apollo/tutorial-site/content",
		"favicon": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-ios/apple-favicon.png"
	},
};

module.exports = config;
