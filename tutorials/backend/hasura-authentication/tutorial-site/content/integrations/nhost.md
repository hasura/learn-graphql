---
title: "Nhost"
metaTitle: "Nhost | Hasura Authentication Tutorial"
metaDescription: "Nhost is the open source Firebase alternative with GraphQL and a development platform. Nhost is doing for the backend, what Netlify and Vercel are doing for the frontend.
"
---

## What is [Nhost](https://github.com/nhost/nhost)

<img width="1440" alt="NhostLandingPage" src="https://user-images.githubusercontent.com/32492961/187065209-66957b8d-9161-4fe5-adb2-d9366b995808.png">

[Nhost](https://nhost.io/) is the open source Firebase alternative with GraphQL and a development platform. Nhost is doing for the backend, what Netlify and Vercel are doing for the frontend.

We provide a modern backend with the Postgres database, GraphQL API, Authentication, Storage, and Serverless Functions.


Nhost Authentication is a ready-to-use authentication service that is integrated with the [GraphQL API](/platform/graphql) and its permission system from Hasura.

Nhost Authentication lets you authenticate users using different sign-in methods:

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

If this is your first Nhost project, sign up using your GitHub or email.
Next step is to create an Nhost project.

![image](https://user-images.githubusercontent.com/32492961/188327361-f5f808ac-5101-481b-aa1c-cedecb1fab38.png)

Click the Create Your First Project button to add project details.

<img width="1434" alt="CreateYourFirstNhostProject" src="https://user-images.githubusercontent.com/32492961/187065872-30a10875-fd16-4e62-9b45-4d6cecb0f510.png">

Give your new Nhost project a name, select a region and click Create Project.

<img width="1431" alt="NotesApp" src="https://user-images.githubusercontent.com/32492961/187065453-628b240f-d4c1-443b-af4f-ca59bd23638d.png">


## A basic Notes app

For this guide, will be creating the backend for a notes app with two users. Each user will have a note with an unique id, title, body and details about when it was created or updated.

<img width="1440" alt="Screenshot 2022-09-04 at 10 57 24 PM" src="https://user-images.githubusercontent.com/32492961/188325902-853817c4-8bba-45d7-a6ca-0164a75eb289.png">

We now need to create a table named ```notes```. The table will be created via Hasura Console.
Click on Hasura from the Nhost panel. Copy the Admin Secret and click on Open Hasura.

<img width="1440" alt="Screenshot 2022-09-04 at 10 58 50 PM" src="https://user-images.githubusercontent.com/32492961/188326035-0635ea5b-face-4140-95ac-ef003e2a27f6.png">

Paste the Admin secret and press Enter

<img width="1439" alt="Capture d’écran 2022-09-04 à 23 11 11" src="https://user-images.githubusercontent.com/32492961/188326547-9ab4998f-b4f5-46a0-b996-93b9c0f8e251.png">

Head over to the Data tab and under the public schema of Databases, click on Create Table.

<img width="1439" alt="Capture d’écran 2022-09-04 à 23 15 38" src="https://user-images.githubusercontent.com/32492961/188326729-d5a78d63-e260-4b55-917a-911a430eef57.png">

Enter table name, comment and column details as shown below.


<img width="1434" alt="Create notes table" src="https://user-images.githubusercontent.com/32492961/187066519-9b3071b7-004c-4d8d-8d45-54ab59c38849.png">

`user_id` will be our foreign key refrencing the ID from the users table. 
If you delete a user, cascading will delete all the user's notes.

<img width="1434" alt="Foreign key" src="https://user-images.githubusercontent.com/32492961/187094626-000952a6-74b8-47d9-aadd-fb8f94ca63d9.png">

Create permissions to read, write for the ```users``` role, to have role specific access.

<img width="1432" alt="Insert permission" src="https://user-images.githubusercontent.com/32492961/187094759-896614b8-9cd2-4a4b-bb35-a74cdb42d1e5.png">

<img width="1435" alt="Select permission" src="https://user-images.githubusercontent.com/32492961/187094799-78d6d26a-bf3d-4c5d-81e2-ec3f41d631ca.png">



### Create users

Go to the Auth section in the Nhost Dashboard click on Add user to create users using mail ID and password.

<img width="1435" alt="User" src="https://user-images.githubusercontent.com/32492961/188327487-4dc1ea6e-3ac7-4de7-88e5-a945f540eee5.png">

We have created two users.

<img width="1440" alt="Screenshot 2022-09-04 at 11 40 33 PM" src="https://user-images.githubusercontent.com/32492961/188328245-234b9ab4-885c-402d-8291-05d42c35814e.png">


Now copy the User ID of the user you created.

<img width="1428" alt="UserInfo" src="https://user-images.githubusercontent.com/32492961/187076234-797f1c74-f94a-4875-abf0-44d0aee0f65c.png">

Go over to the Database to access the notes table you created in Hasura. Add a new row using the user ID that you copied previously.

<img width="1440" alt="Screenshot 2022-09-04 at 11 42 00 PM" src="https://user-images.githubusercontent.com/32492961/188327658-a46246bc-e56b-42e2-b064-1181f04a9ae2.png">

<img width="1440" alt="Screenshot 2022-09-04 at 10 12 39 PM" src="https://user-images.githubusercontent.com/32492961/188328085-9c9bafab-c8c5-4232-af79-5d95f0a3f9ff.png">

Similarly add the other user's note by adding their user id.

Now head over to the Hasura console's GraphiQL playground, uncheck the header ```x-hasura-admin-secret``` so that you can manage role based access. 
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

Make a curl command with the user's email and password in the terminal to sign in.

```
curl https://{subdomain}.auth.{region}.nhost.run/v1/signin/email-password \
    -v \
    -H "Content-Type: application/json" \
    -d '{ "email": "<email>", "password": "<password" }'
    
```
<img width="1435" alt="Curl command for pratim" src="https://user-images.githubusercontent.com/32492961/188328581-f7101009-e376-4833-b9f6-608c345c2e26.png">

<img width="1431" alt="Curlcommand" src="https://user-images.githubusercontent.com/32492961/188328652-005fc6f9-3b0f-419d-8a8e-ae39a9a9f452.png">

When a user logs in, the recieve a JWT token that can be used to access their details. This token is generally encoded. 
A JWT token consits of a header, payload and signature. 

You can see our user's user id and role in mentioned in the payload below.


<img width="1440" alt="Screenshot 2022-09-05 at 12 21 20 AM" src="https://user-images.githubusercontent.com/32492961/188329017-e4de498a-b7fa-43a6-888b-514b6cc76025.png">

You can also decode your JWT token [here](https://jwt.io/ )

> **_NOTE:_**  You can use the Hasura Admin secret code to verify the JWT signature.

Now add the JWT token in the headers inside GraphiQL like this and make the same query in the playground

```
Authorization: bearer {JWT-token}

```

<img width="1440" alt="Screenshot 2022-09-05 at 12 35 04 AM" src="https://user-images.githubusercontent.com/32492961/188329558-bc0dd027-9ac8-4467-8088-4aa4ce4c89a3.png">


You can now see the user's details as you have been authenticated using Nhost Authentication and Hasura.

Let's try to retrive Tom's note using the following query.

```
query {
  notes(where: {id: {_eq: 2}}) {
    id 
    title
  }
}

```


<img width="1440" alt="Screenshot 2022-09-05 at 12 37 32 AM" src="https://user-images.githubusercontent.com/32492961/188329697-aa6e63e2-6e95-4beb-9177-c9a742a3f880.png">

The response is empty. Wonder why? 

It is because we are tying to access Tom's details while we are logged in as Pratim.
We previously defined permissions so that users can only read and write their own notes.

In order to access Tom's notes, we need Tom's JWT token. 

We make the same curl command in our terminal with Tom's login details.

<img width="1426" alt="Screenshot 2022-09-05 at 12 50 27 AM" src="https://user-images.githubusercontent.com/32492961/188330168-d981ce6a-9871-4d55-9f67-7bcb794faac1.png">


<img width="1434" alt="Screenshot 2022-09-05 at 12 52 04 AM" src="https://user-images.githubusercontent.com/32492961/188330139-e90f24c0-51b2-4514-bb5b-7c708132bc3b.png">

You can now view Tom's note by adding the JWT token in the Authorization header and making the same query again.

<img width="1432" alt="Screenshot 2022-09-05 at 12 54 51 AM" src="https://user-images.githubusercontent.com/32492961/188330407-524f7f97-4ef4-4ec5-9cc4-81c5d7899e92.png">


Now that you have your authentication and backend setup done, you can go ahead and build your frontend. 

Hope this guide was useful and you can get started with Nhost by following one of our quickstart guides:

- [Next.js](/platform/quickstarts/nextjs)
- [React](/platform/quickstarts/react)
- [RedwoodJS](/platform/quickstarts/redwoodjs)
- [Vue](/platform/quickstarts/vue)


