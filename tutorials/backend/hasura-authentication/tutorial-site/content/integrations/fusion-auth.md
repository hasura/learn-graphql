---
title: "FusionAuth"
metaTitle: "FusionAuth | Hasura Authentication Tutorial"
metaDescription: "Learn how to integrate FusionAuth with Hasura to secure your applications using JWT"
---

The first step is to create a FusionAuth instance. Check the [5 minute setup guide](https://fusionauth.io/docs/v1/tech/5-minute-setup-guide) from FusionAuth to learn how to do it.

## Create a new app

Once the instance is up and running, open the admin console and go to the "Applications" page. Click the green "+" button to add a new application.

![Add application in FusionAuth](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/fusionauth/create-app.png)

Enter a name for the app and then click on the "OAuth" tab. Make sure:
* you enable "Generate Refresh Tokens" and "Require registration"
* add "Authorized redirect URLs"

![Add application OAuth settings FusionAuth](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/fusionauth/create-app-oauth-settings.png)

Configure the OAuth settings as shown in the image above.

## Create a lambda function

The next step involves creating a lambda function to add custom claims to the JWT. The custom claims from the JWT tell Hasura about the role of the user making the request. As a result, Hasura can enforce the appropriate authorization rules.

To create a new lambda function, go to "Customizations > Lambdas" and click the green "+" button.

Name the lambda, choose the "**JWT populate**" type, and add the following code:

```
function populate(jwt, user, registration) {
   jwt["https://hasura.io/jwt/claims"] = {
    "x-hasura-default-role": "user",
    "x-hasura-allowed-roles": ["user"],
    "x-hasura-user-id": user.id
  };
}
```

![Create new Lambda function in FusionAuth](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/fusionauth/lambda-config.png)

Now you need to configure the previously created app to use this lambda. Navigate to the "Applications" page and edit the app.

Click on the "JWT" tab and enable the JWT.

![Enable JWT in FusionAuth](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/fusionauth/enable-jwt.png)

Scroll down until you see the "Lambda settings" sections. Once there, add the lambda for the "Access Token populate lambda" field.

![Configure JWT in FusionAuth](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/fusionauth/configure-jwt.png)

Save the settings.

## Create a signing key

Navigate to "Settings > Key Master" and generate an RSA key.

![Generate signing key in FusionAuth](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/fusionauth/configure-rsa-key.png)

Configure the RSA KEY as shown in the image above.

Now you need to configure the application to use the new RSA key. Go to the JWT tab for your app and select the newly created RSA key for "Access Token signing key" and "Id Token signing key" fields.

![Generate signing key in FusionAuth](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/fusionauth/configure-jwt-token.png)

Save the settings, and you are done with FusionAuth for now.

## Configure Hasura with FusionAuth

It's time to integrate FusionAuth with Hasura. Open the docker-compose file and add the following line under `environment`:

```
HASURA_GRAPHQL_JWT_SECRET: '{"type": "RS512", "jwk_url": "http://localhost:9011/.well-known/jwks"}'
```

If you use Hasura Cloud, the FusionAuth instance needs to be deployed & publicly accessible. You cannot use the localhost URL. In case your FusionAuth instance is public, you can add the JWKS URL to Hasura Cloud as follows:

```
{
    "type": "RS512", 
    "jwk_url": "<public-url>/.well-known/jwks"
}
```

![Configure JWT Secret in Hasura Cloud](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/fusionauth/hasura-cloud-jwt-secret.png)


The last step is to configure the permissions in your Hasura application. Consider there is a `user` table with the following columns:
* `id` of type Text (Primary key)
* `email` of type Text

![Create a table in Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/fusionauth/create-table-hasura-app.png)

To configure the permissions, go to the "Permissions" tab in the `user` table.

![Table permissions in Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/fusionauth/table-permissions-hasura-app.png)

Users should be able to see only their records, but not other people’s records. Add the `user` role with the following custom check:

```
{
  "id": {
    "eq": "X-Hasura-User-Id"
  }
}
```

Then allow the `user` role to access all the fields:
- `id`
- `email`

Save the permissions, and you are done! You can now use the FusionAuth + Hasura integration.

> Thanks to Atakan for creating the [previous guide](https://fusionauth.io/community/forum/topic/696/how-to-use-fusionauth-jwt-token-and-claims-with-hasura-graphql-to-authenticate-graphql-requests/2).