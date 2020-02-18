const config = {
	"gatsby": {
		"pathPrefix": "/learn/graphql/reason-react-apollo",
		"siteUrl": "https://hasura.io",
		"gaTrackingId": "UA-59768903-1",
		"trailingSlash": true
	},
	"header": {
		"logo": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/logo.png",
		"logoLink": "https://hasura.io/learn/",
		"title": "<a href='https://hasura.io/learn/'>/ graphql </a><a href='https://hasura.io/learn/graphql/reason-react-apollo/introduction/'>/ reason-react-apollo</a>",
		"githubUrl": "https://github.com/hasura/learn-graphql",
		"helpUrl": "https://discordapp.com/invite/vBPpJkS",
		"tweetText": "Check out this GraphQL course for Reason React developers by @HasuraHQ https://hasura.io/learn/graphql/reason-react-apollo/introduction/",
		"links": [{
			"text": "hasura.io",
			"link": "https://hasura.io"
		}],
		"search": {
			"enabled": true,
			"indexName": "learn-reason-react-apollo",
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
    		"/update-delete-mutations/",
    		"/subscriptions/",
    		"/realtime-feed/",
    		"/what-next/"
    		],
		"links": [
			{
			"text": "Hasura Docs",
			"link": "https://docs.hasura.io"
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
		"title": "2 hour GraphQL course for React developers | Hasura",
		"description": "A concise and powerful tutorial that covers fundamental concepts of both GraphQL and using GraphQL in ReactReact",
		"ogImage": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-reason-react-apollo.png",
		"docsLocation": "https://github.com/hasura/learn-graphql/tree/master/tutorials/frontend/reason-react-apollo/tutorial-site/content",
		"favicon": "https://raw.githubusercontent.com/reasonml/reasonml.github.io/source/website/static/img/icon_50.png"
	},
};

module.exports = config;
