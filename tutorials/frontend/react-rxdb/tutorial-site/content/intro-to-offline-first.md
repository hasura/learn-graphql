---
title: "Intro to Offline first"
metaTitle: "Intro to Offline first | React + RxDB + Hasura tutorial"
metaDescription: "What is Offline first? Offline first is an application development paradigm where developers ensure that the functionality of an app is unaffected by intermittent lack of a network connection"
---

## What is Offline first?
Offline first is an application development paradigm where developers ensure that the functionality of an app is unaffected by intermittent lack of a network connection. In addition offline first usually implies the ability to sync data between multiple devices.

## Why Offline first?

Mobile networks are frequently flaky. In addition people use mobile & web apps on the move. If your app did not have the ability to work well offline, every time your user took a subway or a plane or an Uber your app will potentially lose connectivity leading to a frustrating user experience.

## What is required for making an app offline first?

To make an app truly offline first, we primarily need to do two things:
Any code and assets used should be available offline
Any data changes should be made locally first and then synced to the cloud.

## Architecture

Checkout this diagram below to understand how a typical offline first app would work.

![Architecture](https://hasura.io/blog/content/images/2020/02/Screenshot-from-2020-02-08-14-24-02.png)

As shown in the above diagram all changes and reads on the front end are made from a local database. The local database is then synced with the backend service. In this tutorial we use RxDB as the local database.

## RxDB Introduction
RxDB is a reactive NoSQL database for Javascript applications. Reactive programming is a paradigm where you can not only query for the current but also subscribe to any future changes to the query results. This eliminates the need to periodically poll for state changes to update the UI. Instead we simply provide RxDB with a callback function to be called whenever there is a change and update the UI accordingly.

You can learn more about RxDB from the [official docs](https://rxdb.info/)

