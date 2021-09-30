FROM hasura/gatsby-gitbook-starter:43c2d1

# Create app directory
WORKDIR /app

RUN cd /app

# Remove already existing dummy content
RUN rm -R content

# Bundle app source
COPY . .

# Build static files
RUN GATSBY_ALGOLIA_APP_ID=WCBB1VVLRC GATSBY_ALGOLIA_SEARCH_KEY=0301b192e18d1598fde3095dc721bdba npm run build

# serve dist folder on port 8080
CMD ["gatsby", "serve", "--verbose", "--prefix-paths", "-p", "8080", "--host", "0.0.0.0"]
