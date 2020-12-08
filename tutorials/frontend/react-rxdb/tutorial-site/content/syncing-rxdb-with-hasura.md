---
title: "Syncing RxDB with Hasura"
metaTitle: "Syncing RxDB with Hasura | React + RxDB + Hasura GraphQL Tutorial"
metaDescription: "We can setup sync between Hasura and RxDB using the builtin RxDBReplicationGraphQL plugin."
---

We can setup sync between Hasura and RxDB using the builtin `RxDBReplicationGraphQL` plugin. Using this plugin involves three steps

1. Setup a GraphQL query for plugin to use to pull changes from Hasura
2. Setup a GraphQL mutation for the plugin to use for local pushing changes to Hasura
3. Setup a GraphQL subscription handler to trigger sync from Hasura to the local db as soon as there is a change.

One additional aspect is authentication. We need to pass the `JWT` we receive from Auth0 to Hasura while syncing changes. Further everytime there is a change in the `JWT` we need to restart the sync with the newer token.

We will first look do the code changes and then go through each of the changes one by one.

Open `src/components/Database.js` and add the following code:

```js
//Add these imports at the top of the file
import RxDBReplicationGraphQL from 'rxdb/plugins/replication-graphql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

//Add this line along with the other RxDB.plugin lines
RxDB.plugin(RxDBReplicationGraphQL);

// Replace the below with the url to your hasura GraphQL API
const syncURL = 'https://my-hasura-instance.hasura.app/v1/graphql';

const batchSize = 5;
const pullQueryBuilder = (userId) => {
    return (doc) => {
        if (!doc) {
            doc = {
                id: '',
                updatedAt: new Date(0).toUTCString()
            };
        }

        const query = `{
            todos(
                where: {
                    _or: [
                        {updatedAt: {_gt: "${doc.updatedAt}"}},
                        {
                            updatedAt: {_eq: "${doc.updatedAt}"},
                            id: {_gt: "${doc.id}"}
                        }
                    ],
                    userId: {_eq: "${userId}"} 
                },
                limit: ${batchSize},
                order_by: [{updatedAt: asc}, {id: asc}]
            ) {
                id
                text
                isCompleted
                deleted
                createdAt
                updatedAt
                userId
            }
        }`;
        return {
            query,
            variables: {}
        };
    };
};

const pushQueryBuilder = doc => {
    const query = `
        mutation InsertTodo($todo: [todos_insert_input!]!) {
            insert_todos(
                objects: $todo,
                on_conflict: {
                    constraint: todos_pkey,
                    update_columns: [text, isCompleted, deleted, updatedAt]
                }){
                returning {
                  id
                }
              }
       }
    `;
    const variables = {
        todo: doc
    };

    return {
        query,
        variables
    };
};

export class GraphQLReplicator {
    constructor(db) {
        this.db = db;
        this.replicationState = null;
        this.subscriptionClient = null;      
    }

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
}
```

Don't forget to update `syncURL` & `endpointURL` to point to the Hasura instance you have setup earlier.

Add the packages `subscriptions-transport-ws` and `graphql` to `package.json`

```js
    "subscriptions-transport-ws": "^0.9.16",
    "graphql": "^14.5.8"
```

Open `src/components/AppWrapper.js` and initialize `graphqlReplicator` in `componentDidMount`:

```js
  async componentDidMount() {
    const db = await Database.createDb()

    this.setState({ db });

    this.graphqlReplicator = new Database.GraphQLReplicator(db);

    ...
  }
```

Finally in the same file restart `graphqlReplicator` whenever there is a change in the session:

```js
  setSession(authResult) {
    ...

    this.graphqlReplicator.restart({ userId: this.userId, idToken: this.idToken });
  }
```

The UI should now be able to sync data to and from Hasura. In the next few sections we will look at what exactly is happening in the above code.