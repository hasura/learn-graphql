---
title: "Intro - Let's Build a Connector!"
metaTitle: 'Course Introduction | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector for Hasura DDN'
---

In this course we will go through the process of creating a Hasura DDN data connector in TypeScript step-by-step.

A data connector in Hasura DDN is an agent which allows you to connect Hasura to any arbitrary data source.

## What will we be building? {#what-will-we-be-building}

We will build a connector to an [SQLite](https://www.sqlite.org/index.html) file system database which you can run 
locally on your machine. 

## How to follow along {#how-to-follow-along}

You can watch the walkthrough videos in each section and also follow along with the code in this tutorial by first 
cloning the [repo](/get-started/2-clone/).

The playlist for all the videos is [here](https://www.youtube.com/playlist?list=PLTRTpHrUcSB_WmbGviXZUx0z-jVZXm4Yc). 

## What will I learn? {#what-will-i-learn}

You'll learn the fundamentals of creating a data connector with the TypeScript Data Connector SDK. You can then take 
what you've learned into creating a data connector for any data source. 

## What do I need to take this tutorial? {#what-do-i-need-to-take-this-tutorial}

It is recommended that you first review the [Hasura NDC Specification](http://hasura.github.io/ndc-spec/), at least to 
gain a basic familiarity with the concepts, but these materials are intended to be complementary.

The dependencies required to follow along here are minimal - you will need Node and `npm` so that you can run the
TypeScript compiler. If you'd like to follow along using the same test-driven approach, then you will also need a
working `ndc-test` executable on your `PATH`. `ndc-test` can be installed using the Rust toolchain from the
[`ndc-spec`](https://github.com/hasura/ndc-spec) repository.

## How long will this tutorial take? {#how-long-will-this-tutorial-take}

About an hour.

## Additional Resources {#additional-resources}

- [NDC Specification](https://hasura.github.io/ndc-spec/specification/)
  - [Reference Implementation with Tutorial](https://github.com/hasura/ndc-spec/tree/main/ndc-reference/tests)
- SDKs
  - [NDC Rust SDK](https://github.com/hasura/ndc-hub)
  - [NDC Typescript SDK](https://github.com/hasura/ndc-sdk-typescript)
- Examples of Native Connectors
  - [Clickhouse](https://github.com/hasura/ndc-clickhouse) (Rust)
  - [QDrant](https://github.com/hasura/ndc-qdrant) (Typescript)
  - [Deno](https://github.com/hasura/ndc-typescript-deno) (Typescript)
