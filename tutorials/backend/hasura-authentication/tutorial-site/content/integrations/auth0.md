---
title: "Auth0"
metaTitle: "Auth0 | Hasura Authentication Tutorial"
metaDescription: "Auth0 is a service that allows you to integrate authentication and authorization into your applications."
---

## What is Auth0

Auth0 is a service that allows you to integrate authentication and authorization into your applications.

Once you connect your application to Auth0, Auth0 takes care of everything auth-related.

## How to Integrate Auth0 with Hasura

In this guide, you will learn how to integrate Auth0 with Hasura.

### Create Auth0 App

To integrate Auth0 with Hasura, you need an Auth0 account. You can manually sign up or log in with other accounts, such as your Google account.

The first step is to navigate to the [Auth0 dashboard](https://manage.auth0.com/dashboard). Once you log in, you should see the following page:

![Auth0 Dashboard](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/auth0-dashboard.png)

After that, go to the `Applications` page and click the `+ Create Application` button.

![Auth0 Applications Page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/auth0-applications-page.png)

Once you click the button, a new pop-up appears where you can enter the app name and select your application type.

You can choose:
* Native
* Singe Page Web Applications
* Regular Web Applications
* Machine to Machine Applications

This tutorial uses the "Single Page Web Applications" type as an example.

![Auth0 Create Application](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/auth0-create-application.png)

Press the "Create" button to create the application!

Now go to the "Settings" tab and scroll down until you see the options "Allowed Callback URLs" and "Allowed Web Origins".

Enter the following URLs:
* **Allowed Callback URLs** - https://localhost:8080/callback
* **Allowed Web Origins** - https://localhost:8080

**Note**: The "localhost" URLs should reflect the URLs of your app. If your app URL is `http://localhost:6000` or `https://my-app.com`, that’s what you should use.

### Create Auth0 API

The next step is to create an Auth0 API so you can make the `accessToken` a valid JWT.

Go to the `APIs` page, as shown in the image below, and click on the `+ Create API` button.

![Auth0 API Page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/auth0-api-page.png)

A new pop-up will appear where you can name your API, provide an identifier and select the signing algorithm.

Fill the "Name" and "Identifier" fields, but leave the "Signing Algorithm" field as it is.

![Auth0 New API Page](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/auth0-new-api-page.png)

After adding the values, click the `Create` button.

## Custom JWT Claims

The custom JWT claims are needed because they tell Hasura about the role of the user making the API call. This way, Hasura can enforce the appropriate authorization rules. The rules define what the user is allowed to do.

Go to the `Rules` page to add custom roles.

![Auth0 Rules](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/auth0-rules.png)

Once there, click the `+ Create` button and then choose the option `Empty rule` from the top of the page.

Choose a name such as `hasura-jwt-claims` for your rule, and then add the following script:

```js
function (user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";
  context.accessToken[namespace] =
    {
      'x-hasura-default-role': 'user',
      // do some custom logic to decide allowed roles
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.user_id
    };
  callback(null, user, context);
}
```

![Auth0 Create Custom Rule](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/auth0-create-custom-rule.png)

Save the new rule by clicking the `Save changes` button.

## Sync Users Between Auth0 and Hasura

You need to ensure that the users from your database are in sync with Auth0. As a result, you will create another rule to keep the two in sync!

Go to the `Rules` page again > click on `+ Create` > choose the `Empty rule` option.

Now add the following script:

```js
function (user, context, callback) {
  const userId = user.user_id;
  const userName = user.name;
  
  const admin_secret = "<your-admin-secret>";
  const url = "<your-hasura-app-url>";
  const query = `mutation($userId: String!, $userName: String) {
    insert_users(objects: [{
      id: $userId, name: $userName, last_seen: "now()"
    }], on_conflict: {constraint: users_pkey, update_columns: [last_seen, name]}
    ) {
      affected_rows
    }
  }`;

  const variables = { userId, userName };

  request.post({
      url: url,
      headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': admin_secret},
      body: JSON.stringify({
        query: query,
        variables: variables
      })
  }, function(error, response, body){
       console.log(body);
       callback(null, user, context);
  });
}
```

Before saving the changes, do not forget to replace the `admin_secret` and `url` with your values.

The image illustrates the process of adding the rule.

![Hasura Auth0 Users Sync](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/hasura-auth0-users-sync.png?refresh)

The rule will be triggered whenever actions such as signup or login happen!

## Connect Hasura with Auth0

It's time to integrate the newly created Auth0 application with Hasura.

> It's essential to secure your endpoint with an `admin secret` before going further. Check [this guide](https://hasura.io/docs/latest/graphql/cloud/projects/secure/#adding-an-admin-secret) to learn how to do it.

After adding the `admin secret`, you need to configure the public keys for Auth0. One way to generate the JWT config is to use the [Hasura JWT configurator](https://hasura.io/jwt-config/).

![Hasura JWT Configurator](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/hasura-jwt-config.png)

Choose the provider (Auth0) and then enter your "Auth0 Domain Name". After that, press the button "Generate Config" to get your JWT Config.

You will set the value as an environment variable in your Hasura Project. To do so, go to the [Hasura Dashboard](https://cloud.hasura.io/) and then click the "Gear ⚙️" icon.

![Hasura Project Env Vars](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/hasura-project-env-vars.png)

After that, go to the `Env vars` section and click the `+ New Env Var` option. See the image for reference.

Select `HASURA_GRAPHQL_JWT_SECRET` for the "Key" and then paste the JWT config generated previously.

![Hasura JWT Secret](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/hasura-jwt-secret.png)

Click on `Add`, and the environment variable will be applied to your project.

Congratulations! Auth0 is successfully integrated with your Hasura instance.

## Test Database Syncing Rule

Go to your Hasura app dashboard and create a `users` table with the following columns:
* `id` of type Text (Primary key)
* `name` of type Text
* `last_seen` of type Timestamp with default value `now()`

See the image below for reference.

![Hasura Create Table](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/hasura-create-table.png)

The next step is to create a `user` role for the app. Users should be able to see only their records, but not the other people’s records.

Configure the `user` role as shown in the image below. For more information, read about [configuring permission rules in Hasura](https://hasura.io/docs/latest/graphql/core/auth/authorization/permission-rules/).

![Hasura Permissions](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/hasura-permissions.png)

This way, users cannot read other people’s records. They can only access theirs.

Now go back to Auth0 and go to the `Rules` page. Select the `hasura-auth0-users-sync` or whatever you named the rule. It's the rule you created previously for syncing Auth0 with Hasura.

Then click on the `Save and try` button, which opens a new pop-up. Add the following data in the `User` tab:

```
{
  "name": "Hasura Auth0",
  "user_id": "auth0|0123456789"
}
```

Leave the `Context` tab as it is, and then press the `Try` button. The test should be successful, and you should see the new user in your Hasura app.

![Hasura Users Table](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/Hasura-users.png)

As the image illustrates, the user was successfully added to the database.

## Test Auth0 Token

This step involves testing the Auth0 integration. More specifically, you will get a token from Auth0, and you will use it with Hasura to make authenticated requests.

You will get the Auth0 token using the **Authentication API Debugger Extension** from Auth0. Go to the `Extension` page and search for `api debugger`, as shown in the image below.

![Auth0 Extensions](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/auth0-extensions.png)

Follow the instructions to install and authorize the extension. Once you are done with that, you need to configure the Authentication API Debugger.

![Auth0 Authentication API Debugger](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/auth0-authentication-api-debugger.png)

Select the application and copy the callback URL.

> You will need the callback URL later.

Now click on the `OAuth2 / OIDC` option to go to the page where you should see a field called `Audience`. Add your Hasura app URL and turn on the "Save in Local Storage" option.

See the image for reference.

![Auth0 Set Audience](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/auth0-set-audience.png)

After that, go to the application you created in the first step and add the callback URL you copied earlier.  Save the changes, and you are ready to test the application.

![Auth0 Application Settings Callback URLs](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/auth0-app-settings-callback-urls.png)

Go back to the "Auth0 Authentication API Debugger" again and then to the "OAuth2 / OIDC" page. You should see an option called `OAUTH2/OIDC LOGIN` button under the "User Flows" section.

![Auth0 Test OAUTH2/OIDC LOGIN](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/auth0-test-login.png)

Click on the button, and within a couple of seconds, you will be redirected to another page. On this page, you can see the following:
* Hash Fragment
* Access Token
* Headers

This is where you get the access token that you can use with your Hasura application.

![Auth0 Access Token](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/auth0-access-token.png)

The above image illustrates an example access token. You will use that access token with the Authorization header when you make a request to your Hasura app.

You can see a successful request to the Hasura app using the Auth0 Bearer token.

![Hasura GraphQL Request with Authorization Bearer Token Generated by Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/hasura-auth-bearer-token.png)

If you remove the Authorization token, you will get an error telling you that the token is missing. As a result, you cannot access the database records.

![Hasura GraphQL Request without Authorization Bearer Token Generated by Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/auth0/hasura-not-auth-bearer-token.png)

If the Authorization token is present, the users can access their records. If the token is missing, the users cannot access any records. As a result, it can be concluded that the integration works successfully.