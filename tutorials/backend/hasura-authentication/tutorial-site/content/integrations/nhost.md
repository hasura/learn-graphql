---
title: "Nhost"
metaTitle: "Nhost | Hasura Authentication Tutorial"
metaDescription: "Nhost is the open source Firebase alternative with GraphQL and a development platform. Nhost is doing for the backend, what Netlify and Vercel are doing for the frontend.
"
---

## What is Nhost?

[Nhost](https://nhost.io/) is the open-source Firebase alternative with GraphQL and a development platform. Nhost is doing for the backend, what Netlify and Vercel are doing for the frontend. We provide a modern backend with the Postgres database, GraphQL API, Authentication, Storage, and Serverless Functions.

Nhost Authentication is a ready-to-use authentication service that is integrated with the [GraphQL API](https://docs.nhost.io/platform/graphql) and its permission system from Hasura. Nhost Authentication lets you authenticate users using different sign-in methods:
- [Email and Password](https://docs.nhost.io/platform/authentication/sign-in-with-email-and-password)
- [Magic Link](https://docs.nhost.io/platform/authentication/sign-in-with-magic-link)
- [Phone Number (SMS)](https://docs.nhost.io/platform/authentication/sign-in-with-phone-number-sms)
- [Google](https://docs.nhost.io/platform/authentication/sign-in-with-google)
- [Facebook](https://docs.nhost.io/platform/authentication/sign-in-with-facebook)
- [GitHub](https://docs.nhost.io/platform/authentication/sign-in-with-github)
- [LinkedIn](https://docs.nhost.io/platform/authentication/sign-in-with-linkedin)
- [Spotify](https://docs.nhost.io/platform/authentication/sign-in-with-spotify)
- [Discord](https://docs.nhost.io/platform/authentication/sign-in-with-discord)
- [Twitch](https://docs.nhost.io/platform/authentication/sign-in-with-twitch)

## How it works

1. When a user signs up, the user's information is inserted into the `auth.users` table in your database.
2. Nhost returns an access token and a refresh token, together with the user's information.
3. The user sends requests to Nhost services (GraphQL API, Authentication, Storage, Functions) with the access token as a header.
4. The Nhost services use the user's access token to authorize the requests.

Nhost's authentication service is integrated with your database. All users are stored in the `users` table under the `auth` schema.

### Create a Nhost project

If this is your first Nhost project, sign up using your GitHub or email. The next step is to create a Nhost project.

![image](https://user-images.githubusercontent.com/32492961/188327361-f5f808ac-5101-481b-aa1c-cedecb1fab38.png)

Click the Create Your First Project button to add project details.

![Welcome to Nhost page](https://user-images.githubusercontent.com/32492961/187065872-30a10875-fd16-4e62-9b45-4d6cecb0f510.png)

Give your new Nhost project a name, select a region and click Create Project.

![New project page in Nhost console](https://user-images.githubusercontent.com/32492961/187065453-628b240f-d4c1-443b-af4f-ca59bd23638d.png)

## A basic Notes app

For this guide, will be creating the backend for a notes app with two users. Each user will have a note with a unique id, title, body and details about when it was created or updated.

![Nhost app dashboard](https://user-images.githubusercontent.com/32492961/188325902-853817c4-8bba-45d7-a6ca-0164a75eb289.png)

We now need to create a table named ```notes```. The table will be created via Hasura Console. Click on Hasura from the Nhost panel. Copy the Admin Secret and click on Open Hasura.

![The application's admin secret key](https://user-images.githubusercontent.com/32492961/188326035-0635ea5b-face-4140-95ac-ef003e2a27f6.png)

Paste the Admin secret and press Enter

![Launching Hasura project](https://user-images.githubusercontent.com/32492961/188326547-9ab4998f-b4f5-46a0-b996-93b9c0f8e251.png)

Head over to the Data tab and under the public schema of Databases, click on Create Table.

![Hasura console](https://user-images.githubusercontent.com/32492961/188326729-d5a78d63-e260-4b55-917a-911a430eef57.png)

Enter table name, comment and column details as shown below.

![Create a new table in Hasura](https://user-images.githubusercontent.com/32492961/187066519-9b3071b7-004c-4d8d-8d45-54ab59c38849.png)

`user_id` will be our foreign key referencing the ID from the users table. If you delete a user, cascading will delete all the user's notes.

![Set up foreign keys](https://user-images.githubusercontent.com/32492961/187094626-000952a6-74b8-47d9-aadd-fb8f94ca63d9.png)

Create permissions to read and write for the ```users``` role, to have role-specific access.

![Table permissions for the user role](https://user-images.githubusercontent.com/32492961/187094759-896614b8-9cd2-4a4b-bb35-a74cdb42d1e5.png)

![Table permissions for the user role](https://user-images.githubusercontent.com/32492961/187094799-78d6d26a-bf3d-4c5d-81e2-ec3f41d631ca.png)

### Create users

Go to the Auth section in the Nhost Dashboard and click on Add user to create users using email and password.

![Add a new record in Nhost](https://user-images.githubusercontent.com/32492961/188327487-4dc1ea6e-3ac7-4de7-88e5-a945f540eee5.png)

We have created two users.

![App records in Nhost](https://user-images.githubusercontent.com/32492961/188328245-234b9ab4-885c-402d-8291-05d42c35814e.png)

Now copy the User ID of the user you created.

![Edit user details](https://user-images.githubusercontent.com/32492961/187076234-797f1c74-f94a-4875-abf0-44d0aee0f65c.png)

Go over to the Database to access the notes table you created in Hasura. Add a new row using the user ID that you copied previously.

![Notes table in Nhost](https://user-images.githubusercontent.com/32492961/188327658-a46246bc-e56b-42e2-b064-1181f04a9ae2.png)

![Insert a new row in Nhost](https://user-images.githubusercontent.com/32492961/188328085-9c9bafab-c8c5-4232-af79-5d95f0a3f9ff.png)

Similarly, add the other user's note by adding their user id.

Now head over to the Hasura console's GraphiQL playground, and uncheck the header ```x-hasura-admin-secret``` so that you can manage role-based access. 
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

![Test app access](https://user-images.githubusercontent.com/32492961/187095070-8063b3b6-d87a-47fb-8abf-88b1054024ac.png)

Make a curl command with the user's email and password in the terminal to sign in and receive the access token.

```
curl https://joprqixhifsgfwzrmxtp.auth.ap-south-1.nhost.run/v1/signin/email-password \
    -v \                                 
    -H "Content-Type: application/json" \
    -d '{ "email": "pratimbhosale@gmail.com", "password": "TestNhostApp@123" }'
```
```
{"session":{"accessToken":"eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsIm1lIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiZWM1OGNiZTgtZWI1Ny00NDM2LWFkMDktZjFmNDJmYjk1OGIzIiwieC1oYXN1cmEtdXNlci1pcy1hbm9ueW1vdXMiOiJmYWxzZSJ9LCJzdWIiOiJlYzU4Y2JlOC1lYjU3LTQ0MzYtYWQwOS1mMWY0MmZiOTU4YjMiLCJpYXQiOjE2NjI1MzQ3ODksImV4cCI6MTY2MjUzNTY4OSwiaXNzIjoiaGFzdXJhLWF1dGgifQ.vnJuBTc5kn-Vtuy7BzFlhvPpk4GwrZN_8syAu_ckCCM","accessTokenExpiresIn":900,"refreshToken":"cebaca26-6c51-42cc-a978-ae8702beb53e","user":{"id":"ec58cbe8-eb57-4436-ad09-f1f42fb958b3","createdAt":"2022-08-28T08:00:50.105078+00:00","displayName":"pratimbhosale@gmail.com","avatarUrl":"https://s.gravatar.com/avatar/0869e6d3ab4951a7262c3d680be4b680?r=g&default=blank","locale":"en","email":"pratimbhosale@gmail.com","isAnonymous":false,"defaultRole":"user","metadata":{},"emailVerified":true,"phoneNumber":null,"phoneNumberVerified":false,"activeMfaType":null,"roles":["user","me"]}},"mfa":null}% 
<img width="1435" alt="Curl command for pratim" src="https://user-images.githubusercontent.com/32492961/188328581-f7101009-e376-4833-b9f6-608c345c2e26.png">

```

When a user signs in, they receive a JWT token that is used when making GraphQL requests. A JWT token consists of a header, payload and signature. 

In the payload, you can see things like the user's id and default role.

![The decoded JWT token](https://user-images.githubusercontent.com/32492961/188329017-e4de498a-b7fa-43a6-888b-514b6cc76025.png)

You can also decode your JWT token [here](https://jwt.io/ ) and verify it using the `NHOST_JWT_SECRET` environment variable found in the settings.

![The environment variables section in Nhost](https://user-images.githubusercontent.com/32492961/188810071-9ee1262c-a06e-472c-9046-5b73dd498871.png)

Now add the JWT token in the headers inside GraphiQL like this and make the same query in the playground.

```
Authorization: Bearer {JWT-token}

```

![Hasura console showing a query that retrieves all notes from the database](https://user-images.githubusercontent.com/32492961/188329558-bc0dd027-9ac8-4467-8088-4aa4ce4c89a3.png)

You can now see the user's details as you have been authenticated using Nhost Authentication and Hasura.

Let's try to retrieve Tom's note using the following query.

```
query {
  notes(where: {id: {_eq: 2}}) {
    id 
    title
  }
}

```

![Hasura console showing a query that retrieves a specific note from the database](https://user-images.githubusercontent.com/32492961/188329697-aa6e63e2-6e95-4beb-9177-c9a742a3f880.png)

The response is empty. Wonder why? 

It is because we are trying to access Tom's details while we are logged in as Pratim. We previously defined permissions so that users can only read and write their notes. To access Tom's notes, we need to make the request using a JWT token issued to Tom. 

We make the same curl command in our terminal with Tom's login details.

```
curl https://joprqixhifsgfwzrmxtp.auth.ap-south-1.nhost.run/v1/signin/email-password \
    -v \
    -H "Content-Type: application/json" \
    -d '{ "email": "tom@gmail.com", "password": "test@123" }'
```    
    
```
{"session":{"accessToken":"eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsIm1lIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiNDU5ZmQ5NGMtZmIxNC00OWVjLWFkMjAtMjQ4YmJkMmJhOTQ0IiwieC1oYXN1cmEtdXNlci1pcy1hbm9ueW1vdXMiOiJmYWxzZSJ9LCJzdWIiOiI0NTlmZDk0Yy1mYjE0LTQ5ZWMtYWQyMC0yNDhiYmQyYmE5NDQiLCJpYXQiOjE2NjI1MzM1MjIsImV4cCI6MTY2MjUzNDQyMiwiaXNzIjoiaGFzdXJhLWF1dGgifQ.J-yCfxloyCvF0NCGvhferydft3NOJbL1q-wIgsxf-rI","accessTokenExpiresIn":900,"refreshToken":"f33bb87c-4ab0-4dbf-a352-5b04db246d7a","user":{"id":"459fd94c-fb14-49ec-ad20-248bbd2ba944","createdAt":"2022-09-04T16:25:32.641977+00:00","displayName":"tom@gmail.com","avatarUrl":"https://s.gravatar.com/avatar/44e330dea0304e5f8005ef073510b2b1?r=g&default=blank","locale":"en","email":"tom@gmail.com","isAnonymous":false,"defaultRole":"user","metadata":{},"emailVerified":false,"phoneNumber":null,"phoneNumberVerified":false,"activeMfaType":null,"roles":["user","me"]}},"mfa":null}% 

```

You can now view Tom's note by adding the JWT token in the Authorization header and making the same query again.

![Hasura console showing a query that retrieves all notes from the database](https://user-images.githubusercontent.com/32492961/188330407-524f7f97-4ef4-4ec5-9cc4-81c5d7899e92.png)

Now that you have your authentication and backend setup done, you can go ahead and build your frontend. You can get started with Nhost by following one of the quickstart guides:
- [Next.js](https://docs.nhost.io/platform/quickstarts/nextjs)
- [React](https://docs.nhost.io/platform/quickstarts/react)
- [RedwoodJS](https://docs.nhost.io/platform/quickstarts/redwoodjs)
- [Vue](https://docs.nhost.io/platform/quickstarts/vue)
