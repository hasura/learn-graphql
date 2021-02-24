---
title: "Api Calls"
metaTitle: "Functions to call our Hasura backend | GraphQL Unity Hasura Tutorial"
metaDescription: "With a few well-designed functions, we would be able to communicate effectively with our backend"
---

Now that we've successfully crafted the different queries, mutations and subscriptions needed for our matchmaking, we need to write some code to actually implement the logic.

First off, we head into `GameData.cs` script which is contains some code that determines gameplay and whatnot.

`GameData.cs` can be found in Assets/_Game/Scripts/Data/GameData.cs

First off, ensure that we include the necessary namespaces we'd be utilizing.

```c#
using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Threading.Tasks;
using Game.Manager;
using GraphQlClient.Core;
using GraphQlClient.EventCallbacks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;
using Random = UnityEngine.Random;
```

Next, we create a `Battles` class which would have fields matching that of our `battles` table in Hasura.

This is useful in Deserializing the `JSON` data gotten from Hasura.

```c#
public class Battles {
    public List<Battles> returning;
    public int id;
    public int shooter_id;
    public int defender_id;
    public Game.Data.User.Users shooter;
    public Game.Data.User.Users defender;
    public bool shooterReady;
    public bool defenderReady;
}
```

Note, the `Battles` class is created within the `GameData` class.

As you can see, the `Battles` class mimics the type of object that can be returned from our Hasura backend.

Next, we have to define some variables that would be used in our game logic.

Add the code below beneath the other variables that have been declared in `GameData.cs`.

```c#
public GraphApi shooterApi;

[NonSerialized]
public Battles battle;

[NonSerialized]
public float waitingTime;

[NonSerialized]
public ClientWebSocket battleCws;
```

Let's understand the use of these variables.

- `GraphApi shooterApi`: This is a variable to house our `Api Reference`. We need this reference to be able to use the queries, mutations and subscriptions we created.
- `Battles battle`: This is a variable to house battle data gotten from our Hasura backend. Data gotten from the backend will be deserialized into this variable.
- `float waitingTime`: This is the amount of time we intend to wait for an opponent to join our open games. If no one joins before the waiting time runs out, we delete the open battle.
- `ClientWebSocket battleCws`: This is a `ClientWebSocket` reference we shall use for subscribing to our `battles` table from our Hasura backend.

After adding these variables, your Variable Declaration region should look like

```c#
#region Variable Declaration
    public Sounds sounds;
    public User user;
    public ColorScheme colorScheme;
	public GraphApi shooterApi;
    [NonSerialized]
    public GameManager gameManager;
    [NonSerialized]
    public MenuManager menuManager;
    [NonSerialized]
    public AudioSource sfxPlayer;
    [NonSerialized]
    public int bullets;
    [NonSerialized]
    public List<int> hitTargets;
    [NonSerialized]
    public List<int> defendedTargets;
    [NonSerialized]
    public bool shouldCount;
    [NonSerialized]
    public float time;
    [NonSerialized]
    public bool inBattle;
    public GameObject bulletPrefab;
    private Vector3 opponentPosition;
    private int misses;
    private bool attackComplete;
    private bool gameComplete;
    [NonSerialized]
    public Battles battle;
	[NonSerialized]
    public float waitingTime;
	[NonSerialized]
	public ClientWebSocket battleCws;

#endregion
```

