---
title: "More Api Calls"
metaTitle: "Making More Api Calls | GraphQL Unity Hasura Tutorial"
metaDescription: "Creating new Api call functions to easily update our backend"
---

We've set up the additional fields in our backend and Api reference.

Now we shall write a couple of functions to properly update our battle table with the information it needs.

### Update CreateBattle with seed

First off, we need to make a change to our `CreateBattle()` function our `GameData.cs` script. 

Since we've added a seed to our `battles` table, we need to set it to a random integer when we create a battle.

Let's open the `GameData.cs` file in Assets/_Game/Scripts/Data/GameData.cs

In the function `public async Task<Battles> CreateBattle()`

Replace

```c#
createBattle.SetArgs(new{objects = new{shooter_id = 1}});
```

with 

```c#
int seeds = Random.Range(0, 100000);
createBattle.SetArgs(new{objects = new{shooter_id = 1, seed = seeds}});
```

The whole functions looks like
```c#
public async Task<Battles> CreateBattle(){
	GraphApi.Query createBattle = shooterApi.GetQueryByName("CreateBattle", GraphApi.Query.Type.Mutation);
	int seeds = Random.Range(0, 100000);
	createBattle.SetArgs(new{objects = new{shooter_id = 1, seed = seeds}});
	UnityWebRequest request = await shooterApi.Post(createBattle);
	string result = request.downloadHandler.text;
	return JsonConvert.DeserializeObject<Battles>(RemoveData(result,
	createBattle.queryString));
}
```

As you can see, a random integer is selected between 0 and 1000000 and the `seed` column of our `battles` row in our backend is set to that value.

This `seed` column is used by both the `Shooter` and `Defender` to randomly spawn targets at the start of the game. Since they'll both have the same seed, the same targets will be spawned for both of them.

### Add new Api Call functions

Now we need a couple of functions to update our `battles` row when things happen in the game like the `Shooter` missing or hitting a target. 

