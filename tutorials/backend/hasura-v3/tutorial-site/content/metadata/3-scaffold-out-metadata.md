---
title: 'Scaffold metadata'
metaTitle: 'Scaffold metadata | Hasura v3 Tutorial'
metaDescription: "Let's add some metadata to our project."
---

With our data source connected, the VS Code extension can easily introspect it and generate metadata for us. This takes
the boilerplate tasks of creating types and relationships off your hands and lets you focus on the work that matters.
With just a couple of commands, we'll have our entire data layer defined and an API ready to go 🚀

## Use the VS Code extension {#use-the-vs-code-extension}

In VS Code, press `Command + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows) to open the Command Palette. Type
`hasura refresh data source` and choose the option that appears.

![Refreshing data source in VS Code](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/0.0.1_vs-code-refresh-data-source.png)

You should now see the name you provided in the previous step. Clicking this will introspect your data source and add
information to your metadata about the tables and views in your database.

From here, you can immediately track tables, views, relationships, and quickly scaffold out your metadata by using the
Hasura VS Code extension. Bring up the command palette again, type `hasura track all` and choose the option from the
dropdown. Then, select your data source's name and, viola — your metadata file will be populated with **models** and
everything you need to get started! 🎉

![Tracking all models, relationships, etc. in VS Code](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/0.0.1_vs-code-track-everything.png)

Models are a new way to represent your data in Hasura.

Models in the [OpenDD Spec](https://hasura.io/docs/3.0/data-domain-modeling/overview/) refer to a collection of objects
(such as rows in a relational database, or documents in a NoSQL database) of a given OpenDD Spec
[type](https://hasura.io/docs/3.0/data-domain-modeling/types/). Models are backed by a data source and can support CRUD
operations. You can learn more about models [here](https://hasura.io/docs/3.0/data-domain-modeling/models/).

## Add an AuthConfig

To keep your API secure, Hasura requires an `AuthConfig`. This can utilize webhooks or JWTs to authenticate users and
ensure only the appropriate users can access your data. To keep you from having to set up your own authentication
platform, Hasura Cloud comes with a built-in auth system that you can use to get started quickly. Add this `AuthConfig`
to the bottom of your metadata:

```yaml
---
kind: AuthConfig
allowRoleEmulationFor: admin
webhook:
  mode: POST
  webhookUrl: https://auth.pro.hasura.io/webhook/ddn?role=admin
```
