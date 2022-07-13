FROM --platform=linux/amd64 node:8.17.0

RUN mkdir -p /opt/app

RUN chown node:node /opt/app

WORKDIR /opt/app

COPY package*.json .

USER node

RUN npm ci

COPY . .

CMD npm start
