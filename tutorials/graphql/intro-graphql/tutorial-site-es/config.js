const config = {
	"gatsby": {
		"pathPrefix": "/learn/es/graphql/intro-graphql",
		"siteUrl": "https://hasura.io",
		"gaTrackingId": "GTM-WBBW2LN",
		"trailingSlash": true
	},
	"header": {
		"logo": 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-intro/graphql-favicon.png',
		"logoLink": "https://hasura.io/learn/",
		"title": "<a href='https://hasura.io/learn/'>learn</a><img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/chevron-right.svg' alt='Chevron Right' /><a href='https://hasura.io/learn/es/graphql/intro-graphql/introduction/'>intro-graphql</a>",
		"githubUrl": "https://github.com/hasura/learn-graphql",
		"helpUrl": "https://discord.com/invite/hasura",
		"tweetText": "Check out this Introduction to GraphQL course for Fullstack developers by @HasuraHQ in Spanish https://hasura.io/learn/es/graphql/intro-graphql/introduction/",
		"links": [{
			"text": "",
			"link": ""
		}],
		"search": {
			"enabled": true,
			"indexName": "learn-intro-graphql-es",
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
			"link": "https://hasura.io/docs/latest/graphql/core/index/"
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
		"title": "",
		"description": "",
		"ogImage": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-intro-graphql-es.png",
		"docsLocation": "https://github.com/hasura/learn-graphql/tree/master/tutorials/graphql/intro-graphql/tutorial-site-es/content",
		"favicon": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-favicon.png"
	},
	"language": {
		"code": "es",
		"name": "Spanish",
		"translations": [
		{
			"code": "ja",
			"name": "Japanese",
			"link": "https://hasura.io/learn/ja/graphql/intro-graphql/introduction/"
		},
		{
			"code": "zh",
			"name": "Chinese",
			"link": "https://hasura.io/learn/zh/graphql/intro-graphql/introduction/"
		},
		{
			"code": "en",
			"name": "English",
			"link": "https://hasura.io/learn/graphql/intro-graphql/introduction/"
		},
		]
	}
};

module.exports = config;
