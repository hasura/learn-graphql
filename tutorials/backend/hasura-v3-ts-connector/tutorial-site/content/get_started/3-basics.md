---
title: "Basic Setup"
metaTitle: 'Basic Setup | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

Let's set up the scaffolding for our connector, and we'll see the first queries start to work. We'll also start to
develop a test suite, and see our connector running in Hasura.

For now, we'll just handle the most basic queries, but later, we'll start to fill in some of the gaps in our
implementation, and see more queries return results correctly. We'll also cover topics such as metrics, connector
configuration, error reporting, and tracing.

The data source we'll be targeting is a SQLite database running on my local machine, and we'll be using the Hasura
TypeScript connector SDK.

Here I have an empty TypeScript project, and I've added the SDK as a dependency along with the SQLite library and its
TypeScript bindings.

Let's start by following the [SDK guidelines](https://github.com/hasura/ndc-sdk-typescript) and using the `start`
function.

## Start

In your `src/index.ts` file, add the following:

```typescript
const connector: Connector<RawConfiguration, Configuration, State> = {};

start(connector);
```

We will also need these imports over the course of the tutorial:

```typescript
import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { BadRequest, CapabilitiesResponse, CollectionInfo, ComparisonValue, Connector, ExplainResponse, InternalServerError, MutationRequest, MutationResponse, NotSupported, ObjectField, ObjectType, OrderByElement, QueryRequest, QueryResponse, RowFieldValue, ScalarType, SchemaResponse, start } from "@hasura/ndc-sdk-typescript";
import { JSONSchemaObject } from "@json-schema-tools/meta-schema";
import { ComparisonTarget, Expression } from '@hasura/ndc-sdk-typescript/dist/generated/typescript/QueryRequest';
```