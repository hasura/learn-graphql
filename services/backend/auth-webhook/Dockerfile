FROM --platform=linux/amd64 node:8.17.0

RUN mkdir -p /opt/app

RUN chown node:node /opt/app

WORKDIR /opt/app

COPY package*.json .

USER node

RUN curl https://graphql-tutorials.auth0.com/pem > graphql-tutorials.pem

RUN npm install

COPY . .

CMD npm start
