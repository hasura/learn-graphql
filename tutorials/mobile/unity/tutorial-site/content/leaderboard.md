---
title: "Leaderboard"
metaTitle: "Implementing Leaderboard | GraphQL Unity Hasura Tutorial"
metaDescription: "Using Hasura Actions to Implement a Worldwide Leaderboard"
---

We've reached the last part of our Shooter Arena tutorial and we shall be implementing the worldwide leaderboard.

We shall be recording the number of wins and losses each user has and they shall be ranked by the difference. (wins - losses)

We shall be using [Hasura Actions](https://hasura.io/docs/latest/graphql/core/actions/index.html) to automatically increase the `wins` column of the winner and the `losses` column of the loser depending on the `battle` data.

This way, users don't have permission to update their `wins` or `losses` columns, ensuring there is no cheating.