Since `GameData.cs` is a [`ScriptableObject`](https://docs.unity3d.com/Manual/class-ScriptableObject.html), it retains data.

Therefore we need a function that resets it to default values. This is the `Reset()` function that is called when `GameData` is enabled.

We'd add the default values for the new variables we just created by adding the code below into `Reset()`

```c#
battle = null;
battleCws = null;
waitingTime = 20;
```

Your entire `Reset()` function should look like this.

```c#
public void Reset(){
	bullets = user.role == User.Role.SHOOTER ? 7 : 10;
	hitTargets = new List<int>();
	defendedTargets = new List<int>();
	shouldCount = false;
	time = 0;
    gameComplete = false;
    attackComplete = false;
    misses = 0;
    opponentPosition = new Vector3(0, 1, 75);
	battle = null;
	battleCws = null;
	waitingTime = 20;
}
```

### Api Calls

We've created variables but now we must write the functions that will get information from our backend.

Copy and paste the code below into `GameData.cs` and function shall be explained.

```c#
#region Api Calls

        public async Task<List<Battles>> GetOnlineBattles(){
            GraphApi.Query onlineBattle = shooterApi.GetQueryByName("GetOnlineBattles", GraphApi.Query.Type.Query);
            UnityWebRequest request = await shooterApi.Post(onlineBattle);
            string result = request.downloadHandler.text;
            return JsonConvert.DeserializeObject<List<Battles>>(RemoveData(result,
                onlineBattle.queryString));
        }

        public async Task<Battles> CreateBattle(){
            GraphApi.Query createBattle = shooterApi.GetQueryByName("CreateBattle", GraphApi.Query.Type.Mutation);
            createBattle.SetArgs(new{objects = new{shooter_id = 1}});
            UnityWebRequest request = await shooterApi.Post(createBattle);
            string result = request.downloadHandler.text;
            return JsonConvert.DeserializeObject<Battles>(RemoveData(result,
                createBattle.queryString));
        }

        private async void UpdateShooterReady(){
            GraphApi.Query updateBattle = shooterApi.GetQueryByName("UpdateOnlineBattle", GraphApi.Query.Type.Mutation);
            updateBattle.SetArgs(new{where = new{id = new{_eq = battle.id}}, _set = new{shooterReady = true}});
            await shooterApi.Post(updateBattle);
        }

        public async Task<Battles> UpdateBattle(int id){
            GraphApi.Query updateBattle = shooterApi.GetQueryByName("UpdateOnlineBattle", GraphApi.Query.Type.Mutation);
            updateBattle.SetArgs(new
                {where = new{id = new{_eq = id}}, _set = new{defender_id = 2, defenderReady = true}});
            UnityWebRequest request = await shooterApi.Post(updateBattle);
            string result = request.downloadHandler.text;
            return JsonConvert.DeserializeObject<Battles>(RemoveData(result,
                updateBattle.queryString));
        }

        private async Task DeleteBattles(){
            GraphApi.Query deleteBattle = shooterApi.GetQueryByName("DeleteBattle", GraphApi.Query.Type.Mutation);
            deleteBattle.SetArgs(new{where = new{id = new{_eq = battle?.id}}});
            await shooterApi.Post(deleteBattle);
        }

		public async Task DeleteOldBattles(){
            GraphApi.Query deleteBattle = shooterApi.GetQueryByName("DeleteOldBattles", GraphApi.Query.Type.Mutation);
            deleteBattle.SetArgs(new{where = new{}});
            await shooterApi.Post(deleteBattle);
        }

        public async void BattleSubscribe(int battleId){
            GraphApi.Query battleSubscribe =
                shooterApi.GetQueryByName("SubscribeToBattle", GraphApi.Query.Type.Subscription);
            battleSubscribe.SetArgs(new{id = battleId});
            battleCws = await shooterApi.Subscribe(battleSubscribe, "battle");
        }

        private void ReceiveBattleData(OnSubscriptionDataReceived subscriptionDataReceived){
            Debug.Log(subscriptionDataReceived.data);
            battle = JsonConvert.DeserializeObject<Battles>(RemoveSubscriptionData(subscriptionDataReceived.data,
                shooterApi.GetQueryByName("SubscribeToBattle", GraphApi.Query.Type.Subscription).queryString));
            if (battle == null){
                shooterApi.CancelSubscription(battleCws, "battle");
                return;
            }

            if (!battle.shooterReady && battle.defenderReady){
                string opponentName =
                    user.role == User.Role.SHOOTER ? battle.defender.username : battle.shooter.username;
                menuManager.SetWaitingText($"Found an opponent. {opponentName}");
                waitingTime = 10;
                if (user.role == User.Role.SHOOTER)
                    UpdateShooterReady();
            }

            if (battle.shooterReady && battle.defenderReady && SceneManager.GetActiveScene().buildIndex == 0){
                string opponentName =
                    user.role == User.Role.SHOOTER ? battle.defender.username : battle.shooter.username;
                menuManager.SetWaitingText($"Entering battle against. {opponentName}");
                if (!inBattle){
                    inBattle = true;
                }

                menuManager.BattleAnimation();
            }
        }

        public async void StartWaiting(){
            while (waitingTime >= 0){
                await new WaitForSecondsRealtime(1);
                waitingTime--;
                if (battle != null){
                    if (battle.shooterReady && battle.defenderReady)
                        return;
                }

            }

            inBattle = false;
            menuManager.SetWaitingText("No opponent found");
            shooterApi.CancelSubscription(battleCws, "battle");
            await new WaitForSecondsRealtime(1);
            await DeleteBattles();
            menuManager.loading.Disappear();
            menuManager.BringPreviousScreen();
            Reset();
        }
#endregion
```
Wow, that's a lot of code! Let's go into breaking it down one function at a time. Don't worry, they're pretty straightforward.

Note: Don't forget to read the documentation for the [graphql-client-unity](https://github.com/Gazuntype/graphQL-client-unity) as it'll help understand most of what is going on.

#### GetOnlineBattles

This function calls our `GetOnlineBattles` query, waits for data to be returned from our backend and deserializes that data.

It returns the deserialized data as `List<Battles>` which is a list of `Battles`.

#### CreateBattle

This functions calls our `CreateBattle` mutation.

The player that creates the battle is the `Shooter` and the player that joins is the `Defender`

Within the function, `createBattle.SetArgs(new{objects = new{shooter_id = 1}});` sets the `shooter_id` of the battle to be 1.

Later on, when we've implemented authentication, we would be setting the `shooter_id` to be the `id` of the user but for now we use the `id` of one of the mock users we created.

#### void UpdateShooterReady

This function calls our `UpdateOnlineBattle` mutation. It is used to set the `shooterReady` flag of the battle to `true`. 

This can be seen in this line of code

`updateBattle.SetArgs(new{where = new{id = new{_eq = battle.id}}, _set = new{shooterReady = true}});` where the `shooterReady` flag of battle row of `id = battle.id` is set to `true`

At the point we'd use this function, our `Battles battle` would already have been set.

We would use this function to confirm the availability of the player that creates the battle after a player has joined.

#### UpdateBattle

This also calls our `UpdateOnlineBattle` mutation. But this function is used to join a battle. This can be seen by the arguments in

`updateBattle.SetArgs(new {where = new{id = new{_eq = id}}, _set = new{defender_id = 2, defenderReady = true}});`

Which sets the `defender_id` of a battle to 2. 

Later on, when we've implemented authentication, we would be setting the `defender_id` to be the `id` of the user but for now we use the `id` of one of the mock users we created.

#### DeleteBattles and DeleteOldBattles

These are used to delete individual battles and all old battles from our database.

#### void BattleSubscribe

This calls our `SubscribeToBattle` subscription. We'd use this to watch out for changes to a created battle.

If the player is the creator of the battle, data is returned when another player joins because the `defender_id` changes from `null` to that players `id`.

If the player is the joiner of the battle, data is returned when the creator confirms availability because the `shooterReady` flag changes from `false` to `true`.

#### void ReceiveBattleData

This functions is called every time our subscription returns data from the backend. That is, it is called every time a change is made to the `battle` row we subscribed to.

The function also has the data received within `subscriptionDataReceived` and this is deserialized into our `battle` variable so that our `battle` variable always reflects the current state of the battles row in our database.

The contents of this function performs the flow chart in our [Matchmaking](https://hasura.io/learn/graphql/unity/matchmaking/)

#### void StartWaiting()

This is used to wait for a particular time. If a battle isn't confirmed by then, it closes the subscription and resets the menu.

### Event Listening

For our function `void ReceiveBattleData(OnSubscriptionDataReceived subscriptionDataReceived)` to be called every time we receive new subscription data, we have to listen to the right event.

This is done by adding this lines of code
```c#
private void OnEnable(){
    OnSubscriptionDataReceived.RegisterListener(ReceiveBattleData);
    Reset();
}

private void OnDisable(){
    OnSubscriptionDataReceived.UnregisterListener(ReceiveBattleData);
}
```

### References

Go to `GameData` at Assets/_Game/ScriptableObjects/GameData and drag your `Api Reference` in the slot for `shooterApi`

![Shooter Api Reference](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/matchmaking/shooter-api-reference.jpg)




