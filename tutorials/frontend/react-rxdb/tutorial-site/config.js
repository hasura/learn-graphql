const config = {
	"gatsby": {
		"pathPrefix": "/learn/graphql/react-apollo-components",
		"siteUrl": "https://hasura.io",
		"gaTrackingId": "GTM-WBBW2LN",
		"trailingSlash": true
	},
	"header": {
		"logo": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/logo.png",
		"logoLink": "https://hasura.io/learn/",
		"title": "<a href='https://hasura.io/learn/'>/ graphql </a><a href='https://hasura.io/learn/graphql/offline-first/introduction'>/ offline-first </a>",
		"githubUrl": "https://github.com/hasura/learn-graphql",
		"helpUrl": "https://discordapp.com/invite/vBPpJkS",
		"tweetText": "Check out this Offline first course for React developers by @HasuraHQ https://hasura.io/learn/graphql/offline-first/introduction",
		"links": [{
			"text": "hasura.io",
			"link": "https://hasura.io"
		}],
		"search": {
			"enabled": false,
			"indexName": "learn-react-apollo",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction/",
				"/intro-to-offline-first/",
				"/hasura-setup/",
				"/frontend-setup/",
				"/syncing-rxdb-with-hasura/"
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
		"title": "2 hour course on offline first for React developers | Hasura",
		"description": "A concise and powerful tutorial that covers fundamental concepts of Offline first and implementing offline first in a React App using RxDB",
		"ogImage": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-react.png",
		"docsLocation": "https://github.com/hasura/learn-graphql/tree/master/tutorials/frontend/react-apollo/tutorial-site/content",
		"favicon": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/react-favicon.png"
	},
};

module.exports = config;
