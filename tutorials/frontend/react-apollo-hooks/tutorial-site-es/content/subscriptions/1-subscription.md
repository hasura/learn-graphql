---
title: "Suscripción"
metaTitle: "Configurar suscripciones de GraphQL usando el cliente de Apollo | GraphQL React Ganchos de Apollo Tutorial"
metaDescription: "Aprenderá cómo configurar las suscripciones de GraphQL usando React Apollo Client mediante @apollo/client y sus suscripciones de dependency Esto también tendrá autorización de configuración de token"
---

import GithubLink from "../../src/GithubLink.js";

Cuando inicialmente habíamos establecido Apollo, usamos Apolo Boost para instalar las dependencias requeridas. Pero las suscripciones son un caso de uso avanzado que Apollo Boost no admite Por lo tanto, tenemos que instalar más dependencias para configurar suscripciones.

### Configuración de Suscripciones de Apollo React

```bash
+ $ npm install subscriptions-transport-ws --save
```

Ahora necesitamos actualizar nuestra `ApolloClient`instancia para apuntar al servidor de suscripción.

Abre `src/components/App.js`y actualiza las siguientes importaciones:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/App.js" text="src/components/App.js" />

```javascript
- import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
+ import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
+ import { WebSocketLink } from "@apollo/client/link/ws";
```

Actualice la función createApolloClient para integrar WebSocketLink.

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

Tenga en cuenta que estamos reemplazando HttpLink con WebSocketLink y por lo tanto todas las consultas GraphQL pasan a través de una sola conexión de websocket.
