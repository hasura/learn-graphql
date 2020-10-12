---
title: "Additional Fields"
metaTitle: "Additional Fields | GraphQL Unity Hasura Tutorial"
metaDescription: "Adding more fields to our battle table, subscription and class"
---

### Update Battles Table

To properly implement the logic in Shooter Arena, we'll need to expand our `battles` table a bit. We have to add some more columns.

Head over to your Hasura backend.

We shall add the following columns:

- `seed` (Integer, non-nullable, default: 3245)
- `hitTargets` (int2vector, nullable)
- `defendedTargets` (int2vector, nullable)
- `attackComplete` (Boolean, non-nullable, default: false)
- `gameComplete` (Boolean, non-nullable, default: false)
- `timeTaken` (Numeric, non-nullable, default: 0)
- `shooterMisses` (Integer, non-nullable, default: 0)
- `defenderMisses` (Integer, non-nullable, default: 0)

![Updated Battles Table](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/realtime-gameplay/battle2-table.jpg)

Let's go through the columns to see their use.

- `seed`: this is a random number that's assigned to the battle when it is created. This shall be used to set the Random state in Unity so that both players get the same set of targets.
- `hitTargets`: this is an array of integers that shall be updated every time the `Shooter` hits a target. Each target has an index and this is what is added to the array. It allows the `Defender`'s game instance know exactly which targets the `Shooter` shot.
- `defendedTargets`: this is an array of integers that shall be updated every time the `Defender` deactivates a target. Each target has an index and this is what is added to the array. It allows the `Shooter`'s game instance know exactly which targets the `Defender` deactivates.
- `attackComplete`: this is a flag that is set to `true` when the `Shooter` completes their turn. The `Shooter`'s turn is complete when they run out of bullets. This flag allows the `Defender`'s game know when to start the `Defender`'s turn.
- `gameComplete`: this is a flag that is set to `truw` when the `Defender` completes their turn. The `Defender`'s turn is over when their time is up or they successfully deactivate all the targets. This flag signifies the end of the battle.
- `timeTaken`: this number value is set after the `Shooter` completes their turn. It is set to the amount of time the `Shooter` uses.
- `shooterMisses`: this is an integer that is increased by 1 every time the `Shooter` misses a target. We shall use this to simulate the `Shooter`'s  shooting on the `Defender`'s game.
- `defenderMisses`: this is an integer that is increased by 1 every time the `Defender` misses a target. We shall use this to simulate the `Defender`'s shooting on the `Shooter`'s  game.

### Update Api Reference
 
Now that we've made changes to the `battles` table in Hasura, we need to update some things in our Api reference in Unity.
 
Head over to the Api reference you created. Because there are changes to the backend, you'll need to `Introspect` again.
 
Click `Introspect` on your Api reference
 
![Introspect](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/introspect.jpg)

After introspecting, scroll down to the subscription we created called `SubscribeToBattle`. We need to add the fields we added in our backend.

![SubscribeToBattle](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/realtime-gameplay/subscribe-to-battle.jpg)

### Update Battles Class

Next up, we need to update the `Battles` class we created in `GameData.cs`

Head over to `GameData.cs` in Assets/_Game/Scripts/Data/GameData.cs

Add the following variables to our `Battles` class

```c#
public int seed;
public float timeTaken;
public bool attackComplete;
public bool gameComplete;
public List<int> hitTargets;
public List<int> defendedTargets;
public int shooterMisses;
public int defenderMisses;
```

So that the class becomes

```c#
public class Battles
{
    public List<Battles> returning;
    public int id;
    public int shooter_id;
    public int defender_id;
    public User.Users shooter;
    public User.Users defender;
    public bool shooterReady;
    public bool defenderReady;

    public int seed;
    public float timeTaken;
    public bool attackComplete;
    public bool gameComplete;
    public List<int> hitTargets;
    public List<int> defendedTargets;
    public int shooterMisses;
    public int defenderMisses;
}
```

And that's it. We've updated everything to reflect the changes we've made in our Hasura backend.
