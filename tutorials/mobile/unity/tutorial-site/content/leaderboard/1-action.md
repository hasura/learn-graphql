---
title: "Actions"
metaTitle: "Set Up Actions | GraphQL Unity Hasura Tutorial"
metaDescription: "Set up the Battle Complete Action"
---

### Hasura Set Up

Let's head over to our `users` table to modify it a bit.

We shall be adding two columns:

- `wins` (Integer, non-nullable, default: 0)
- `losses` (Integer, non-nullable, default: 0)

Next, go to the `Permissions` tab and update the `Select` permission for the user role.

![User Select Permission](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/leaderboard/permissions.jpg)

Now, we create an new Action.

Go to the `Actions` tab and create a new action.

In the Action Definition, put

```text
type Mutation {
  BattleComplete (
    id: Int!
  ): BattleCompleteOutput
}
```

In the new types definition, put

```text
type BattleCompleteOutput {
  status : String!
  message : String!
}
```

![BattleComplete Action](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/leaderboard/battle-complete-action.jpg)

What this does is create a mutation action that takes in an Integer `id` as arguments and returns a `BattleCompleteOutput` object.

The `BattleCompleteOutput` is defined in the new types definition to contain two strings, `status` and `message`

### Glitch Set Up

We're going to host another little project on Glitch to do out logic when BattleComplete is called.

Open the [Glitch Project](https://glitch.com/edit/#!/shooter-battle-complete) and click `Remix To Edit`

Go to `env` and set the `SECRET` to your ADMIN_SECRET

![Secret](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/leaderboard/admin-secret.jpg)

Great, rename the project appropriately and copy the link to the live app. 

That's all the set up for that. Let me explain a bit of what this Glitch project does.

#### Battle Complete Explanation

When we call the BattleComplete action in Hasura, we set the argument to be the `id` of the battle we want to complete. 

The Glitch projects gets the `battle` from Hasura, checks who wins by comparing `hitTargets.Length` with `defendedTargets.Length`.

Then it gets the two `users` in the battle from the `shooter_id` and `defender_id` of the `battle` and increases the `wins` column of the winner and `losses` column of the loser.

Then it deletes the `battle`. That's basically what the Glitch project does. Now let's connect it to our Hasura Action.

#### Connect To Hasura

Go back to the Hasura console and open the action we created. In the `handler`, paste the link to the Glitch live app + /battleComplete.

for example, if the link is `https://glitch.com/edit/#!/shooter-battle-complete`, we'll set the handler to `https://glitch.com/edit/#!/shooter-battle-complete/battleComplete`

![Handler](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/leaderboard/handler.jpg) 

That's it for setting up the action!