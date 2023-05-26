---
title: "SuperTokens"
metaTitle: "SuperTokens | Hasura Authentication Tutorial"
metaDescription:
  "SuperTokens is an Open-Source Auth provider that enables you to implement authentication and session management into
  your applications. Learn how to integrate SuperTokens with Hasura using JWT"
---

## What is SuperTokens

SuperTokens is an Open-Source Auth provider that enables you to implement authentication and session management into
your applications.

It comes in two flavors:

- self-hosted - unlimited users and free forever
- managed version by SuperTokens - free up to 5K monthly active users

**Note**: The tutorial uses the managed version of SuperTokens. Also, the auth API is built using NodeJS.

## Set up SuperTokens

Using SuperTokens for authentication means that you need to build an auth API that uses the SuperTokens Backend SDK. The
app communicates with SuperTokens through the custom auth API.

SuperTokens provides Backend SDKs for:

- Node.js
- Go
- Python

It also has Frontend SDKs for:

- Vanilla JS
- React
- React-Native

### Create a SuperTokens Managed Service

> If you run a self-hosted (with or without Docker) SuperTokens instance, you can skip this section.

You need to create a SuperTokens account, which gives you a `connectionURI` and an `API key`. When you call the
SuperTokens `init` function in your auth API, you will use them.

