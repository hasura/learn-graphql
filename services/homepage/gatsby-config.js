module.exports = {
	"siteMetadata": {
    	"title": 'Fullstack GraphQL Tutorials',
		"description": 'Learn how to integrate GraphQL APIs with Hasura GraphQL Engine',
		"siteUrl": 'https://hasura.io'
  	},
  	"pathPrefix": "/learn",
	"plugins" : [
		"gatsby-plugin-sass",
		{
				"resolve": "gatsby-plugin-favicon",
				"options": {
					"logo": "./src/favicon.png",
				}
		},
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				policy: [{ userAgent: '*', allow: '/' }],
				sitemap: null,
				host: null
			}
		},
		{
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `UA-59768903-1`,
        // Puts tracking script in the head instead of the body
        head: true,
        // enable ip anonymization
        anonymize: false,
      },
    },
	]
};
