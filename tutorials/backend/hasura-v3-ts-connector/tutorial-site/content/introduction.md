---
title: "Intro - Let's Build a Connector!"
metaTitle: 'Course Introduction | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector for Hasura DDN'
---

In this course we will go through the process of creating a Hasura DDN data connector in TypeScript step-by-step.

A data connector in Hasura DDN is an agent which allows you to connect Hasura to any arbitrary data source.

## What will we be building? {#what-will-we-be-building}

We will build a basic connector to an [SQLite](https://www.sqlite.org/index.html) file-system database which you can 
run locally on your machine. 

This will familiarize you with the process of creating a connector to the Hasura DDN specification. You can then 
take the concepts you've learned and apply it to any data source you'd like to integrate with Hasura DDN.

## How do I follow along? {#how-do-I-follow-along}

You can watch the walkthrough videos in each section and also follow along with the code in this tutorial by first 
cloning the [repo](/get-started/2-clone/).

The YouTube playlist for all the videos is 
[here](https://www.youtube.com/playlist?list=PLTRTpHrUcSB_WmbGviXZUx0z-jVZXm4Yc). 

## What will I learn? {#what-will-i-learn}

You'll learn the fundamentals of creating a basic data connector with the 
[TypeScript Data Connector SDK](https://github.com/hasura/ndc-sdk-typescript). You can then take what you've learned 
into creating a data connector for any data source. 

## What do I need to take this tutorial? {#what-do-i-need-to-take-this-tutorial}

It is recommended that you first review the [Hasura NDC Specification](http://hasura.github.io/ndc-spec/), at least to 
gain a basic familiarity with the concepts, but this course is intended to be complementary to the spec.

The dependencies required to follow along here are minimal:
- you will need [Node](https://nodejs.org/en) with `npm` so that you can run the TypeScript compiler. 
- If you'd like to follow along using the same test-driven approach, then you will also need a working `ndc-test` 
  executable on your `PATH`.

`ndc-test` can be installed using the Rust toolchain from the [`ndc-spec`](https://github.com/hasura/ndc-spec) repository.

## How long will this tutorial take? {#how-long-will-this-tutorial-take}

About an hour.

## Additional Resources {#additional-resources}

- The [NDC Specification](https://hasura.github.io/ndc-spec/specification/) details the specification for data connectors which work with Hasura DDN.
- [Reference Implementation with Tutorial](https://github.com/hasura/ndc-spec/blob/main/ndc-reference/README.md)
- SDKs for data connectors built with Rust, and the one which we will be using in this course, TypeScript.
  - [NDC Rust SDK](https://github.com/hasura/ndc-hub)
  - [NDC Typescript SDK](https://github.com/hasura/ndc-sdk-typescript)
- Examples of existing native data connectors built by Hasura.
  - [Clickhouse](https://github.com/hasura/ndc-clickhouse) (Rust)
  - [QDrant](https://github.com/hasura/ndc-qdrant) (Typescript)
  - [Deno](https://github.com/hasura/ndc-typescript-deno) (Typescript)
- [Hasura DDN Docs](https://hasura.io/docs/3.0/index/)
- [Hasura DDN Hub](https://hasura.io/connectors#connectors-list) - This is where data connectors are published and can be installed 
  into your Hasura DDN instance.
- [Hasura DDN Open Source Engine codebase](https://github.com/hasura/graphql-engine/tree/master/v3)
