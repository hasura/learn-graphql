---
title: "Basic Setup"
metaTitle: 'Basic Setup | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

Let's set up the scaffolding for our connector, and we'll see the first queries start to work. We'll also start to
develop a test suite, and see our connector running in Hasura.

For now, we'll just handle the most basic queries, but later, we'll start to fill in some of the gaps in our
implementation, and see more queries return results correctly. 

[//]: # (TODO: This: "We'll also cover topics such as metrics, connector configuration, error reporting, and tracing.
" is not implemented - possibly Phil Freeman will do this in the future?)

The data source you'll be targeting is a SQLite database running on your local machine, and we'll be using the Hasura
[TypeScript connector SDK](https://github.com/hasura/ndc-sdk-typescript).

If you've cloned the repo in the previous step, you can follow along with the code in this tutorial.

Let's start by following the [SDK guidelines](https://github.com/hasura/ndc-sdk-typescript) and use the `start`
function which take a `connector` of type `Connector`.

## Start

In your `src/index.ts` file, add the following:

```typescript
const connector: Connector<Configuration, State> = {};

start(connector);
```

We will also need some imports over the course of the tutorial. Paste these at the top of your index.ts file:

```typescript
import opentelemetry from "@opentelemetry/api";
import sqlite3 from "sqlite3";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { Database, open } from "sqlite";
import {
  BadGateway,
  BadRequest,
  CapabilitiesResponse,
  CollectionInfo,
  ComparisonTarget,
  ComparisonValue,
  Connector,
  ConnectorError,
  ExplainResponse,
  Expression,
  ForeignKeyConstraint,
  InternalServerError,
  MutationRequest,
  MutationResponse,
  NotSupported,
  ObjectField,
  ObjectType,
  OrderByElement,
  Query,
  QueryRequest,
  QueryResponse,
  Relationship,
  RowFieldValue,
  ScalarType,
  SchemaResponse,
  start,
} from "@hasura/ndc-sdk-typescript";
import { withActiveSpan } from "@hasura/ndc-sdk-typescript/instrumentation";
import { Counter, Registry } from "prom-client";
```

You'll notice that your IDE will complain about the `connector` object not having the correct type, and 
`Configuration, State` all being undefined. Let's fix that in the next section...