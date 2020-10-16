---
title: "Trigger replication on changes"
metaTitle: "Trigger replication on changes | React + RxDB + Hasura GraphQL Tutorial"
metaDescription: "By default RxDB will periodically sync from the remote GraphQL source. This time interval for the sync to be triggered can be set by using the liveInterval parameter."
---

By default RxDB will periodically sync from the remote GraphQL source. This time interval for the sync to be triggered can be set by using the `liveInterval` parameter. In this example we have set it to 10 minutes. However, we can also use a GraphQL subscription so that Hasura notifies us as soon as there is a change and trigger replication manually. This is done by the `setupGraphQLSubscription` method of the `GraphQLReplicator` class. 

```js
setupGraphQLSubscription(auth, replicationState) {
    // Change this url to point to your hasura graphql url
    const endpointURL = 'wss://my-hasura-instance.hasura.app/v1/graphql'; 
    
    const wsClient = new SubscriptionClient(endpointURL, {
        reconnect: true,
        connectionParams: {
            headers: {
                'Authorization': `Bearer ${auth.idToken}`
            }
        },
        timeout: 1000 * 60,
        onConnect: () => {
            console.log('SubscriptionClient.onConnect()');
        },
        connectionCallback: () => {
            console.log('SubscriptionClient.connectionCallback:');
        },
        reconnectionAttempts: 10000,
        inactivityTimeout: 10 * 1000,
        lazy: true
    });

    const query = `subscription onTodoChanged {
        todos {
            id
            deleted
            isCompleted
            text
        }       
    }`;

    const ret = wsClient.request({ query });

    ret.subscribe({
        next(data) {
            console.log('subscription emitted => trigger run');
            console.dir(data);
            replicationState.run();
        },
        error(error) {
            console.log('got error:');
            console.dir(error);
        }
    });

    return wsClient
}    
```

The above code uses [Apollo subscription client](https://github.com/apollographql/subscriptions-transport-ws) to subscribe to changes on the `todos` table from hasura. It then triggers replication whenever new data is received.
