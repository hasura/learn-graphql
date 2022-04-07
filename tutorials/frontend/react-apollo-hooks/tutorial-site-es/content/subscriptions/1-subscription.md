---
title: "Suscripción"
metaTitle: "Configure las Suscripciones de GraphQL con el cliente Apollo | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Aprenderá a configurar las Suscripciones de GraphQL con el cliente Apollo con React, utilizando @apollo/client y su dependencia subscriptions-transport-ws. Esto también incluirá la configuración del token de autorización"
---

import GithubLink from "../../src/GithubLink.js";

Cuando configuramos Apollo por primera vez, utilizamos Apollo Boost para instalar las dependencias necesarias. Pero las suscripciones son un caso de uso avanzado no compatible con Apollo Boost. Así que hemos de instalar más dependencias para configurar las suscripciones.

### Configuración de las Suscripciones Apollo con React

```bash
+ $ npm install subscriptions-transport-ws --save
```

Ahora vamos a necesitar actualizar nuestra instancia `ApolloClient` para que apunte hacia el servidor de suscripciones.

Abra `src/components/App.js` y actualice las siguientes importaciones:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/App.js" text="src/components/App.js" />

```javascript
- import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
+ import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
+ import { WebSocketLink } from "@apollo/client/link/ws";
```

Actualice la función createApolloClient para que incorpore WebSocketLink.

```javascript
const createApolloClient = (authToken) => {
  return new ApolloClient({
-   link: new HttpLink({
+   link: new WebSocketLink({
-     uri: 'https://hasura.io/learn/graphql',
+     uri: 'wss://hasura.io/learn/graphql',
+     options: {
+       reconnect: true,
+       connectionParams: {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
+       }
+     }
    }),
    cache: new InMemoryCache(),
  });
};
```

Tenga en cuenta que vamos a sustituir HttpLink con WebSocketLink y, por lo tanto, todas las consultas GraphQL van a pasar por una única conexión websocket.
