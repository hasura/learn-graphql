---
title: "Testing"
metaTitle: 'Testing | Hasura DDN Data Connector Tutorial'
metaDescription: 'Learn how to build a data connector in Typescript for Hasura DDN'
---

So we have one more function to define, which is the query function, but before we do, let's talk about tests. The [NDC
specification repository](https://github.com/hasura/ndc-spec/) provides a
[test runner executable](https://github.com/hasura/ndc-spec/tree/main/ndc-test) called `ndc-test`, which can be used to
implement a test suite for a connector.

We can also use `ndc-test` to run some automatic tests and validate the work we've done so far. Let's compile and run
our connector, and then use the test runner with the running connector.

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
ndc-test test --endpoint http://localhost:8100
```

OR

```shell
cargo run --bin ndc-test -- test --endpoint http://localhost:8100
````

Some tests fail, but we expected them to fail, but we can already see that our schema response is good.

```text
cargo run --bin ndc-test -- test --endpoint http://localhost:8100
    Finished dev [unoptimized + debuginfo] target(s) in 0.21s
     Running `/Users/me/ndc-spec/target/debug/ndc-test test --endpoint 'http://localhost:8100'`
├ Capabilities ...
│ ├ Fetching /capabilities ... OK
│ ├ Validating capabilities ... OK
├ Schema ...
│ ├ Fetching schema ... OK
│ ├ Validating schema ...
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
│ │ ├ Aggregate queries ...
│ │ │ ├ star_count ... FAIL
│ ├ artists ...
│ │ ├ Simple queries ...
│ │ │ ├ Select top N ... FAIL
│ │ ├ Aggregate queries ...
│ │ │ ├ star_count ... FAIL
```

In the next section, we'll start to implement the query function, and see some of these tests pass.