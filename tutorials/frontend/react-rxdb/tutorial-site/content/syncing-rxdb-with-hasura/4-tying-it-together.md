---
title: "Tying it to together"
metaTitle: "Tying it together | React + RxDB + Hasura GraphQL Tutorial"
metaDescription: "The only thing left is to understand is how does authentication work? We need to do three things with respect to authentication which revolves around JWT token"
---

The only thing left is to understand is how does authentication work? We need to do three things with respect to authentication:

1. Pass the JWT token from Auth0 to Hasura while firing the pull & push query
2. Pass the JWT token from Auth0 to Hasura while setting up the GraphQL subscription
3. Restart the replication process whenever the JWT token changes. Eg: if the user logs out and logs back in

In the previous section we have seen that #2 is taken care of by passing the `Authorization` header in the `connectionParams`.

Similarly, #1 is taken care of while initializing RxDB:

```js
async setupGraphQLReplication(auth) {
    const replicationState = this.db.todos.syncGraphQL({
        url: syncURL,
        headers: {
            'Authorization': `Bearer ${auth.idToken}`
        },
        push: {
            batchSize,
            queryBuilder: pushQueryBuilder
        },
        pull: {
            queryBuilder: pullQueryBuilder(auth.userId)
        },
        live: true,
        /**
        * Because the websocket is used to inform the client
        * when something has changed,
        * we can set the liveIntervall to a high value
        */
        liveInterval: 1000 * 60 * 10, // 10 minutes
        deletedFlag: 'deleted'
    });

    replicationState.error$.subscribe(err => {
        console.error('replication error:');
        console.dir(err);
    });

    return replicationState;
}
```

Finally for #3 we add a restart method in the `GraphQLReplicator` class:

```js
async restart(auth) {
    if(this.replicationState) {
        this.replicationState.cancel()
    }

    if(this.subscriptionClient) {
        this.subscriptionClient.close()
    }

    this.replicationState = await this.setupGraphQLReplication(auth)
    this.subscriptionClient = this.setupGraphQLSubscription(auth, this.replicationState)
}
```

This method is called by the `AppWrapper` class whenever there is a change the authentication token.