Navigate to [supertokens.com](https://supertokens.com/) and click on the "Sign Up" button to start the registration
process.

![The Homepage of SuperTokens](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/supertokens/supertokens-homepage.png)

You can sign up in three ways:

- with GitHub
- with Google
- manually

Additionally, you can customize the signup form on the left-hand side. You can change colors, fonts, and so on.

This tutorial uses the default values. Now register using your preferred method.

![The SuperTokens Sign Up Page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/supertokens/supertokens-sign-up-page.png)

The next step is to configure your SuperTokens account by choosing a region.

Choose the appropriate region for your case and press "Next".

![Choose the Account Region of Your SuperTokens Account](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/supertokens/supertokens-choose-region.png)

That takes you to the "Dashboard" page, where you can see your `connectionURI` and `API key`.

![The SuperTokens Development Environment](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/supertokens/supertokens-dev-env.png)

You will need those later. Also, you will connect your Hasura app to the PostgreSQL database from SuperTokens.

You can retrieve the database connection details by clicking where it says
`Access the PostgreSQL database used by this core`. You should see something similar:

![Get PostgreSQL database connection details in SuperTokens](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/supertokens/supertokens-connect-to-database.png)

You will need these details in the next step.

## Create Hasura App

Navigate to your [Hasura Cloud dashboard](https://cloud.hasura.io/projects?skip_onboarding=true) and create a new
project.

Launch the console once the project is created, go to the "DATA" tab, and connect to an existing database.

![Connect to a database in Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/supertokens/hasura-connect-database.png)

Under **Connect Database Via**, choose the "Connection Parameters" option to add the connection details manually. Now
you need the database details from the previous section.

![Connect to SuperTokens database from Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/supertokens/hasura-database-connection-params.png)

After entering the database details, click "Connect Database" to connect your Hasura app to the SuperTokens database.

You will be redirected to a page that shows all the untracked tables or views. Click "Track All" to track them.

![Track tables or views in Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/supertokens/hasura-track-tables-views.png)

Do the same for the "foreign-key relationships".

![Track relationships in Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/supertokens/hasura-track-relationships.png)

The next step is to create a `user` role for the app. Users should be able to see only their records, but not the other
people’s records.

Configure the `user` role as shown in the image below. For more information, read about
[configuring permission rules in Hasura](https://hasura.io/docs/latest/graphql/core/auth/authorization/permission-rules/).

![Hasura Permissions](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/supertokens/hasura-create-user-role.png)

This way, users cannot read other people’s records. They can only access theirs.

> **Note**: The SuperTokens database is only for demo purposes. In a production environment, you should have a separate
> database.

The next step is implementing the Backend Auth API to interact with SuperTokens.

## Backend Auth API Implementation

Create a new folder for the project and open it as follows:

```
mkdir auth-api
cd auth-api
```

Now initialize your Node project and install the required dependencies:

```
npm init -y
npm i -s supertokens-node express
```

Once the installation finishes, create a new file `api.js`:

```
touch api.js
```

You will write the API in this file. Open the file and add the following code (explained below):

```
const express = require("express");
const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const { middleware } = require("supertokens-node/framework/express");
const { verifySession } = require("supertokens-node/recipe/session/framework/express");

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "<your-connection-uri>",
    apiKey: "<your-api-key>",
  },
  appInfo: {
    appName: "Hasura",
    apiDomain: "http://localhost:3333",
    websiteDomain: "http://localhost:3333",
    apiBasePath: "/api",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(),
    Session.init({
      jwt: {
        enable: true,
        issuer: "<your-ngrock-url>",
      },
      override: {
        functions: function (originalImplementation) {
          return {
            ...originalImplementation,
            createNewSession: async function (input) {
              input.accessTokenPayload = {
                ...input.accessTokenPayload,
                "https://hasura.io/jwt/claims": {
                  "x-hasura-user-id": input.userId,
                  "x-hasura-default-role": "user",
                  "x-hasura-allowed-roles": ["user"],
                },
              };

              return originalImplementation.createNewSession(input);
            },
          };
        },
      },
    }),
  ],
});

const app = express();

app.get("/getJWT", verifySession(), async (req, res) => {
  let session = req.session;
  let jwt = session.getAccessTokenPayload()["jwt"];

  res.json({ token: jwt });
});

app.use(middleware());

app.listen(3333, () => console.log("Server started!"));
```

For this auth API, you need the:

- Express Framework
- SuperTokens Node.js SDK

> Even though the implementation is done with Node.js, the concepts also apply to the other Backend SDKs.

It's a basic API that allows people to:

- register
- login
- receive a JWT token

When you build with SuperTokens, you need to call the `.init` function and pass some parameters. The parameters allow
overriding the default settings.

The first parameter is the `supertokens` object.

```
supertokens: {
    connectionURI: "<your-connection-uri>",
    apiKey: "<your-api-key>",
},
```

You need to provide the `connectionURI` and `apiKey` from your SuperTokens Managed Service dashboard.

Then you have the `appInfo` object.

```
appInfo: {
    appName: "Hasura",
    apiDomain: "http://localhost:3333",
    websiteDomain: "http://localhost:3333",
    apiBasePath: "/api",
    websiteBasePath: "/auth",
  },
```

`appInfo` specifies where your API and the frontend client are located. Since there is no frontend implementation, you
can use the same URL.

If you had a frontend client, you would replace the `websiteDomain` with the URL of that client.

Lastly, there is the `recipeList` parameter. A recipe represents the type of authentication you need.

In this case, people can authenticate using an email address and a password.

```
recipeList: [
    EmailPassword.init(),
    Session.init({
      jwt: {
        enable: true,
        issuer: "<your-ngrock-url>",
      },
      override: {
        functions: function (originalImplementation) {
          return {
            ...originalImplementation,
            createNewSession: async function (input) {
              input.accessTokenPayload = {
                ...input.accessTokenPayload,
                "https://hasura.io/jwt/claims": {
                  "x-hasura-user-id": input.userId,
                  "x-hasura-default-role": "user",
                  "x-hasura-allowed-roles": ["user"],
                },
              };

              return originalImplementation.createNewSession(input);
            },
          };
        },
      },
    }),
  ],
```

In the above `recipeList`, you:

- initialize the email/password authentication
- enable the JWT feature and specify a custom issuer (_you’ll see in the next section how to set the issuer_)
- add custom claims to the JWT

That's all the code you need for a basic auth API that can interact with SuperTokens!

**Note**: If you had a frontend client, you would have to write additional code. You would have to add the following
piece of code.

```
app.use(cors({
    origin: "<your-client-url>",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));
```

The value for `origin` would be your frontend client URL.

## Expose the Auth API Publicly

Until now, your API is available only locally - on your machine. That means you cannot use it with Hasura Cloud.

There are two ways to make the API accessible to Hasura Cloud:

- deploy your API
- make your API publicly with ngrok

This tutorial shows how to make your API available publicly. Check the
[ngrok documentation](https://ngrok.com/docs/getting-started) to learn how to get started.

After setting up "ngrok", go to the "auth-api" folder and run your API locally with the command:

```
node api.js
```

Your API is available at `http://localhost:3333`.

In another terminal window, in the same folder, run:

```
ngrok http 3333
```

After running the command, you should get a public URL. See the image below for reference.

![ngrok Example](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/supertokens/ngrok-screenshot.png)

Copy the URL and go back to `api.js` and replace the issuer:

```
jwt: {
  enable: true,
  issuer: "<your-ngrock-url>/api",
},
```

Re-start your server, but leave "ngrok" running. The last step is to add the JWT secret in Hasura.

## Integrate SuperTokens with Hasura

The JWKS endpoint is available at `http://localhost:3333/api/jwt/jwks.json`, but Hasura Cloud cannot access the local
API.

Since you run "ngrok", your JWKS endpoint is available at `<your-ngrok-url>/api/jwt/jwks.json`.

You will set the URL as an environment variable in your Hasura Project. To do so, go to the
[Hasura Dashboard](https://cloud.hasura.io/) and then click the "Gear ⚙️" icon.

After that, go to the `Env vars` section and click the `+ New Env Var` option.

Select `HASURA_GRAPHQL_JWT_SECRET` for the "Key" and then add:

```
{
    "jwk_url": "<your-ngrok-url>/api/jwt/jwks.json"
}
```

![Hasura JWT Secret](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/supertokens/hasura-jwt-secret.png)

Click on `Add`, and the environment variable will be applied to your project.

## Test the SuperTokens + Hasura Integration

It's time to test the integration. Before testing, make sure the API and ngrok are running.

The first step is to register a new user. Run the following `curl` command in your terminal:

```
// Register

curl --location --request POST 'https://a182-2a02-2f08-e000-fb00-9d0-feeb-e5cd-5e50.eu.ngrok.io/api/signup' \
--header 'rid: emailpassword' \
--header 'Content-Type: application/json' \
--data-raw '{
    "formFields": [
        {
            "id": "email",
            "value": "supertokens+hasura@email.com"
        },
        {
            "id": "password",
            "value": "testPass123"
        }
    ]
}'
```

Provided that the request is successful, you should get a similar response:

```
{"status":"OK","user":{"email":"supertokens+hasura@email.com","id":"0a9baee6-cd1e-4ccc-92ef-9fa8e2edd75c","timeJoined":1652686138026}}%
```

Now you have a user whose email is `supertokens+hasura@email.com`. Since you connected Hasura to the SuperTokens
database, the user is available in Hasura too.

The next step is to log in. You can do so with the following command:

```
// Log in

curl --cookie-jar my_cookies.txt --location --request POST 'https://a182-2a02-2f08-e000-fb00-9d0-feeb-e5cd-5e50.eu.ngrok.io/api/signin' \
--header 'rid: emailpassword' \
--header 'Content-Type: application/json' \
--data-raw '{
    "formFields": [
        {
            "id": "email",
            "value": "supertokens+hasura@email.com"
        },
        {
            "id": "password",
            "value": "testPass123"
        }
    ]
}'
```

Observe the "cookie" part from the curl command `--cookie-jar my_cookies.txt`. When you sign in, you get two tokens:

- a refresh token
- an access token

The `--cookie-jar my_cookies.txt` part takes the tokens returned by the "signin" endpoint and saves them in a file.

You will need the access token to get the JWT token. Also, you will get a similar response:

```
{"status":"OK","user":{"email":"supertokens+hasura@email.com","id":"0a9baee6-cd1e-4ccc-92ef-9fa8e2edd75c","timeJoined":1652686138026}}%
```

When you request the JWT token, you need to pass the tokens. That's what the `--cookie my_cookies.txt` part from the
command does.

You can retrieve the JWT token as follows:

```
// Get JWT Token

curl --cookie my_cookies.txt --location --request GET 'https://a182-2a02-2f08-e000-fb00-9d0-feeb-e5cd-5e50.eu.ngrok.io/getjwt'
```

You can then use the token to make authenticated requests. The image below shows that the database returns only this
user's details rather than all users.

![SuperTokens with Hasura integration](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/supertokens/hasura-bearer-token-example.png)

From here, you can extend the Backend auth API to fit your requirements and build a Frontend client.

Useful links:

- https://github.com/offscriptio/hasura-supertokens
