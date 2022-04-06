---
title: "Connect to Hasura Programmatically"
metaTitle: "Connect to Hasura Progammatically | YugabyteDB Tutorial"
metaDescription: "In this section, we will learn how to connect to Hasura programatically using cURL or via Node.js server"
---

Up until now, you were taking advantage of YugabyteDB and Hasura’s Consoles to create, read, and update the data. In this final bonus section, you’ll learn how to connect to a Hasura public endpoint from your laptop and query records programmatically.

## Query via Curl Tool

The curl command-line tool is one of the most straightforward and universal ways to check the connectivity between your laptop and the Hasura GraphQL endpoint. 

Query the **Todos** table by sending a POST request to the Hasura endpoint:

1. Locate the GraphQL API public IP address and Admin Secret in the settings of your Hasura project:

![](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-yugabyte/hasura-cloud-project-details.png)

2. Provide your API address and secret in the curl command below by replacing the GRAPHQL_API_ENDPOINT and GRAPHQL_ADMIN_SECRET placeholders:

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "X-Hasura-Admin-Secret: GRAPHQL_ADMIN_SECRET" \
-d '{"query":"query {todos {title user {id name}}}"}' \
GRAPHQL_API_ENDPOINT
```

3. Execute the curl request and confirm the output is as follows:

```json
{
  "data": {
    "todos": [
      {
        "title": "Complete Hasura & YugabyteDB Tutorial",
        "user": {
          "id": 1,
          "name": "Mark"
        }
      }
    ]
  }
}
```

## Query via Node.js Application

**Callout**: To proceed with this section you need to [download and install npm and Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Finally, download and execute a sample Node.js application that connects to your Hasura BaaS and retrieves a list of Todos: 

1. Clone the project with the sample application:

```bash
git clone https://github.com/yugabyte/examples.git && cd examples/yugabyte-hasura-snippets/
```

2. Add the [minimal GraphQL client](https://github.com/prisma-labs/graphql-request) for Node to the project:

```bash
npm add graphql-request graphql
```

3. Open the `examples/yugabyte-hasura-snippets/app.js` file.

4. Provide your GrahpQL API address and Admin Secret in the `app.js` source code by replacing the GRAPHQL_API_ENDPOINT and GRAPHQL_ADMIN_SECRET placeholders.

5. Launch the application:

```bash
node app.js
```

6. Confirm it produces output as follows:

```json
{
  "todos": [
    {
      "title": "Complete Hasura & YugabyteDB Tutorial",
      "user": {
        "id": 1,
        "name": "Mark"
      }
    }
  ]
}
```


