---
title: "Nhost"
metaTitle: "Nhost | Hasura Authentication Tutorial"
metaDescription: "Nhost is the open source GraphQL backend (Firebase Alternative) and a development platform. Nhost is doing for the backend, what Netlify and Vercel are doing for the frontend.
"
---

## What is [Nhost](https://github.com/nhost/nhost)

<img width="1440" alt="NhostLandingPage" src="https://user-images.githubusercontent.com/32492961/187065209-66957b8d-9161-4fe5-adb2-d9366b995808.png">

[Nhost](https://nhost.io/) is the open source GraphQL backend (Firebase Alternative) and a development platform. Nhost is doing for the backend, what Netlify and Vercel are doing for the frontend.

We provide a modern backend with the postgres database,
GraphQL, Authentication, Storage, and Serverless Functions.


Nhost Authentication is a ready-to-use authentication service that is integrated with the [GraphQL API](/platform/graphql) and its permission system from Hasura.

Nhost Authentication lets you authenticate users using different sign-in methods:

- [Email and Password](/platform/authentication/sign-in-with-email-and-password)
- [Magic Link](/platform/authentication/sign-in-with-magic-link)
- [Phone Number (SMS)](/platform/authentication/sign-in-with-phone-number-sms)
- [Google](/platform/authentication/sign-in-with-google)
- [Facebook](/platform/authentication/sign-in-with-facebook)
- [GitHub](/platform/authentication/sign-in-with-github)
- [LinkedIn](/platform/authentication/sign-in-with-linkedin)
- [Spotify](/platform/authentication/sign-in-with-spotify)

## How it works

1. When a user signs up or is created, the user's information is inserted into the `auth.users` table in your database.
2. Nhost returns an access token and a refresh token, together with the user's information.
3. The user sends requests to Nhost services (GraphQL API, Authentication, Storage, Functions) with the access token as a header.
4. The Nhost services use the user's access token to authorize the requests.

Nhost's authentication service is integrated with your database. All users are stored in the `users` table under the `auth` schema.

### Create a Nhost account

First things first, we need to create a new Nhost project.

<img width="1434" alt="CreateYourFirstNhostProject" src="https://user-images.githubusercontent.com/32492961/187065872-30a10875-fd16-4e62-9b45-4d6cecb0f510.png">


So, log in to your Nhost dashboard and click the Create Your First Project button.

Next, give your new Nhost project a name, select a geographic region for your Nhost services and click Create Project.

<img width="1431" alt="NotesApp" src="https://user-images.githubusercontent.com/32492961/187065453-628b240f-d4c1-443b-af4f-ca59bd23638d.png">


## We will be creating a basic Notes app.

### Open Hasura Console

We now need to create a table named ```notes```. 
Every note has an unique id, title and details about when it was created or updated. 

<img width="1434" alt="Create notes table" src="https://user-images.githubusercontent.com/32492961/187066519-9b3071b7-004c-4d8d-8d45-54ab59c38849.png">

`user_id` will be our foreign key refrencing the ID from the users table. 
If you delete a user, cascading will delete all the user's notes.

<img width="1434" alt="Foreign key" src="https://user-images.githubusercontent.com/32492961/187094626-000952a6-74b8-47d9-aadd-fb8f94ca63d9.png">

Create permissions to read, write for the ```users``` role, to have role specific access.

<img width="1432" alt="Insert permission" src="https://user-images.githubusercontent.com/32492961/187094759-896614b8-9cd2-4a4b-bb35-a74cdb42d1e5.png">

<img width="1435" alt="Select permission" src="https://user-images.githubusercontent.com/32492961/187094799-78d6d26a-bf3d-4c5d-81e2-ec3f41d631ca.png">



### Open Nhost Dashboard

Go to the Auth section in the Nhost Dashboard and create a user using mail ID and password. You can add multiple users here.

<img width="1434" alt="Nhost Auth Dashboard" src="https://user-images.githubusercontent.com/32492961/187075955-94e66457-fc3d-46fb-8614-8c8f05ab3fc2.png">

Now copy the User ID that was created on the Nhost Dashboard.

<img width="1428" alt="UserInfo" src="https://user-images.githubusercontent.com/32492961/187076234-797f1c74-f94a-4875-abf0-44d0aee0f65c.png">

Go over to the Hasura console and create a new row using the user ID that you copied from the Nhost Dashboard.

<img width="1435" alt="Insert note with user_id" src="https://user-images.githubusercontent.com/32492961/187076515-5e76d9b3-b9b8-4202-99a4-99872bea4af2.png">

In the GraphiQL playground, uncheck the header ```x-hasura-admin-secret``` so that you can manage role based access. 
Make GraphQL request to get all notes

```
query {
  notes {
    id
    title
  }
}

```
This query will fail because the user is not signed in while making the request.

<img width="1409" alt="Error message on query" src="https://user-images.githubusercontent.com/32492961/187095070-8063b3b6-d87a-47fb-8abf-88b1054024ac.png">

Make a curl command with your email and password in the terminal to sign in and recieve the access token.

```
curl https://{subdomain}.auth.{region}.nhost.run/v1/signin/email-password \
    -v \
    -H "Content-Type: application/json" \
    -d '{ "email": "<email>", "password": "<password" }'
    
```

You now need to first verify your email before using the access token.


<img width="1180" alt="VerifyYourEmail" src="https://user-images.githubusercontent.com/32492961/187076770-44f36f27-6d76-4e77-abba-78e8183cc22b.png">

You can also decode your JWT token [here](https://jwt.io/ )

<img width="1436" alt="Decoding the JWT token" src="https://user-images.githubusercontent.com/32492961/187076780-d6996cfd-bf14-48c2-a663-a0c25d705081.png">

Now add the JWT token in the headers inside GraphiQL like this and make the same query in the playground

```
Authorization: bearer {JWT-token}

```

<img width="1434" alt="Successful Query Retrival" src="https://user-images.githubusercontent.com/32492961/187095035-e4a9d5c4-e65b-4b71-8046-b18252a65321.png">

You can now see the user's details as you have been authenticated using Nhost Authentication and Hasura. Now that you have your authentication and backend setup done, you can go ahead and build your frontend. 

Hope this guide was useful and you can get started with Nhost by following one of our quickstart guides:

- [Next.js](/platform/quickstarts/nextjs)
- [React](/platform/quickstarts/react)
- [RedwoodJS](/platform/quickstarts/redwoodjs)
- [Vue](/platform/quickstarts/vue)


