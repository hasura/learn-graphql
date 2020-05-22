module.exports = {
	"siteMetadata": {
    	"title": 'Fullstack GraphQL Tutorials',
		"description": 'Learn how to integrate GraphQL APIs with Hasura GraphQL Engine',
		"siteUrl": 'https://hasura.io'
  	},
  	"pathPrefix": "/",
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
    		resolve: "gatsby-plugin-google-tagmanager",
      		options: {
		        id: "GTM-WBBW2LN",
		        includeInDevelopment: false,
		    },
  		},
	]
};