Remember the flow we described in [Realtime Gameplay Overview](https://hasura.io/learn/graphql/unity/realtime-gameplay/)

Copy and past the code below into your `GameData.cs` script and I'll explain each function briefly

```c#
    public async void UpdateHitTargets(bool complete){
        GraphApi.Query updateBattle = shooterApi.GetQueryByName("UpdateOnlineBattle", GraphApi.Query.Type.Mutation);
        updateBattle.SetArgs(new{
            where = new{id = new{_eq = battle.id}},
            _set = new{timeTaken = time, attackComplete = complete, hitTargets = ListToString(hitTargets)}
        });
        await shooterApi.Post(updateBattle);
    }

    public async void UpdateDefendedTargets(){
        GraphApi.Query updateBattle = shooterApi.GetQueryByName("UpdateOnlineBattle", GraphApi.Query.Type.Mutation);
        updateBattle.SetArgs(new
            {where = new{id = new{_eq = battle.id}}, _set = new{defendedTargets = ListToString(defendedTargets)}});
        await shooterApi.Post(updateBattle);
    }

    public async Task<string> UpdateDefendedTargets(bool complete){
        gameManager.hud.SetActive(false);
        GraphApi.Query updateBattle = shooterApi.GetQueryByName("UpdateOnlineBattle", GraphApi.Query.Type.Mutation);
        updateBattle.SetArgs(new{
            where = new{id = new{_eq = battle.id}},
            _set = new{gameComplete = complete, defendedTargets = ListToString(defendedTargets)}
        });
        UnityWebRequest request = await shooterApi.Post(updateBattle);
        return request.downloadHandler.text;
    }

    public async void UpdateMiss(){
        GraphApi.Query updateBattle = shooterApi.GetQueryByName("UpdateOnlineBattle", GraphApi.Query.Type.Mutation);
        if (user.role == User.Role.SHOOTER){
            updateBattle.SetArgs(new{
                where = new{id = new{_eq = battle.id}}, _set = new{shooter_lastseen = "now()"},
                _inc = new{shooterMisses = 1}
            });
        }
        else{
            updateBattle.SetArgs(new{
                where = new{id = new{_eq = battle.id}}, _set = new{defender_lastseen = "now()"},
                _inc = new{defenderMisses = 1}
            });
        }

        await shooterApi.Post(updateBattle);
    }

    private async void ProcessBattle(){
        ProcessShots();
        if (battle.gameComplete){
            if (gameComplete)
                return;
            gameComplete = true;
            shouldCount = false;
            Debug.Log("Game complete");
            shooterApi.CancelSubscription(battleCws, "battle");
            if ((battle.hitTargets.Count == battle.defendedTargets.Count && user.role == User.Role.DEFENDER) ||
                (battle.hitTargets.Count > battle.defendedTargets.Count && user.role == User.Role.SHOOTER)){
                await DeleteBattles();
            }

            OnGameComplete complete = new OnGameComplete();
            complete.FireEvent();

            return;
        }

        if (battle.attackComplete){
            if (attackComplete)
                return;
            attackComplete = true;
            time = battle.timeTaken + 5;
            Debug.Log("Starting Fight");
            OnDefenderTurn defenderTurn = new OnDefenderTurn();
            defenderTurn.FireEvent();
        }
    }

    void ProcessShots(){
        Color color;
        if (user.role == User.Role.SHOOTER){
            color = Color.green;
            if (battle.defenderMisses > misses){
                for (int i = 0; i < battle.defenderMisses - misses; i++){
                    sfxPlayer.PlayOneShot(sounds.zap);
                    Game.Bullet bullet = Instantiate(bulletPrefab, opponentPosition, Quaternion.identity)
                        .GetComponent<Game.Bullet>();
                    bullet.Move(color);
                    PlayDelayedSound(sounds.disappointments, 0.2f);

                }

                misses = battle.defenderMisses;
            }

            if (battle.defendedTargets == null)
                return;
            if (battle.defendedTargets.Count > defendedTargets.Count){
                int lastIndex = battle.defendedTargets.Count - 1;
                for (int i = 0; i < battle.defendedTargets.Count - defendedTargets.Count; i++){
                    sfxPlayer.PlayOneShot(sounds.zap);
                    PlayDelayedSound(sounds.activation, 0.2f);
                    PlayDelayedSound(sounds.claps, 0.2f);
                    PlayDelayedSound(sounds.activation, 0.1f);
                    int index = battle.defendedTargets[lastIndex - i];
                    Debug.Log("Shoot the targets");
                    Game.Bullet bullet = Instantiate(bulletPrefab, opponentPosition, Quaternion.identity)
                        .GetComponent<Game.Bullet>();
                    Target target = gameManager.targetSpawner.targets.Find((target1 => target1.index == index));

                    bullet.Move(target.transform.position, color);
                    target.HighlightTarget(color);
                }

                defendedTargets = new List<int>(battle.defendedTargets);
            }
        }
        else{
            color = Color.red;
            if (battle.shooterMisses > misses){
                for (int i = 0; i < battle.shooterMisses - misses; i++){
                    sfxPlayer.PlayOneShot(sounds.zap);
                    PlayDelayedSound(sounds.disappointments, 0.2f);
                    Game.Bullet bullet = Instantiate(bulletPrefab, opponentPosition, Quaternion.identity)
                        .GetComponent<Game.Bullet>();
                    bullet.Move(color);
                }

                misses = battle.shooterMisses;
            }

            if (battle.hitTargets == null)
                return;
            if (battle.hitTargets.Count > hitTargets.Count){
                int lastIndex = battle.hitTargets.Count - 1;
                for (int i = 0; i < battle.hitTargets.Count - hitTargets.Count; i++){
                    sfxPlayer.PlayOneShot(sounds.zap);
                    PlayDelayedSound(sounds.activation, 0.2f);
                    PlayDelayedSound(sounds.claps, 0.2f);
                    int index = battle.hitTargets[lastIndex - i];
                    Debug.Log("Shoot the targets");
                    Game.Bullet bullet = Instantiate(bulletPrefab, opponentPosition, Quaternion.identity)
                        .GetComponent<Game.Bullet>();
                    Target target = gameManager.targetSpawner.targets.Find((target1 => target1.index == index));
                    bullet.Move(target.transform.position, color);
                    target.HighlightTarget(color);
                }

                hitTargets = new List<int>(battle.hitTargets);
            }
        }

    }
``` 

I know that seems like a lot of code but a lot of it is just to do game stuff.

Let's break them down.

#### void UpdateHitTargets

This function updates the `hitTargets` column of our battle in the backend. It takes in a `bool complete` to signify if the `Shooter`'s turn is complete.

If `bool complete` is true, it also sets the `attackComplete` column of our battle to true. Else, it sets it as fault.

We shall call this function every time the `Shooter` hits a target.

#### UpdateDefendedTargets

This function updates the `defendedTargets` column of our battle in the backend. It takes in a `bool complete` to signify if the `Defender`'s turn is complete hereby signifying the end of the game.

If `bool complete` is true, it also sets the `gameComplete` column of our battle to true.

We shall call this function every time the `Defender` deactivates a target.

#### void UpdateMiss

This function is used to increase the value in column `shooterMisses` or `defenderMisses` when either the `Shooter` or `Defender` misses a target.

#### void ProcessBattle

This function does a couple of things depending on the data we get from our subscription. It shall be called every time we get data from our subscription.

If you recall, every time a change is made to our battle, data is sent to our subscription containing the new values of the battle.

This data is automatically deserialized into our `battle` object in the function `ReceiveBattleData()`.

The `ProcessBattle()` function checks the state of our `battle` object and does a couple of things.

- if `battle.attackComplete` is `true`, it means the `Shooter`'s turn is over and it fires the `OnDefenderTurn()` event which triggers the `Defender`'s turn. It also sets the `Defender`'s time to `battle.timeTaken` + 5.
- if `battle.gameComplete` is `true`, it means the `Defender`'s turn is over and the game is over. It deletes the battle, unsubscribes from the subscription and fires the `OnGameComplete()` event which triggers the game over screen.
- it calls the `ProcessShots()` function which shall be explained below.

#### void ProcessShots

This is the function that simulates the opponent's turn. Depending on the value of `shooterMisses`, `defenderMisses`, `hitTargets` and `defendedTargets`, it simulates shots fired by the opponent when it's their turn.

### Add ProcessBattle to ReceiveBattleData

Go to the `ReceiveBattleData()` function and add `ProcessBattle()` at the start. 

It looks like this afterwards

```c#
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

        ProcessBattle();
    }
```

And there we go! We've created functions that'll help us update our battle as the player plays.

We've also created a function to properly update the game depending on what data we get from our subscription.

We just need to call these functions at the right times and that's it!
