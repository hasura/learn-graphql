FROM gcr.io/websitecloud-352908/github.com/hasura/gatsby-gitbook-starter:43a1125129dfe7cd151f167890602c8ae30c2906

# Create app directory
WORKDIR /app

RUN cd /app

# Remove already existing dummy content
RUN rm -R content

# Bundle app source
COPY . .

# Build static files
RUN GATSBY_ALGOLIA_APP_ID=WCBB1VVLRC GATSBY_ALGOLIA_SEARCH_KEY=baf43aa3921858bc144d0fe5ce85b526 npm run build

# serve dist folder on port 8080
CMD ["gatsby", "serve", "--verbose", "--prefix-paths", "-p", "8080", "--host", "0.0.0.0"]
