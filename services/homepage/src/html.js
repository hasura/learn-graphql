import React from "react"
import PropTypes from "prop-types"

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes} lang="en-us">
        <head>
          <title>Fullstack GraphQL Tutorial for Developers</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="title" content="Fullstack GraphQL Tutorial for Developers" />
          <meta name="description" content="Tutorial to help you learn how to integrate GraphQL APIs and your favorite frontend frameworks like React, Angular, Vue with a Hasura Backend" />
          <meta property="og:title" content="Fullstack GraphQL Tutorial for Developers" />
          <meta property="og:description" content="Tutorial to help you learn how to integrate GraphQL APIs and your favorite frontend frameworks like React, Angular, Vue with a Hasura Backend" />
          <meta property="og:image" content="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-homepage.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="Fullstack GraphQL Tutorial for Developers" />
          <meta property="twitter:description" content="Tutorial to help you learn how to integrate GraphQL APIs and your favorite frontend frameworks like React, Angular, Vue with a Hasura Backend" />
          <meta property="twitter:image" content="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/social-media/twitter-card-homepage.png" />
          {this.props.headComponents}
          <link rel="shortcut icon" href="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/favicon.png" type="image/png" />
          <link rel="canonical" href="https://hasura.io/learn/" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossOrigin="anonymous" />
          <link rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
          integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossOrigin="anonymous" />
          <script
          src="https://code.jquery.com/jquery-3.4.1.min.js"
          integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
          crossOrigin="anonymous"></script>
          <script async src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossOrigin="anonymous"></script>
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <script
          dangerouslySetInnerHTML={{
            __html: `
            $(document).on('click', '.dropdown-menu', function (e) {
              e.stopPropagation();
            });
            $(document).ready(function(){
              $('#myCarousel').carousel({
                interval: 3000,
                cycle: true
              });
            });
            `
          }}
          />
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
