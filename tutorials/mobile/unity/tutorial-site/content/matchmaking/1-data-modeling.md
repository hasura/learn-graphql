---
title: "Data Modeling"
metaTitle: "Data Modeling for Matchmaking with Hasura | GraphQL Unity Hasura Tutorial"
metaDescription: "We shall create two tables, Users and Battles and also create some views"
---

We shall be creating two tables! 
One for Users and the other for Battles

### Create Users Table

The `users` table will have the following columns:

- `id` (Integer, unique, non-nullable, auto-increment, primary key)
- `username` (Text, unique, non-nullable)

These columns are self-explanatory.

Ensure you set the column `id` as the primary key for the table.

![User Table](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/user-table.jpg)

The `users` table contains data concerning our players. For now, let's create two mock players.

This can be done in the `Insert Row` tab in the users table. You can give the two mock players whatever usernames you want, but I shall be using `test1` and `test2`.

![Insert First Player](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/insert-user.jpg)

![Insert Second User](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/insert-second-user.jpg)

### Create Battles Table

Next up, we shall create the `battles` table. It shall have the following columns:

- `id` (Integer, unique, non-nullable, auto-increment, primary key)
- `shooter_id` (Integer, nullable)
- `defender_id` (Integer, nullable)
- `shooterReady` (Boolean, non-nullable, default: false)
- `defenderReady` (Boolean, non-nullable, default: false)
- `shooter_lastseen` (Timestamp, nullable, default: now())
- `defender_lastseen` (Timestamp, nullable, default: now())  

Ensure you set the column `id` as the primary key for the table.

![Battle Table](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/battle-table.jpg)

Let us go through these columns to understand why they're important for matchmaking purposes.

- `id`: `id` for the battle created. Each battle is unique between two players.
- `shooter_id`: `id` for the `user` that will be the Shooter.
- `defender_id`: `id` for the `user` that will be the Defender.
- `shooterReady`: after two players have been paired and a battle created, this flag is set to confirm the Shooter is still available for the battle.
- `defenderReady`: after two players have been paired and a battle created, this flag is set to confirm the Defender is available for the battle.
- `shooter_lastseen`: last time the shooter was seen in the battle. This is used to confirm if the Shooter disconnects from the game.
- `defender_lastseen`: last time the defender was seen in the battle. This is used to confirm if the Defender disconnects from the game.

If you recall the flow chat in [Matchmaking Overview](https://hasura.io/learn/graphql/unity/matchmaking/), the necessity for the `shooterReady` and `defenderReady` flags is apparent.

### Connect Battles with Users

To ensure that the `shooter_id` column points to an actual `users` row, we add a foreign key in `battles`

![Shooter foreign key](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/shooter-foreign-key.jpg)

To ensure that the `defender_id` column points to an actual `users` row, we add a foreign key in `battles`

![Defender foreign key](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/defender-foreign-key.jpg)

Then head over to the `Relationships` tab and add the relationship between shooter_id, defender_id and users. These will be the suggested relationships based on foreign keys.
![Relationships](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/relationships.jpg)

To make things easier and cleaner, we shall create two [Views](https://hasura.io/learn/graphql/hasura/data-transformations/) `OnlineBattles` and `OldBattles`.

### Create Online Battles View

Click the SQL tab put this in.

```sql
CREATE OR REPLACE VIEW "public"."online_battles" AS 
 SELECT battles.id,
    battles.shooter_id
   FROM battles
  WHERE (battles.defender_id IS NULL);
```
Ensure `Track this` is selected and click `Run`

![Online Battles View](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/online-battles.jpg)

This View displays only `Online Battles`, meaning open battles that no opponent has joined. 

We'll use this view to first check if there are existing open battles before creating an open battle. (in accordance with the flow chat in [Matchmaking Overview](https://hasura.io/learn/graphql/unity/matchmaking/))

### Create Old Battles View

Click the SQL tab put this in.

```sql
CREATE OR REPLACE VIEW "public"."old_battles" AS 
 SELECT battles.id
   FROM battles
  WHERE ((battles.shooter_lastseen <= (now() - '00:00:50'::interval)) AND (battles.defender_id IS NULL));
```
Ensure `Track this` is selected and click `Run`

![Old Battles View](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/old-battles.jpg)

This View displays only `Old Battles`, meaning battles that were open over 50 seconds ago and no one joined.

We'll use this view to automatically delete `Old Battles` to avoid players joining them.  

And that's it for the Hasura side of things for now! Let's head over to Unity to integrate our Hasura backend.