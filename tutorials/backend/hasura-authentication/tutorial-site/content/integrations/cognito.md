---
title: "Amazon Cognito"
metaTitle: "Amazon Cognito | Hasura Authentication Tutorial"
metaDescription: "Learn how to integrate Amazon Cognito with Hasura to secure your applications using JWT"
---

## What is Amazon Cognito?

Cognito is Amazon’s product that enables you to implement authentication, authorization, and user management into your
applications.

The “User Pool” component of Amazon Cognito allows you to add sign-in and sign-up capabilities to your applications.

## Set Up User Pools and Hosted Web UI

Navigate to [Cognito](https://console.aws.amazon.com/cognito/home) and click “Create user pool” to start the process of
setting up a user pool and enabling the hosted web UI.

> **Note**: The tutorial uses the new AWS console, which might look different from your console. Switch to the new
> console before starting the tutorial.

The first step is to configure the sign-in experience. That means configuring how the users can log into your
application.

In this case, the users can only sign in using a username and password. Also, the options under “User name requirements”
are turned off. The username should not be case sensitive because `username` would differ from `Username`.

Additionally, you can enable “Federated identity providers”, which would allow users to log in with their existing
Facebook, Apple, Google, and Amazon accounts. For this tutorial, that is out of the scope.

![AWS Cognito Configure Sign-In Experience](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/configure-signin-experience.png)

Click “Next” to go to the next step. On the second step, you are prompted to:

- choose a password policy
- enable/disable/configure multi-factor authentication
- configure user account recovery options

The tutorial uses the “Cognito defaults” for the password policy and no multi-factor authentication. The default values
are enabled for the user account recovery options.

![AWS Cognito Configure Security Requirements](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/configure-security-requirements.png)

The next step is to configure the sign-up experience, where you can leave the default values. The default values allow
users to register and send verification/confirmation emails.

![AWS Cognito Configure Sign-Up Experience](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/configure-signup-experience.png)

You configure how the user pool sends email/SMS messages to users on the next page. You can either send messages with
Amazon SES or Cognito. Since this is a demo application, choose the option “Send email with Cognito”. You can send up to
50 free emails per day with this option.

For production applications, you might want to use Amazon SES.

![AWS Cognito Configure Message Delivery](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/configure-message-delivery.png)

Navigate to the next step, where you set up the app integration for the newly created user pool. Start by giving it a
name and enabling the Cognito Hosted UI option.

![AWS Cognito Integrate App](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/integrate-app-part-1.png)

After that, you need to set up a domain to use the Hosted UI. For this tutorial, you can use a Cognito domain which is
free.

![AWS Cognito Integrate App](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/integrate-app-part-2.png)

Now it’s time to configure the initial app client. Choose the following options:

- **Public client** for the App type
- **Don’t generate a client secret** for the Client secret

Also, name your client and add the allowed callback URL. Use the figure below as a reference.

![AWS Cognito Integrate App](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/integrate-app-part-3.png)

Once you configure the client, scroll until you see “Advanced app client settings” and click on it. A new section will
appear, where you should see “OAuth 2.0 Grant Types”.

Enable the “Implicit grant” option so Cognito returns the user pool JWTs to your application.

![AWS Cognito App Client Grant Types](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/grant-types.png)

The app client should also have a sign-out URL. Enter a sign-out URL as shown in the image below.

![AWS Cognito App Client Sign Out URL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/sign-out-url.png)

That’s all you need to initialize the app client. Click “Next” to go to the last step, which is reviewing the user pool.
Review the configuration and create it.

> The AWS documentation has an extensive section on setting up user pools and enabling a hosted web UI. Follow
> [these steps](https://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-cognito-user-pools.html)
> for in-depth information about getting started with Cognito User Pools.

## Add Custom Claims to the JWT With a Lambda Function

You need to configure custom JWT claims, which you can do with a Lambda function. Cognito will trigger the Lambda
function before generating the token.

The custom JWT claims tell Hasura about the role of the user making the request. This way, Hasura can enforce the
appropriate authorization rules. The rules define what the user making the request is allowed to do.

Find "AWS Lambda" in your dashboard and create a new function. Choose the following options:

- **Author from scratch**
- **Function name** - custom-jwt-claims
- **Runtime** - Node.js 16.x
- **Architecture** - x86_64

![Create new AWS Lambda Function](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/new-lambda-function.png)

After configuring the Lambda function, click “Create function”.

Creating the function takes a few seconds, and then it redirects you to the function dashboard. You should see a section
called “Code source” in the dashboard. Replace the content with the following code:

```
exports.handler = (event, context, callback) => {
  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        "https://hasura.io/jwt/claims": JSON.stringify({
          "x-hasura-user-id": event.request.userAttributes.sub,
          "x-hasura-default-role": "user",
          "x-hasura-allowed-roles": ["user"],
        }),
      },
    },
  };
  callback(null, event);
};
```

After adding the new code, click “Deploy” to update the Lambda function.

## Configure Cognito To Trigger the Lambda Function

Go to the user pool created in the first step (_Amazon Cognito > User pools > your-user-pool_), and find the “User pool
properties” tab.

Now you should see the “Lambda triggers” section. Click “Add Lambda trigger”.

![User Pool Properties - Lambda Triggers](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/user-pool-lambda-trigger.png)

That takes you to another page, where you can configure the Lambda function to respond to an authentication event.
Choose the following options:

- **Trigger type** - Authentication
- **Authentication** - Pre token generation trigger
- **Lambda function** - Choose the lambda function created earlier

![Configure Lambda Trigger in Amazon Cognito](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/cognito-lambda-trigger.png)

Save the Lambda trigger.

## Create Hasura App

Navigate to the [Hasura Cloud dashboard](https://cloud.hasura.io/projects?skip_onboarding=true) and create a new
project.

Add a database to the project and then create a `users` table with the following columns:

- `id` of type Text (Primary Key)
- `username` of type Text

See the image below for reference.

![Picture showing how to create a table in Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/create-hasura-table.png)

The next step is to create a `user` role for the app. Users should be able to see only their records, but not the other
people’s records.

Configure the `user` role as shown in the image below. For more information, read about
[configuring permission rules in Hasura](https://hasura.io/docs/latest/graphql/core/auth/authorization/permission-rules/).

![Picture showing how to set permissions in Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/hasura-set-permissions.png)

This way, users cannot read other people’s records. They can only access theirs.

## Configure Hasura to Use Cognito Keys

When integrating Cognito with Hasura, you need to add the **JWKS** as a JWT secret. JWKS stands for JSON Web Key Set,
and it represents the public keys used to verify the JWT issued by Cognito.

You can construct the JWKS URL as follows:

```
https://cognito-idp.<aws-region>.amazonaws.com/<user-pool-id>/.well-known/jwks.json

// Example URL
// https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_APcJswRty/.well-known/jwks.json
```

Now navigate to your Hasura project’s settings and go to the “Env vars” page. Then click "+ New Env Var".

Select `HASURA_GRAPHQL_JWT_SECRET` for the “Key” and then add the JWK URL:

```
{
  "type":"RS256",
  "jwk_url": "https://cognito-idp.<aws-region>.amazonaws.com/<user-pool-id>/.well-known/jwks.json",
  "claims_format": "stringified_json"
}
```

See the image for reference.

![Hasura JWT Secret](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/hasura-jwt-secret.png)

Click `Add` to add the environment variable to your project.

## Sync Users Between Hasura and Cognito

There should be a sync between Cognito and Hasura, so the users from Cognito are present in your Hasura database as
well. You can keep the two in sync with another Lambda function.

Create a new Lambda function and name it “sync-users”. After that, export the function to your machine. Click on
“Actions” and choose “Export function” from the dropdown menu.

![Export Lambda Function](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/export-function.png)

Create a new folder called “sync-users” and move the function file there. Open the `index.js` file and add the following
code:

```
const request = require("request");

exports.handler = (event, context, callback) => {
  const userId = event.request.userAttributes.sub;
  const userName = event.userName;
  const hasuraAdminSecret = "<your-admin-secret>";
  const url = "https://<your-hasura-app-url>/v1/graphql";

  const upsertUserQuery = `
    mutation($userId: String!, $userName: String!){
      insert_users(objects: [{ id: $userId, username: $userName }], on_conflict: { constraint: users_pkey, update_columns: [] }) {
        affected_rows
      }
    }`

  const graphqlReq = { "query": upsertUserQuery, "variables": { "userId": userId, "userName": userName } }

  request.post({
      headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': hasuraAdminSecret},
      url:   url,
      body:  JSON.stringify(graphqlReq)
  }, function(error, response, body){
      console.log(body);
      callback(null, event, context);
  });
}
```

Save the file and then open the terminal. In the terminal, run the following commands:

```
npm init -y

npm i request
```

After the commands finish, you should have the following files:

![sync-users Lambda Function](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/sync-users-folder.png)

Now zip the folder because you will upload it on AWS. Click on “Upload from” and choose “.zip file”. Upload the zip file
and then deploy the changes.

![Upload Code on Lambda](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/upload-zip-lambda.png)

The image below illustrates how the function folder structure should look:

![sync-users Lambda Function Folder Structure](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/sync-users-lambda-structure.png)

Cognito triggers the Lambda function each time a user logs in or registers to sync the Postgres database with Cognito.
If the user is already in the database, the function does not do anything. Otherwise, it adds the user to the Postgres
database.

The reason for using an `upsert` operation is because the social logins do not distinguish between sign up and log in.

Add the following Lambda trigger:

- **Trigger type** - Authentication
- **Authentication** - Post authentication trigger
- **Lambda function** - Choose the `sync-users` Lambda

![Add Lambda Trigger in Amazon Cognito](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/post-auth-trigger.png)

Save the trigger after configuring it!

## Test the Integration

The first step is to create an account. After you create the account, you need to log in. The login triggers the
`sync-users` Lambda function, which adds the newly created account to the Postgres database.

You can access the hosted Cognito UI as follows:

```
// Login page
https://<your_domain>/login?response_type=token&client_id=<your_app_client_id>&redirect_uri=<your_callback_url>

// Register page
https://<your_domain>/signup?response_type=token&client_id=<your_app_client_id>&redirect_uri=<your_callback_url>

// Logout page
https://<your_domain>/logout?response_type=token&client_id=<your_app_client_id>&redirect_uri=<your_callback_url>

```

When you access the hosted UI login page, you should see this page:

![Cognito Hosted UI Login](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/test-integration-login.png)

Enter the details of the account you created earlier and sign in. Sign-in redirects you to the callback URL you set
earlier `https://localhost:3333/cognito-callback`.

You will get an error since no app runs on “localhost:333”. That’s fine because you need the `id_token` from the URL.
You should see something similar to the picture below but with different values.

![Amazon Cognito Sign In Callback](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/cognito-integration-callback.png)

If you extract the `id_token` and use it to make a request in your Hasura app, you should get only the details of your
user.

![Hasura Cognito Integration](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/cognito/hasura-cognito-integration.png)

Well done for finishing the tutorial! You learned how to integrate Cognito with your Hasura application.
