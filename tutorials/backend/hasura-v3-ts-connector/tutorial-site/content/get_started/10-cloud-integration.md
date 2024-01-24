---
title: "Cloud Integration"
metaTitle: 'Cloud Integration | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

Going over the process of creating and deploying a project to Hasura DDN is beyond the scope of this course and
we don't want to go too off-track, but is covered in the Hasura Docs which you can
[check out here](https://hasura.io/docs/3.0/local-dev/).

We have created and included a Hasura DDN metadata configuration in the 
[repo for this course](https://github.com/hasura/ndc-typescript-learn-course/blob/main/hasura/) which you can use to
test your API, query it and see album and artist results - all powered by your connector.

## Install Hasura CLI and start a tunnel

To run this connector you will need to [install the Hasura3 CLI](https://hasura.io/docs/3.0/cli/installation/) and 
create a tunnel so that Hasura DDN can reach your local machine. You can do this by first starting the tunnel daemon, 
with `hasura3 daemon start` and then creating a tunnel with `hasura3 tunnel create localhost:8100`.

The command will return a hostname and port which you should enter into the 
`/hasura/subgraphs/default/dataconnectors/db.hml` file in place of where you see the value for the connector URL. Eg:

```yaml
definition:
  name: my_sqlite_connector
  url:
    singleUrl:
      value: https://tunnel-url-here
```

## Create a project on Hasura DDN

In the console run `hasura3 project create` to create a project on Hasura DDN and paste that project name in 
the `hasura/hasura.yaml` file in the `project` field. Eg:

```yaml
project: my-project-name
```

## Create a build

Now we can create a build and apply it with `hasura3 watch`. This will return a table like the following:

```text
+---------------+---------------------------------------------------------------+
| Build ID      | 843e6596-9007-4645-abe2-13385da07611                          |
+---------------+---------------------------------------------------------------+
| Build Version | c522a07ae4                                                    |
+---------------+---------------------------------------------------------------+
| Build URL     | https://old-jackal-7556-c522a07ae4.ddn.hasura.app/graphql     |
+---------------+---------------------------------------------------------------+
| Project Id    | c3e83cb8-96c5-4016-be0c-c9f4d35e63f7                          |
+---------------+---------------------------------------------------------------+
| Console Url   | https://console.hasura.io/project/old-jackal-7556/graphql     |
+---------------+---------------------------------------------------------------+
| FQDN          | old-jackal-7556-c522a07ae4.ddn.hasura.app                     |
+---------------+---------------------------------------------------------------+
| Environment   | default                                                       |
+---------------+---------------------------------------------------------------+
| Description   | Watch build Tue, 23 Jan 2024                                  |
|               | 20:33:28 +07                                                  |
+---------------+---------------------------------------------------------------+
+-----------------+-------------------------------------------------+
| GraphQL API URL | https://trusty-colt-7733.ddn.hasura.app/graphql |
+-----------------+-------------------------------------------------+
```

Paste the Console URL in your browser to see a GraphiQL console for your Hasura graph. 

Now you can run a GraphQL query against your data to see it in action.

![A working query in the Hasura DDN Console](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/connector-ts-sdk-course/hasura_ddn_query.png)

Success!

In the next section, we'll start to fill out some of the missing query functionality, beginning with `where` clauses.