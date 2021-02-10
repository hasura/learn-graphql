---
title: "Set up a GraphQL client"
metaTitle: "Flutter GraphQL Package Setup | GraphQL Flutter Tutorial"
metaDescription: "You will learn how to configure GraphQL Package in Flutter by importing graphql_flutter dependency"
---

graphql_flutter plugin gives a neat abstraction layer and an interface to your GraphQL server. You don't need to worry about constructing your queries with request body, headers and options, that you might have done with `http` or `dio` say. You can directly write queries and mutations in GraphQL and they will automatically be sent to your server via your client instance.

To setup graphql_flutter,Add `graphql_flutter: ^3.0.1` dependency to your `pubspec.yaml`

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^0.12.1
  toast: ^0.1.5
  shared_preferences: ^0.5.7+3
+ graphql_flutter: ^3.0.1
```

Lets first create GraphQl client which we will need to configure our app. Our app requires both http link for queries, mutations and websocket link for subscriptions.

To do this create a file named `client.dart` inside `lib/config` folder and add the following code inside it.

```dart
+ import 'package:flutter/material.dart';
+ import 'package:app_boilerplate/services/shared_preferences_service.dart';
+ import 'package:graphql_flutter/graphql_flutter.dart';
+ class Config {
+   static final HttpLink httpLink = HttpLink(
+     uri: 'https://hasura.io/learn/graphql',
+   );
+
+   static String _token;
+   static final AuthLink authLink = AuthLink(getToken: () => _token);
+
+   static final WebSocketLink websocketLink =
+    WebSocketLink(
+    url: 'wss://hasura.io/learn/graphql',
+       config: SocketClientConfig(
+       autoReconnect: true,
+       inactivityTimeout: Duration(seconds: 30),
+       initPayload: () async {
          return {
            'headers': {'Authorization': _token},
          };
        },
+     ),
+   );
+
+   static final Link link = authLink.concat(httpLink).concat(websocketLink);
+
+   static String token;
+   static ValueNotifier<GraphQLClient> initailizeClient(String token) {
+     _token = token;
+     ValueNotifier<GraphQLClient> client =
+     ValueNotifier(
+       GraphQLClient(
+         cache: OptimisticCache(dataIdFromObject:typenameDataIdFromObject),
+         link: link,
+       ),
+     );
+     return client;
+   }
+ }
```

In the above code we are creating `httpLink`, `authLink` and `websocketLink` and concatenating them to variable type `Link` link. In function named `initailizeClient` we are configuring our `client` using `GraphQLClient` widget provided by package itself and returning a instance of type `ValueNotifier<GraphQLClient>`.

Now, to add GraphQL provider to our app we have to wrap our parent widget (i.e. `DefaultTabController` inside lib/screens/dashboard.dart) with `GraphQLProvider` widget. `GraphQLProvider` takes `client` and `child` as parameters. As the `client` we have already created a function (`initailizeClient`) which is accept `token` as a parameter and returning `client`. To do this modify your dashboard.dart as follows.

```dart
-  return DefaultTabController(
+  return GraphQLProvider(
+      client: Config.initailizeClient(token),
+      child: CacheProvider(
+        child: DefaultTabController(
          . . .
+        ),
+      ),
    );
```
