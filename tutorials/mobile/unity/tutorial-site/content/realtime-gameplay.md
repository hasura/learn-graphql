---
title: "Realtime Gameplay Overview"
metaTitle: "Realtime Online FPS Gameplay | GraphQL Unity Hasura Tutorial"
metaDescription: "This part covers implementing the multiplayer realtime gameplay of our project."
---

Since we have succeeded in matchmaking players, our next step is to implement the actual competitive realtime gameplay between them.

The game mechanics of spawning targets, shooting, raycasting and all of that have already been implemented in the boilerplate version of the app
We would be solely focused on making it a realtime two-player competitive game where the actions of one player affects the other player.

If you've played Shooter Arena, the multiplayer gameplay would be apparent. If you haven't, here's how it goes.

The rules of Shooter Arena are simple. 

- There are two roles in each battle, `Shooter` and `Defender`.
- The `Shooter` goes first and has to shoot some targets as fast as possible. These targets turn red.
- The `Shooter`'s turn ends when they run out of bullets.
- The `Defender` goes next and has to deactivate all the targets the `Shooter` shot. These targets are red at the start of the `Defender`'s turn and change to green when shot.
- The `Defender`'s turn ends when he runs out of time or out of bullets.
- The time the `Shooter` uses in their turn is the time the `Defender` has for their turn, plus 5 seconds.
- The `Defender` wins if they successfully deactivate all the targets the `Shooter` shot. Else, the `Shooter` wins.

To make this as realtime as possible, as the `Shooter` shoots targets, they automatically turn red on the `Defender`'s game. 

Also, when the `Defender` deactivates targets, they turn green on the `Shooter`'s game. 

We shall be passing information about the battle between two players using `subscriptions`. Both players are subscribed to a `battle` in the database and as they play the game, they make changes to the `battle` and receive the changes made immediately.

Below is a small diagram explaining the flow.

![Realtime flow](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/realtime-gameplay/gameplay-flow.PNG)

Let's get into it!