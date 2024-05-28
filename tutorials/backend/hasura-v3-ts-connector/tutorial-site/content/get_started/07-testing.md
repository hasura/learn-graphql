---
title: "Testing"
metaTitle: 'Testing | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

So we have one more function to define, which is the `query` function, but before we do, let's talk about tests. The 
[NDC specification repository](https://github.com/hasura/ndc-spec/) provides a
[test runner executable](https://github.com/hasura/ndc-spec/tree/main/ndc-test) called `ndc-test`, which can be used to
implement a test suite for a connector.

We can also use `ndc-test` to run some automatic tests and validate the work we've done so far. Let's compile and run
our connector, and then use the test runner with the running connector.

```sh
npm run build && node dist/index.js serve --configuration .
```

Back in your `ndc-typescript-learn-course` directory that we cloned during setup, you have a `configuration.json` file 
which you can use to run the connector against your sample database.

[//]: # (TODO more info about configuration.json)

[//]: # (In this context of this course you need not worry about the configuration file or how it was created, although it is )
[//]: # (a core feature of Hasura DDN. You can read more about it in the )
[//]: # ([Hasura DDN quickstart]&#40;https://hasura.io/docs/3.0/local-dev/&#41; and in the )
[//]: # ([supergraph modeling]&#40;https://hasura.io/docs/3.0/supergraph-modeling/overview/&#41; section of docs. )

[//]: # (TODO - document the test runner better in the spec repo)
Now, let's run the tests. (You will need to have the
[ndc test runner](https://github.com/hasura/ndc-spec/tree/main/ndc-test) installed on
your machine.)

```shell
ndc-test test --endpoint http://localhost:8080
```

OR

```shell
cargo run --bin ndc-test -- test --endpoint http://localhost:8080
````

Some tests fail, but we expected them to fail, but we can already see that our schema response is good.

```text
cargo run --bin ndc-test -- test --endpoint http://localhost:8080
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.23s
     Running `/Users/sean/ProjectsHasura/ndc-spec/target/debug/ndc-test test --endpoint 'http://localhost:8080'`

├ Capabilities ...
│ ├ Fetching /capabilities ... OK
│ ├ Validating capabilities ... OK
├ Schema ...
│ ├ Fetching schema ... OK
│ ├ Validating schema ...
│ │ ├ scalar_types ... OK
│ │ ├ object_types ... OK
│ │ ├ Collections ...
│ │ │ ├ albums ...
│ │ │ │ ├ Arguments ... OK
│ │ │ │ ├ Collection type ... OK
│ │ │ ├ artists ...
│ │ │ │ ├ Arguments ... OK
│ │ │ │ ├ Collection type ... OK
│ │ ├ Functions ...
│ │ │ ├ Procedures ...
├ Query ...
│ ├ albums ...
│ │ ├ Simple queries ...
│ │ │ ├ Select top N ... FAIL
│ ├ artists ...
│ │ ├ Simple queries ...
│ │ │ ├ Select top N ... FAIL
Failed with 2 test failures:

[1] Select top N
  in Query
  in albums
  in Simple queries
  in Select top N
Details: error communicating with the connector: error in response: status code 500 Internal Server Error

[2] Select top N
  in Query
  in artists
  in Simple queries
  in Select top N
Details: error communicating with the connector: error in response: status code 500 Internal Server Error
```

In the next section, we'll start to implement the query function, and see some of these tests pass.