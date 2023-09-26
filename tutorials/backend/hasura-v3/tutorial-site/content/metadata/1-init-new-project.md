---
title: 'Create a new project'
metaTitle: 'Create a new project | Hasura v3 Tutorial'
metaDescription: "Let's create a new project by defining our metadata."
---

All projects are hosted on the Hasura Data Delivery Network (DDN). You can create your project using the Hasura CLI and
then manage it using the Hasura Console. While projects can also be created via the Console, we recommend using the CLI
to create your project so that you can easily version control your metadata.

## Create a new local project {#create-a-new-local-project}

Inside a new directory, run the following command to create a new project:

```bash
hasura3 local init --dir .
```

This will init a new project in the current directory by creating an empty `metadata.hsl` file.

## Authenticate your CLI

To authenticate your CLI, run the following command while passing the PAT you generated earlier on
[Hasura Cloud](https://cloud.arusah.com/account-settings/access-tokens):

```bash
hasura3 cloud login --pat <YOUR_PAT>
```

## Create a new project on Hasura DDN {#create-a-new-project-on-hasura-ddn}

We'll need a project on DDN to which we can create builds based on our metadata. To create a new project on DDN, run the
following command:

```bash
hasura3 cloud project create
```

The CLI will return information about your project:

```text
 Creating project... ok
 Name         <PROJECT_NAME>
 ID           <PROJECT_ID>
 Console URL  https://console.hasura.io/project/<PROJECT_ID>/graphql
```

We can now connect a data source to our project.
