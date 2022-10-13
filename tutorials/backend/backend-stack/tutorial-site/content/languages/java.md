---
title: "Java"
metaTitle: "Java | GraphQL Backend Stack Tutorial"
metaDescription: "Learn how to integrate Java with Hasura."
---

## What is Java

Java is a high-level, class-based, object-oriented programming language with as few implementation dependencies as possible. Learn more at [the official website](https://www.java.com/).

The following guide covers common backend application tasks, such as creating REST endpoints using [Spring Boot](https://spring.io/projects/spring-boot/). We also go over how to integrate your Java app with Hasura. We will be using [Gradle](https://gradle.org/) for dependencies.

New to Hasura? The Hasura GraphQL Engine makes your data instantly accessible over a real-time GraphQL API so that you can build and ship modern, performant apps and APIs 10x faster. Hasura connects to your databases, REST and GraphQL endpoints, and third-party APIs to provide a unified, connected, real-time, secured GraphQL API for all your data. Check out [the documentation](https://hasura.io/docs/latest/index/).

See the [the server source code on Github](https://github.com/hasura/learn-graphql/backend/backend/tutorial-site/source-code/java).

## Create Java REST Endpoint

We will create a login POST endpoint that takes a username and password and returns an access code using Spring Boot Reactive Web.

### Spring Boot

Using [Spring Initializr](https://start.spring.io/) we generate a Spring Boot app with the following settings:

- Default names
- Gradle
- Spring Boot 2.7.4
- Packaging Jar
- Java 17
- The dependencies Spring Reactive Web and Spring Boot DevTools

In the folder `src/main/java/com/example/demo/action` we create three record files and one controller to represent our requests and responses:

ActionController.java

```java
package com.example.demo.action;

import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ActionController {
    @PostMapping("/action")
    public ResponseEntity<LoginResponse> login(RequestEntity<ActionPayload<loginArgs>> request) {
        return ResponseEntity.ok().body(new LoginResponse("<sample value>"));
    }
}
```

ActionPayload.java

```java
package com.example.demo.action;

import java.util.Map;

record ActionName(String name) {}

public record ActionPayload<T extends Record>(ActionName action, T input, String request_query, Map<String, String> session_variables) {
}
```

loginArgs.java

```java
package com.example.demo.action;

public record loginArgs(String username, String password) {
}
```

LoginResponse.java

```java
package com.example.demo.action;

public record LoginResponse(String AccessToken) {
}
```

Run the app

```bash
./gradlew bootRun
```

### Hasura Action

When writing a backend we usually have to write around 80% of our code doing boilerplate CRUD operations. Hasura helps us by autogenerating this part.

When we need to write custom business logic we can integrate our Java REST endpoint using [Hasura Actions](https://hasura.io/docs/latest/actions/index/), giving us the best of both worlds.

In the Actions tab on the Hasura Console we will set up a custom login function that calls the REST endpoint we created:

```graphql
type Mutation {
  login(username: String!, password: String!): LoginResponse
}
```

New types definition:

```graphql
type LoginResponse {
  AccessToken: String!
}
```

Create the action, click the `Codegen` tab, and select `java-spring-boot`.

Copy the files and run the Spring application:

```bash
./gradlew bootRun
```

In the Hasura API explorer tab you should now be able to test it

```graphql
mutation {
  login(password: "password", username: "username") {
    AccessToken
  }
}
```

Result:

```json
{
  "data": {
    "login": {
      "AccessToken": "<sample value>"
    }
  }
}
```

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/java/java-hasura-actions.png" alt="Hasura Actions with Java backend" />

### Event Triggers

Databases like Postgres can run triggers when data changes, with [Hasura event triggers](https://hasura.io/docs/latest/event-triggers/index/) we can easily call an HTTP endpoint whenever we have one of these events.

Let's send a webhook when a new user is created and print out their name.

1.  In the Hasura Console add a `user` table with a `Text` column `name` and the frequently used `UUID` column id.

1.  In the event trigger tab, on the `user` table, check the insert and via console trigger operations.

1.  The event trigger payload schema can be found [in the docs](https://hasura.io/docs/latest/graphql/core/event-triggers/payload/#json-payload). We make Records in Java to represent this

    ```java
    package com.example.demo.event;

    import com.fasterxml.jackson.annotation.JsonProperty;

    import java.util.Map;
    import java.util.Optional;

    record Data<New, Old>(@JsonProperty("new") New _new, Old old) {}

    record DeliveryInfo(Integer current_retry, Integer max_retries) {}

    record Event<New, Old>(Data<New, Old> data, String op, Map<String, String> session_variables, TraceContext trace_context) {}

    record Table(String name, String schema) {}

    record TraceContext(String span_id, String trace_id) {}

    record Trigger(String name) {}

    public record EventPayload<New, Old>(String created_at, DeliveryInfo delivery_info, Event<New, Old> event, String id, Table table, Trigger trigger) {}

    ```

1.  Now we make an REST controller that handles the event

    ```java
    package com.example.demo.event;

    import org.springframework.http.RequestEntity;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.RestController;

    import java.util.Optional;

    record UserTable(String id, String name) {
    }

    @RestController
    public class EventController {
        @PostMapping("/event")
        public ResponseEntity newUserHandler(RequestEntity<EventPayload<UserTable, Optional<UserTable>>> request) {
            return ResponseEntity.ok().build();
        }
    }
    ```

When you add a user in Hasura your Spring Boot server should receive the event.

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/java/java-event-triggers.png" alt="Hasura Event Triggers with Java backend" />

## Create a Spring Boot GraphQL Server

We can make a custom GraphQL server in Spring Boot using [Netflix's DGS](https://netflix.github.io/dgs/) and connect it to Hasura using a [remote schema](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/).

1. Run the [DGS getting started guide](https://netflix.github.io/dgs/getting-started/), stop before the `Implement a Data Fetcher` step.

2. Run the [DGS code generation quickstart](https://netflix.github.io/dgs/generating-code-from-schema/). For this tutorial we are using version 5.3.1.

3. Run the `generateJava` task in Gradle.

4. Copy `build/generated/sources/dgs-codegen-generated-examples/com/example/packagename/datafetchers/ShowsDatafetcher.java` to `src/main/java/com/example/demo/ShowsDatafetcher.java`

5. Rename the package to `package com.example.demo;`

6. Run the Spring Boot app and navigate to `<Spring Boot URL>/graphql` and if everything worked you should be able to query `shows`

### Hasura Remote Schema

We can connect our custom GraphQL server to Hasura using [remote schemas](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/).

1. In the Hasura Console remote schema tab, add your Java server `<Spring Boot URL>/graphql`

1. In the API Explorer tab, try querying the sample shows.

   ```graphql
   {
     shows {
       title
     }
   }
   ```

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/
backend-stack/java/java-remote-schema.png" alt="Hasura Event Triggers with Java backend" />

## Query GraphQL from Java

To query a GraphQL endpoint from Java we use the [DGS GraphQL Client](https://netflix.github.io/dgs/advanced/java-client/).

1. Add the line `generateClient = true` to our previous `generateJava` Gradle task and rerun it.

2. Query the shows in our Action handler

   ```java
   package com.example.demo.action;

   import com.example.packagename.client.ShowsGraphQLQuery;
   import com.example.packagename.client.ShowsProjectionRoot;
   import com.netflix.graphql.dgs.client.GraphQLResponse;
   import com.netflix.graphql.dgs.client.MonoGraphQLClient;
   import com.netflix.graphql.dgs.client.WebClientGraphQLClient;
   import com.netflix.graphql.dgs.client.codegen.GraphQLQueryRequest;
   import org.springframework.http.RequestEntity;
   import org.springframework.http.ResponseEntity;
   import org.springframework.web.bind.annotation.PostMapping;
   import org.springframework.web.bind.annotation.RestController;
   import org.springframework.web.reactive.function.client.WebClient;
   import reactor.core.publisher.Mono;

   @RestController
   public class ActionController {
       @PostMapping("/action")
       public ResponseEntity<LoginResponse> login(RequestEntity<ActionPayload<loginArgs>> request) {
           GraphQLQueryRequest graphQLQueryRequest = new GraphQLQueryRequest(new ShowsGraphQLQuery.Builder().build(), new ShowsProjectionRoot().title());
           String query = graphQLQueryRequest.serialize();
           WebClient webClient = WebClient.create("http://localhost:8080/v1/graphql");
           WebClientGraphQLClient client = MonoGraphQLClient.createWithWebClient(webClient);
           Mono<GraphQLResponse> graphQLResponseMono = client.reactiveExecuteQuery(query);
           graphQLResponseMono.subscribe(result -> System.out.println(result.getJson()));

           return ResponseEntity.ok().body(new LoginResponse("<sample value>"));
       }
   }
   ```

## Conclusion

When developing backend applications, we may need to write custom business logic. When we use Hasura, it autogenerates most of our API but gives us escape hatches for this custom logic. We've gone over a few ways you can use the power of Java. Enjoy!

If you use Hasura and are ready to go to production, check out Hasura Cloud for a fully managed Hasura deployment.

<a target="_blank" rel="noopener" href="https://cloud.hasura.io"><img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/global/deploy-to-hasura.png" /></a>
