const config = {
	"gatsby": {
		"pathPrefix": "/learn/es/graphql/hasura-advanced",
		"siteUrl": "https://hasura.io",
		"gaTrackingId": "GTM-WBBW2LN",
		"trailingSlash": true
	},
	"header": {
		"logo": "https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg",
		"logoLink": "https://hasura.io/learn/",
		"title": "<a href='https://hasura.io/learn/'>learn</a><img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/chevron-right.svg' alt='Chevron Right' /><a href='https://hasura.io/learn/es/graphql/hasura-advanced/introduction/'>hasura-advanced</a>",
		"githubUrl": "https://github.com/hasura/learn-graphql",
		"helpUrl": "https://discord.com/invite/hasura",
		"tweetText": "Check out this Advanced Hasura GraphQL Backend course by @HasuraHQ in Spanish https://hasura.io/learn/es/graphql/hasura-advanced/introduction/",
		"links": [{
			"text": "",
			"link": ""
		}],
		"search": {
			"enabled": true,
			"indexName": "learn-hasura-advanced-es",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction/",
    		"/setup/",
    		"/data-modeling/",
    		"/relationships/",
    		"/data-transformations/",
    		"/authorization/",
    		"/authentication/",
    		"/custom-business-logic/",
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
		]
	},
	"siteMetadata": {
		"title": "",
		"description": "",
		"ogImage": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-hasura-advanced-es.png",
		"docsLocation": "https://github.com/hasura/learn-graphql/tree/master/tutorials/backend/hasura-advanced/tutorial-site-es/content",
		"favicon": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-favicon.png"
	},
	"language": {
		"code": "es",
		"name": "Spanish",
		"translations": [
		{
			"code": "zh",
			"name": "Chinese",
			"link": "https://hasura.io/learn/zh/graphql/hasura-advanced/introduction/"
		},
		{
			"code": "ja",
			"name": "Japanese",
			"link": "https://hasura.io/learn/ja/graphql/hasura-advanced/introduction/"
		},
		{
			"code": "en",
			"name": "English",
			"link": "https://hasura.io/learn/graphql/hasura-advanced/introduction/"
		},
		]
	}
};

module.exports = config;
