---
title: "Sync Users with Rules"
metaTitle: "Sync Auth0 Users with Rules | Hasura GraphQL Tutorial"
metaDescription: "In this part, you will learn to set up a rule in Auth0 which allows the users of Auth0 to be in sync with the users in our database"
---

Auth0 has rules that can be set up to be called on every login request. If you remember the second step of Auth0 configuration, we had created a rule to apply custom JWT claims before. Now we need to set up a rule in Auth0 which allows the users of Auth0 to be in sync with the users in our database. The following code snippet allows us to do the same. Again using the Rules feature, create a new empty rule and paste in the following code snippet:

```javascript
function (user, context, callback) {
  const userId = user.user_id;
  const nickname = user.nickname;
  
  const admin_secret = "xxxx";
  const url = "https://ready-panda-91.hasura.app/v1/graphql";
  const query = `mutation($userId: String!, $nickname: String) {
    insert_users(objects: [{
      id: $userId, name: $nickname, last_seen: "now()"
    }], on_conflict: {constraint: users_pkey, update_columns: [last_seen, name]}
    ) {
      affected_rows
    }
  }`;

  const variables = { "userId": userId, "nickname": nickname };

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

![Auth0 insert rule](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-auth0-sync-rule-updated.png)

**Note**: Modify `x-hasura-admin-secret` and `url` parameters appropriately according to your app.
Here we are making a request to make a mutation into `users` table.

That’s it! This rule will now be triggered on every successful signup or login, and we insert or update the user data into our database using a Hasura GraphQL mutation.

The above request performs a mutation on the users table with the `id` and `name` values.
