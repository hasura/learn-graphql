---
title: "Implement Api Call Functions"
metaTitle: "Implement Api Call Functions | GraphQL Unity Hasura Tutorial"
metaDescription: "Calling the Api functions at the right places to complete gameplay"
---

Alright! Great job coming this far. We're about complete the game play of our realtime multiplayer Shooter Arena.

### Update Shooting

First off, we'd need to ensure that our Api calls `UpdateHitTargets()`, `UpdateDefendedTargets()` and `UpdateMisses()` are called at the right time.

Head over to `PlayerShooting.cs` in Assets/_Game/Scripts/Player/PlayerShooting.cs

As the name implies, this scripts controls the shooting mechanics of the player.

Go the the  `Shoot()` function and make the following changes.

Replace 

```c#
if (user.role == Data.User.Role.SHOOTER){
	gameData.shouldCount = !complete;
}
```

with 

```c#
if (user.role == Data.User.Role.SHOOTER){
	gameData.shouldCount = !complete;
	gameData.UpdateHitTargets(complete);
}
else{
	gameData.UpdateDefendedTargets();
}
```

This calls `UpdateHitTargets()` if the player is a `Shooter` and `UpdateDefendedTargets()` if the player is a `Defender`.

Next, replace

```c#
if (gameData.bullets <= 0){
    gameData.PlayDelayedSound(gameData.sounds.disappointments, 0.2f);
    gameData.shouldCount = false;
    gameData.gameManager.hud.SetActive(false);
}
```

with 

```c#
if (gameData.bullets <= 0){
	gameData.PlayDelayedSound(gameData.sounds.disappointments, 0.2f);
	if (user.role == Data.User.Role.SHOOTER)
		gameData.UpdateHitTargets(true);
	else
		gameData.UpdateDefendedTargets(true);
	gameData.shouldCount = false;
	gameData.gameManager.hud.SetActive(false);
}
gameData.UpdateMiss();
```

The full `Shoot()` function becomes

```c#
    public virtual void Shoot(){
        if (player.inactive)
            return;
        if (!canShoot)
            return;
        Ray ray = new Ray(transform.position, transform.forward);
        Debug.DrawRay(transform.position, transform.forward * 100, Color.red, 2);
        Vector3 destination = transform.forward * 150;
        gameData.bullets--;
        player.Shake();
        player.Shoot();
        gameData.sfxPlayer.PlayOneShot(gameData.sounds.zap);
        if (Physics.Raycast(ray, out RaycastHit hit)){
            destination = hit.point;
            if (hit.transform.CompareTag("Target")){
                Target target = hit.transform.GetComponent<Target>();
                target.ActivateTarget();
                bool complete = gameData.bullets <= 0;
                gameData.gameManager.hud.SetActive(!complete);
                gameData.PlayDelayedSound(gameData.sounds.activation, 0.2f);
                gameData.PlayDelayedSound(gameData.sounds.claps, 0.2f);
                if (user.role == Data.User.Role.SHOOTER){
                    gameData.shouldCount = !complete;
                    gameData.UpdateHitTargets(complete);
                }
                else{
                    gameData.UpdateDefendedTargets();
                }
            }
            else{
                if (gameData.bullets <= 0){
                    gameData.PlayDelayedSound(gameData.sounds.disappointments, 0.2f);
                    if (user.role == Data.User.Role.SHOOTER)
                        gameData.UpdateHitTargets(true);
                    else
                        gameData.UpdateDefendedTargets(true);
                    gameData.shouldCount = false;
                    gameData.gameManager.hud.SetActive(false);
                }
            }
        }

        Game.Bullet bullet = Instantiate(bulletPrefab, player.activeGun.position, Quaternion.identity)
            .GetComponent<Game.Bullet>();
        bullet.Move(destination);
    }
```

### Update the Game Manager

Next up, we have to update `GameManager.cs` in Assets/_Game/Scripts/Managers/GameManager.cs

In the function `ShowGameOver()`, replace

```c#
gameOverText.text = "GameOver"
```

with

```c#
gameOverText.text = gameData.battle.hitTargets.Count == gameData.battle.defendedTargets.Count
                ? "<color=green>Defender</color> Wins"
                : "<color=red>Shooter</color> Wins";
```

This changes the game over text from simply "GameOver" to either "Shooter Wins" or "Defender Wins" depending on who actually wins the game.

It determines who wins the game by comparing our arrays, `battle.hitTargets` and `battle.defendedTargets`.

Next, in `BeginDefenderTurn()`, add

```c#
foreach (Target target in targetSpawner.targets){
	if (gameData.battle.hitTargets.Contains(target.index)){
		target.HighlightTarget(Color.red);
		target.targeted = true;
	}
}
```

so the whole function becomes 

```c#
    private void BeginDefenderTurn(OnDefenderTurn defenderTurn){
        if (user.role == Data.User.Role.DEFENDER){
            opponentTurn.SetActive(false);
            countdown.SetActive(true);
            foreach (Target target in targetSpawner.targets){
                if (gameData.battle.hitTargets.Contains(target.index)){
                    target.HighlightTarget(Color.red);
                    target.targeted = true;
                }
            }
        }
        else{
            opponentTurn.SetActive(true);
            hud.SetActive(false);
        }
    }
```

And that's it for our Game Manager.

### Update Target's Left

We have a little script called `TargetLeft.cs` that controls the Ui that displays our targets remain to be shot by the `Defender` or to show how many targets the `Shooter` has hit,

We need to make a change to this to properly reflect this data.

Open `TargetLeft.cs` in Assets/_Game/Scripts/Ui/TargetLeft.cs

Replace

```c#
private void Update(){
	int hit = gameData.hitTargets.Count;
	int defend = gameData.defendedTargets.Count;
	targetLeft.text = (hit - defend).ToString();
}
```

with

```c#
private void Update(){
	int hit = gameData.battle.hitTargets?.Count ?? gameData.hitTargets.Count;
	hit = gameData.user.role == Game.Data.User.Role.SHOOTER ? gameData.hitTargets.Count : hit;
	int defend = gameData.battle.defendedTargets?.Count ?? gameData.defendedTargets.Count;
	defend = gameData.user.role == Game.Data.User.Role.DEFENDER ? gameData.defendedTargets.Count : defend;
	targetLeft.text = (hit - defend).ToString();
}
```

### Timer

Lastly, we have to update our `Timer.cs` to end the game when the `Defender`'s time is up.

Open `Timer.cs` in Assets/_Game/Scripts/Ui/Timer.cs

In the `Update()` function, add

```c#
gameData.UpdateDefendedTargets(true);
```

So it becomes

```c#
    private void Update(){
        if (!gameData.shouldCount)
            return;
        if (user.role == Data.User.Role.SHOOTER){
            gameData.time += Time.deltaTime;
        }
        else{
            gameData.time -= Time.deltaTime;
            if (gameData.time <= 0){
                if (!completeCalled){
                    Debug.Log("Game over");
                    gameData.shouldCount = false;
                    gameData.gameManager.hud.SetActive(false);
                    completeCalled = true;
                    gameData.UpdateDefendedTargets(true);
                }

            }
        }

        timer.text = gameData.time.ToString("N2");
    }
```

And that's it!

Build the game to a device and try it out! You'd see that we've perfectly created the gameplay of Shooter Arena.