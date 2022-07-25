FROM --platform=linux/amd64 node:8.17-alpine

# Create app directory
ENV GRAPHQL_ENDPOINT=https://hasura.io/learn/graphql
ENV REACT_APP_CALLBACK_URL=https://hasura.io/learn/graphql/graphiql/callback
WORKDIR /app

# Install app dependencies
RUN npm config set unsafe-perm true
RUN npm -g install serve@11.3.2
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . /app
#Build react/vue/angular bundle static files
RUN npm run build

EXPOSE 8080
# serve dist folder on port 8080
CMD ["serve", "-s", "static", "-p", "8080"]
