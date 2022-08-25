---
title: "Course Introduction"
metaTitle: "Course Introduction | GraphQL Unity Hasura Tutorial"
metaDescription: "A tutorial showing how to integrate multiplayer features in Unity games using Hasura GraphQL"
---

This course is a great tutorial that carefully tailors Hasura to implement multiplayer features in Unity.

This course shows how to build the multiplayer features of Shooter Arena, which is an ideal demo of what is possible with Hasura and Unity. 

## Key topics and takeaways:
- GraphQL queries, mutations, subscriptions
- Using GraphQL with Unity
- Online matchmaking
- Cross platform real-time online gameplay
- Authentication with Hasura
- Dynamic Leaderboard 

## What will we be building?
We will be building a cross platform multiplayer realtime first person shooter game.

[![Trailer](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/trailer.png)](https://youtu.be/XO2RXRnmX-k)

Play Shooter Arena to see what we'll be building. Download the apps from:

Google PlayStore: https://play.google.com/store/apps/details?id=com.Gazuntype.ShooterArena

Apple AppStore: https://apps.apple.com/us/app/shooter-arena/id1506191296?ls=1

You can also download a Windows version of the app from:

Itch.io: https://gazuntype.itch.io/shooter-arena

The rules of Shooter Arena are simple. 

- There are two roles in each battle, `Shooter` and `Defender`.
- The `Shooter` goes first and has to shoot some targets as fast as possible. These targets turn red.
- The `Shooter`'s turn ends when they run out of bullets.
- The `Defender` goes next and has to deactivate all the targets the `Shooter` shot. These targets are red at the start of the `Defender`'s turn and change to green when shot.
- The `Defender`'s turn ends when he runs out of time or out of bullets.
- The time the `Shooter` uses in their turn is the time the `Defender` has for their turn, plus 5 seconds.
- The `Defender` wins if they successfully deactivate all the targets the `Shooter` shot. Else, the `Shooter` wins.

## Will this course teach Unity concepts as well?
No, most of the Unity-centric parts of the game have already been built within the boilerplate version of the app.

We will be focused mainly on integrating multiplayer features to the game by utilising Hasura's GraphQL engine.

## What do I need to take this tutorial?
You will need to have Unity. Ideally, version 2019 and upward.

## How long will this tutorial take?
2 hours

## Prerequisite knowledge/skills
- Beginner level understanding of Unity
- Ability to build a realtime GraphQL backend with Hasura

### Courses to gain prerequisite knowledge
**Unity**: [Intro to Unity](https://learn.unity.com/)

**Backend**: [Building a realtime GraphQL backend with Hasura](https://hasura.io/learn/graphql/hasura/introduction/) in 30 mins (ideal for frontend, backend or fullstack developers)
