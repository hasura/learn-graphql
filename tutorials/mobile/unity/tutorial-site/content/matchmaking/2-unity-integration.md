---
title: "Unity Integration"
metaTitle: "Integrating Hasura backend with Unity | GraphQL Unity Hasura Tutorial"
metaDescription: "Utilizing a graphQl client for Unity, we will integrate with our Hasura backend"
---

In the last page, we successfully created all the tables and views we required to introduce matchmaking into our game.

Now, we need to properly interface with that Hasura backend. Go back to your Unity project that contains the boilerplate version of the game.

### Setting up the Unity GraphQL client

First off, we'd need a client to simplify communication with the GraphQL Hasura backend.

For this, we shall be using an open source tool called [graphql-client-unity](https://github.com/Gazuntype/graphQL-client-unity)

Read the documentation for [graphql-client-unity](https://github.com/Gazuntype/graphQL-client-unity) to familiarize yourself with the client.

Download and import the client into your project.

Create an `Api Reference` as shown in the client documentation and name it appropriately.

Next, we'd need the url for our backend. This can be gotten from the `GraphiQL` tab in our Hasura backend. 

![Hasura backend url](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/url.jpg)

After putting the url, we'd need to `introspect` the backend to let the client know the possible queries, mutations and subscriptions.

Click the `Instrospect` button and wait a while for the client to get the info it need.

![Introspect](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/introspect.jpg)

Great! Now our graphQL client is set up and we can begin to make queries and subscriptions.

### Query Mutations and Subscriptions

Now that we've set up the client with our server, we need to make certain queries, mutations and subscriptions for our matchmaking to work.

#### Query

For now, we shall create only one query. `GetOnlineBattles`

```
query GetOnlineBattles{
    online_battles{
    	id
    }
}
```

To create this in our `Api reference` 
- Click `Create New Query`
- Name it `GetOnlineBattles`
- Select `online_battles` as the query
- Click `Confirm Query`
- Create the `id` field.

Your query should look like this.

![GetOnlineBattles](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/get-online-battle.jpg)

According to our backend, `online_battles` is a view that returns all open battles that haven't been joined.

#### Mutations

We shall create 4 mutations.
- `CreateBattle`
- `UpdateOnlineBattle`
- `DeleteBattle`
- `DeleteOldBattles`

#### CreateBattle

```
mutation CreateBattle{
	insert_battles{
		returning{
			id
			shooter_id
		}
	}
}
```

To create this in our `Api reference` 
- Click `Create New Mutation`
- Name it `CreateBattle`
- Select `insert_battles` as the mutation
- Click `Confirm Mutation`
- Create the `returning` field
- Create sub-fields `id` and `shooter_id` 

Your mutation should look like this.

![CreateBattle](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/create-battle.jpg)

`insert_battles` is a mutation that allows us to create a new battle row in our `battles` table in Hasura.

This would be used to create a battle if no open online battles is found. In accordance to our [Matchmaking Flow Chart](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/matchmaking-flow.png)

#### UpdateOnlineBattle

```
mutation UpdateOnlineBattle{
	update_battles{
		returning{
			id
			shooter_id
			defender_id
			shooterReady
			defenderReady
		}
	}
}
```

To create this in our `Api reference` 
- Click `Create New Mutation`
- Name it `UpdateOnlineBattle`
- Select `update_battles` as the mutation
- Click `Confirm Mutation`
- Create the `returning` field
- Create sub-fields `id`, `shooter_id`, `defender_id`, `shooterReady`, `defenderReady` 

Your mutation should look like this.

![UpdateOnlineBattle](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/update-online-battle.jpg)

`update_battles` is a mutation that allows us to update a new battle row in our `battles` table in Hasura.

This would be used to join battles (ergo, setting the defender_id to the player's id) and to update the `shooterReady` and `defenderReady` flags.

#### DeleteBattle

```
mutation DeleteBattle{
	delete_battles{
		returning{
			id
		}
	}
}
```

To create this in our `Api reference` 
- Click `Create New Mutation`
- Name it `DeleteBattle`
- Select `delete_battles` as the mutation
- Click `Confirm Mutation`
- Create the `returning` field
- Create sub-fields `id`

Your mutation should look like this.

![DeleteBattle](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/delete-battle.jpg)

`delete_battles` is a mutation that allows us to delete a battle row in our `battles` table in Hasura.

This would be used to delete battles if no one joins after a period of time.

#### DeleteOldBattles

```
mutation DeleteOldBattles{
	delete_old_battles{
		returning{
			id
		}
	}
}
```

To create this in our `Api reference` 
- Click `Create New Mutation`
- Name it `DeleteOldBattles`
- Select `delete_old_battles` as the mutation
- Click `Confirm Mutation`
- Create the `returning` field
- Create sub-fields `id`

Your mutation should look like this.

![DeleteOldBattles](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/delete-old-battles.jpg)

`old_battles` is a view that shows battles that were created over 50 seconds ago and no one joined.

`delete_old_battles` is a mutation to delete the battles that fall into that view.

This would be used to clean up the database and delete any old battles that exist.

#### Subscription

For now, we shall create only one subscription. `SubscribeToBattle`

```
subscription SubscribeToBattle{
	battles_by_pk{
		id
		shooterReady
		defenderReady
		shooter{
			id
			username
		}
		defender{
			id
			username
		}
		shooter_lastseen
		defender_lastseen
	}
}
```

To create this in our `Api reference` 
- Click `Create New Subscription`
- Name it `SubscribeToBattle`
- Select `battles_by_pk` as the subscription
- Click `Confirm Subscription`
- Create the all the fields and subfields.

Your subscription should look like this.

![SubscribeToBattle](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/subscribe-to-battle.jpg)

Subscribing to `battles_by_pk` let's our client receive data anytime a particular battle is updated. 

We would be using this to get notified when someone joins our open battle. Amongst other things.

And that's it! We've integrated our Unity project with our Hasura backend. 

Next up, we'll write some code to tie everything together and get our matchmaking in order!