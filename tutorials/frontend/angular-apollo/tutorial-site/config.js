const config = {
	"gatsby": {
		"pathPrefix": "/learn/graphql/angular-apollo",
		"siteUrl": "https://hasura.io",
		"gaTrackingId": "GTM-WBBW2LN",
		"trailingSlash": true
	},
	"header": {
		"logo": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/logo.png",
		"logoLink": "https://hasura.io/learn/",
		"title": "<a href='https://hasura.io/learn/'>/ graphql </a><a href='https://hasura.io/learn/graphql/angular-apollo/introduction/'>/ angular-apollo</a>",
		"githubUrl": "https://github.com/hasura/learn-graphql",
		"helpUrl": "https://discordapp.com/invite/vBPpJkS",
		"tweetText": "Check out this GraphQL course for Angular developers by @HasuraHQ https://hasura.io/learn/graphql/angular-apollo/introduction/",
		"links": [{
			"text": "hasura.io",
			"link": "https://hasura.io"
		}],
		"search": {
			"enabled": true,
			"indexName": "learn-angular-apollo",
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
		"title": "2 hour GraphQL course for Angular developers | Hasura",
		"description": "A concise and powerful tutorial that covers fundamental concepts of both GraphQL and using GraphQL in Angular",
		"ogImage": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-angular.png",
		"docsLocation": "https://github.com/hasura/learn-graphql/tree/master/tutorials/frontend/angular-apollo/tutorial-site/content",
		"favicon": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/angular-favicon.png"
	},
};

module.exports = config;
