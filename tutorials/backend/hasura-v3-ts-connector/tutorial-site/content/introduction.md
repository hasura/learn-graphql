---
title: "Intro - Let's Build a Connector!"
metaTitle: 'Course Introduction | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector for Hasura DDN'
---

This repository contains a series of video tutorials which walk through the process of creating a data connector in small steps. We will build a connector to sqlite which you can run locally on your machine, either by cloning this repo, or by following along with each video.

It is recommended that you first review the [Hasura NDC Specification](http://hasura.github.io/ndc-spec/) and accompanying reference implementation, at least to gain a basic familiarity with the concepts, but these materials are intended to be complementary.

The dependencies required to follow along here are minimal - you will need Node and `npm` so that you can run the TypeScript compiler. If you'd like to follow along using the same test-driven approach, then you will also need a working `ndc-test` executable on your `PATH`. `ndc-test` can be installed using the Rust toolchain from the [`ndc-spec`](https://github.com/hasura/ndc-spec) repository.

## Video Tutorials

_Note_: in case your browser does not support the GitHub embedded videos in the following links, video files are provided in the same directories, for viewing locally.

1. [Setup \[9:31\]](videos/1/README.markdown)
1. [Predicates \[6:51\]](videos/2/README.markdown)
1. [Sorting \[4:34\]](videos/3/README.markdown)
1. [Aggregates \[4:59\]](videos/4/README.markdown)

## Other Resources

- [NDC Specification](https://hasura.github.io/ndc-spec/specification/)
  - [Reference Implementation with Tutorial](https://github.com/hasura/ndc-spec/tree/main/ndc-reference/tests)
- SDKs
  - [NDC Rust SDK](https://github.com/hasura/ndc-hub)
  - [NDC Typescript SDK](https://github.com/hasura/ndc-sdk-typescript)
- Examples of Native Connectors
  - [Clickhouse](https://github.com/hasura/ndc-clickhouse) (Rust)
  - [QDrant](https://github.com/hasura/ndc-qdrant) (Typescript)
  - [Deno](https://github.com/hasura/ndc-typescript-deno) (Typescript)

## Getting Started

```sh
npm i
npm run build
```

Run the connector:

```sh
node dist/index.js serve --configuration configuration.json
```

To start from scratch and create the initial project:

```sh
npm init
npm i typescript
npx tsc --init
npm i @hasura/ndc-sdk-typescript sqlite sqlite3
```



# OLD

Anyone who's built an API knows that most of the time spent creating it is centered around writing access control rules
to meet security and compliance requirements. Hasura v3 is a powerful tool that allows you to build a production-ready,
compliant GraphQL API in minutes, not weeks.

Hasura was created to help developers build APIs faster. It's a powerful tool that allows you to build a
production-ready GraphQL API. Hasura v3 is the latest version of Hasura and is a complete rewrite of the Hasura
architecture. It's faster, more powerful, and more flexible than ever before.

## What will I learn? {#what-will-i-learn}

This tutorial is designed to give you a complete overview of Hasura v3 and its capabilities. By the end of this
tutorial, you will have a working Hasura v3 project deployed to [Hasura DDN](https://console.hasura.io), our global and
near-instant data delivery network.

You'll learn how to:

1. Create a new Hasura project.
2. Author a single, declarative metadata file that defines your entire API.
3. Connect a data source using Hasura's data connectors.
4. Configure fine-grained access control rules for your API.
5. Deploy a development build of your API to Hasura DDN.
6. Test your API using the Hasura Console.
7. Deploy a production build of your API to Hasura DDN.

## What will we be building? {#what-will-we-be-building}

We'll build an e-commerce API that allows users to manage their orders and notifications. The API will be backed by a
PostgreSQL database and will be deployed to Hasura DDN.

## What do I need to take this tutorial? {#what-do-i-need-to-take-this-tutorial}

We'll go into more detail in the next section, but you'll need:

- The new [Hasura CLI](https://hasura.io/docs/3.0/cli/overview/)
- The [Hasura VS Code extension](https://marketplace.visualstudio.com/items?itemName=HasuraHQ.hasura) (optional, but
  recommended)
- A PostgreSQL database (either hosted or local)

## How long will this tutorial take? {#how-long-will-this-tutorial-take}

Less than 30 mins.

## Additional Resources {#additional-resources}

We'll link to the docs throughout this tutorial, but if you feel like opening them up in a new tab,
[here](https://hasura.io/docs/3.0/) they are.
