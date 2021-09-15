const config = {
	"gatsby": {
		"pathPrefix": "/learn/ja/graphql/hasura",
		"siteUrl": "https://hasura.io",
		"gaTrackingId": "GTM-WBBW2LN",
		"trailingSlash": true
	},
	"header": {
		"logo": "https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg",
		"logoLink": "https://hasura.io/learn/",
		"title": "learn <a href='https://hasura.io/learn/'>/ graphql </a><a href='https://hasura.io/learn/ja/graphql/hasura/introduction/'>/ hasura</a>",
		"githubUrl": "https://github.com/hasura/learn-graphql",
		"helpUrl": "https://discord.com/invite/hasura",
		"tweetText": "@HasuraHQ https://hasura.io/learn/ja/graphql/hasura/introduction/によるフロントエンド開発者向けのこのHasura GraphQLバックエンドコースの紹介をご覧ください。",
		"links": [{
			"text": "",
			"link": ""
		}],
		"search": {
			"enabled": false,
			"indexName": "learn-hasura-backend-ja",
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
			"link": "https://hasura.io/docs/latest/graphql/core/index.html"
			},
			{
			"text": "GraphQL API",
			"link": "https://hasura.io/graphql/"
			}
		]
	},
	"siteMetadata": {
		"title": "フロントエンド開発者向けのHasuraバックエンドコースの概要-Hasura",
		"description": "Hasuraを使用してGraphQLバックエンドを即座に開発する基本的な概念をカバーする簡潔で強力なチュートリアル",
		"ogImage": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-hasura-ja.png",
		"docsLocation": "https://github.com/hasura/learn-graphql/tree/master/tutorials/backend/hasura/tutorial-site-ja/content",
		"favicon": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-favicon.png"
	},
	"language": {
		"code": "ja"
	}
};

module.exports = config;
