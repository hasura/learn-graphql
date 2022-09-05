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
		"title": "<a href='https://hasura.io/learn/'>learn</a><img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/chevron-right.svg' alt='Chevron Right' /><a href='https://hasura.io/learn/ja/graphql/hasura/introduction/'>hasura</a>",
		"githubUrl": "https://github.com/hasura/learn-graphql",
		"helpUrl": "https://discord.com/invite/hasura",
		"tweetText": "@HasuraHQ https://hasura.io/learn/ja/graphql/hasura/introduction/ によるフロントエンド開発者向けのこのHasura GraphQLバックエンドコースの紹介をご覧ください。",
		"links": [{
			"text": "",
			"link": ""
		}],
		"search": {
			"enabled": true,
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
			"link": "https://hasura.io/docs/latest/graphql/core/index/"
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
    "code": "ja",
    "name": "Japanese",
    "translations": [
      {
        "code": "zh",
        "name": "Chinese",
        "link": "https://hasura.io/learn/zh/graphql/hasura/introduction/"
      },
      {
        "code": "es",
        "name": "Spanish",
        "link": "https://hasura.io/learn/es/graphql/hasura/introduction/"
      },
      {
        "code": "en",
        "name": "English",
        "link": "https://hasura.io/learn/graphql/hasura/introduction/"
      },
    ]
	}
};

module.exports = config;
