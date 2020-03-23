const config = {
	"gatsby": {
		"pathPrefix": "/learn/graphql/intro-graphql",
		"siteUrl": "https://hasura.io",
		"gaTrackingId": "UA-59768903-1",
		"trailingSlash": true
	},
	"header": {
		logo: 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/brand.svg',
		"logoLink": "https://hasura.io/learn/",
		"title": "<a href='https://hasura.io/learn/'>/ intro-to-graphql </a>",
		title:
      "<a href='https://hasura.io/learn/'><img class='img-responsive' src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/learn-logo.svg' alt='Learn logo' /></a>",
		"githubUrl": "https://github.com/hasura/learn-graphql",
		"helpUrl": "",
		"tweetText": "Check out this Introduction to GraphQL course for Fullstack developers by @HasuraHQ https://hasura.io/learn/graphql/intro-graphql/introduction/",
		"links": [{
			"text": "",
			"link": ""
		}],
		social: `<li>
		    <a href="https://twitter.com/hasurahq" target="_blank" rel="noopener">
		      <div class="twitterBtn">
		        <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/twitter-brands-block.svg' alt={'Discord'}/>
		      </div>
		    </a>
		  </li>
			<li>
		    <a href="https://discordapp.com/invite/hasura" target="_blank" rel="noopener">
		      <div class="discordBtn">
		        <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/discord-brands-block.svg' alt={'Discord'}/>
		      </div>
		    </a>
		</li>`,
		"search": {
			"enabled": false,
			"indexName": "learn-intro-graphql",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction/",
    		"/what-is-graphql/",
    		"/core-concepts/",
    		"/graphql-vs-rest/",
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
			"link": "https://hasura.io/docs"
			},
			{
			"text": "GraphQL Docs",
			"link": "https://graphql.org/learn"
			}
		],
		"frontline": false,
		"ignoreIndex": true,
		title:
      "<a href='https://hasura.io/learn/'>GraphQL </a><div class='greenCircle'></div><a href='https://hasura.io/learn/graphql/intro-graphql/introduction/'>Introduction</a>",
	},
	"siteMetadata": {
		"title": "Introduction to GraphQL Tutorial for Fullstack Developers",
		"description": "A concise and powerful tutorial that covers fundamental concepts of GraphQL, GraphQL vs REST, GraphQL server and client",
		"ogImage": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-intro-graphql.png",
		"docsLocation": "https://github.com/hasura/learn-graphql/tree/master/tutorials/graphql/intro-graphql/tutorial-site/content",
		"favicon": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-intro/graphql-favicon.png"
	},
};

module.exports = config;
