---
title: 'Create a new project'
metaTitle: 'Create a new project | Hasura v3 Tutorial'
metaDescription: "Let's create a new project by defining our metadata."
---

All projects are hosted on the Hasura Data Delivery Network (DDN). You can create your project using the Hasura CLI and
then manage it using the Hasura Console. While projects can also be created via the Console, we recommend using the CLI
to create your project so that you can easily version control your metadata.

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

## Create a new local project {#create-a-new-local-project}

While we've created our project on Hasura DDN, we still need to create a local project that we can use to manage our
metadata. Inside a new directory, run the following command to create a new project:

```bash
hasura3 local init --dir .
```

This will init a new project in the current directory by creating three files:

1. `hasura.yaml`: This is the entrypoint to a local Hasura project. Replace the `project` field with the **ID** of the
   project that you just created.

```yaml
version: 1
project: # add your PROJECT_ID here

# A build profile specifies your project's environment
# and the association of namespaces to HML files
# You can create different build profiles for different environments,
# like production and staging, which may reference environment-specific auth configs.
# We have created one for you to get you started
buildProfiles:
  - build-profile.yaml

# This refers to the default build profile
# that is used when you create a build and
# don't specify which build profile to use.
defaultBuildProfile: build-profile.yaml
```

2. `build-profile.yaml`: This file specifies how the metadata in your local Hasura project must be built. It contains
   the `environment` of the Hasura DDN project that you wish to create builds on and it specifies the namespaces of the
   `.hml` files in this project.

   You can have different build profiles for different environments of your project. You can create different
   environments like `stage`, `preproduction` and `production`, and have a different build profile for each of them for
   creating builds on different environments in your CI.

```yaml
version: 1
spec:
  environment: default

  # Namespaces can be used to group certain objects of your metadata
  # in a way that makes sense for you and your team.
  # You can have multiple HML files belong to a namespace
  # and you can have multiple namespaces in a project.
  # We have created a `default` namespace for you, and added an HML file to it to get you started
  # Please note that `default` is a special namespace that is created for every project
  # and it CANNOT be deleted.
  namespaces:
    - name: default
      resources:
        - ./metadata.hml
```

3. `metadata.hml`: This is a Hasura metadata file that follows the new metadata format of the
   [Open Data Domain Specification (OpenDD Spec)](/data-domain-modeling/overview.mdx), and is an `.hml` file. This file
   can be checked into version control along with other files (if any) in your project and can be shared.

Now, we can add a data source to our `metadata.hml` file.
