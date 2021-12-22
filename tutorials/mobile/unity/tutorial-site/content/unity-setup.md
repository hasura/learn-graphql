---
title: "Setup Unity Boilerplate"
metaTitle: "Shooter Arena boilerplate setup | GraphQL Unity Hasura Tutorial"
metaDescription: "Set up the boilerplate version of Shooter which includes a working menu system and single player shooting mechanics"
---

For this course, the UI and single player gameplay (shooting targets in the arena) have already been set up.
Our task would be converting it to an exciting online multiplayer game, just like Shooter Arena.

### Set up the boilerplate unitypackage

1. Create a new 3D Unity project.

2. Change the target platform to Android/iOS

3. Download and import [shooterArena-boiilerplate.unitypackage](https://graphql-engine-cdn.hasura.io/learn-hasura/boilerplates/unity/boilerplate.zip)

4. Change allowed orientations to only Landscape. This setting is found in Player Settings -> Resolution and Presentation

5. Add menuScene and gameScene to build settings respectively

6. Build the game and try out the menu system and game mechanics.

When you've completed these steps, you should have a playable shooter game on your device with no multiplayer features. 
We would be adding these in a bit. First let's set up the Hasura backend.
