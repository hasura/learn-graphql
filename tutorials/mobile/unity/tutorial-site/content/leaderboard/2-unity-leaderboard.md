---
title: "Unity Leaderboard"
metaTitle: "Leaderboard with Unity | GraphQL Unity Hasura Tutorial"
metaDescription: "Setting up the leaderboard in Unity"
---

We are about to set up the leaderboard within Unity.

### BattleComplete and GetUsers queries

Since we've created the Action `BattleComplete`, our schema has been update and to get this, we'll need to introspect our Api again.

But because we've set up authentication with our server, we need to make a change to be able to introspect the server.

Go to `HttpHandler.cs` in Assets/graphql-client/Scripts/Core/HttpHandler.cs

Update the first function, `PostAsync()` there,

Replace

```c#
request.SetRequestHeader("Content-Type", "application/json");
```

With

```c#
request.SetRequestHeader("Content-Type", "application/json");
request.SetRequestHeader("x-hasura-admin-secret", "ADMIN_SECRET");
```

This sets the header of our request to our Admin secret. Change `ADMIN_SECRET` in the code above to your actual secret!

Now we can go to our `ShooterApi` and introspect.

After Instrospecting, create a new Mutation called `BattleComplete`

![BattleComplete Mutation](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/leaderboard/battle-complete.jpg)

Also create a new Query called `GetUsers`

![GetUsers Query](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/leaderboard/get-users.jpg)

Now we can remove the addition we made in `HttpHandler.cs` or comment it out if you want. You can also leave it there if you intend to introspect some more.

### Api Calls

Next as usual, we create functions to make our Api calls. 

Go to `GameData.cs` in Assets/_Game/Scripts/Data/GameData.cs

Copy and paste the function below

```c#
    private async Task BattleComplete(){
        GraphApi.Query battleComplete = shooterApi.GetQueryByName("BattleComplete", GraphApi.Query.Type.Mutation);
        battleComplete.SetArgs(new{battle?.id});
        await shooterApi.Post(battleComplete);
    }
```

Next, go to the `ProcessBattle()` and replace

```c#
    if ((battle.hitTargets.Count == battle.defendedTargets.Count && user.role == User.Role.DEFENDER) ||
    (battle.hitTargets.Count > battle.defendedTargets.Count && user.role == User.Role.SHOOTER)){
        await DeleteBattles();
    }
```

with

```c#
    if ((battle.hitTargets.Count == battle.defendedTargets.Count && user.role == User.Role.DEFENDER) ||
    (battle.hitTargets.Count > battle.defendedTargets.Count && user.role == User.Role.SHOOTER)){
        await BattleComplete();
    }
```

This bit of code simplies calls the `BattleComplete` mutation instead of simply deleting the battle. This would enable our Glitch projects update the users accordingly.

Next, we create another function

```c#
    public async Task<List<User.Users>> GetUsers(){
        try{
            GraphApi.Query usernames = shooterApi.GetQueryByName("GetUsers", GraphApi.Query.Type.Query);
            UnityWebRequest request = await shooterApi.Post(usernames);
            string result = request.downloadHandler.text;
            return JsonConvert.DeserializeObject<List<User.Users>>(RemoveData(result,
                usernames.queryString));
        }
        catch{
            throw new Exception();
        }
    }
```

### Leaderboard set up

Now that we have the functions to get users, their wins and losses, we need to update our leaderboard script.

Go to `Leaderboard.cs` in Assets/_Game/Script/Managers/Leaderboard.cs

Confirm you have all the needed namespaces at the start of the file.

```c#
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game.Data;
using Game.Manager;
using TMPro;
using UnityEngine;
```

next we create a function that gets all the users into a variable and sorts them.

```c#
    async Task GetUsers(){
        try{
            users = await gameData.GetUsers();
            users = users.OrderByDescending((users1 => users1.wins - users1.losses)).ToList();
            rank = users.FindIndex((users1 => users1.username == gameData.user.Username));
            user = users[rank];
        }
        catch{
            menuManager.SwitchScreen(menuManager.titleScreen);
        }
        
    }
```

Lastly, we add this function to the `OnEnable()` function. Add
`await GetUsers();`

to become,

```c#
    private async void OnEnable(){
        menuManager.ActivateLoading("Gathering data");
        await GetUsers();
        DisplayStats();
        PopulateLeaderboard();
        menuManager.loading.Disappear();
    }
```

And we are done! Leaderboard has been set up! Enjoy your version of Shooter Arena!

In case you want the full source code of the final app, [download it from here](https://graphql-engine-cdn.hasura.io/learn-hasura/boilerplates/unity/final.zip)