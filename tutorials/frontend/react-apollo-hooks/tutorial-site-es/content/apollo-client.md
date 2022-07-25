---
title: "Configurar un cliente GraphQL con Apollo"
metaTitle: "Configuración en GraphQL de un cliente Apollo | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Aprenderá a configurar el cliente Apollo en React instalando @apollo/client"
---

import GithubLink from "../src/GithubLink.js";

Apollo ofrece una capa de abstracción clara y una interfaz para su servidor GraphQL. No necesitará preocuparse por la construcción de sus consultas con el cuerpo para solicitudes, los encabezados y las opciones, como habría hecho, pongamos, con `axios` o `fetch`. Puede escribir consultas y mutaciones directamente en GraphQL y serán enviadas automáticamente a su servidor mediante su instancia del cliente apollo.

### Instalación de hooks Apollo con React

Vamos a empezar por instalar las dependencias del cliente apollo y de los pares graphql:

```bash
$ npm install @apollo/client graphql
```

### Cree la instancia del cliente Apollo

Abra `src/components/App.js` y añada las siguientes importaciones en la parte superior:

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/react-apollo-hooks/app-final/src/components/App.js" text="src/components/App.js" />

```javascript
import React from 'react';

import Header from './Header';
import TodoPrivateWrapper from './Todo/TodoPrivateWrapper';
import TodoPublicWrapper from './Todo/TodoPublicWrapper';
import OnlineUsersWrapper from './OnlineUsers/OnlineUsersWrapper';

+ import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

import { useAuth0 } from "./Auth/react-auth0-spa";

const App = ({ idToken }) => {
  const { loading, logout } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header logoutHandler={logout} />
      <div className="row container-fluid p-left-right-0 m-left-right-0">
          <div className="row col-md-9 p-left-right-0 m-left-right-0">
            <div className="col-md-6 sliderMenu p-30">
              <TodoPrivateWrapper />
            </div>
            <div className="col-md-6 sliderMenu p-30 bg-gray border-right">
              <TodoPublicWrapper />
            </div>
          </div>
          <div className="col-md-3 p-left-right-0">
            <div className="col-md-12 sliderMenu p-30 bg-gray">
              <OnlineUsersWrapper />
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;
```

Estas son las dependencias de apollo necesarias para empezar. Ahora vamos a definir una función que devolverá el cliente apollo con httplink y caché.

```javascript
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

+ const createApolloClient = (authToken) => {
+  return new ApolloClient({
+    link: new HttpLink({
+      uri: 'https://hasura.io/learn/graphql',
+      headers: {
+        Authorization: `Bearer ${authToken}`
+      }
+    }),
+    cache: new InMemoryCache(),
+  });
+ };
```

Cree el cliente apollo dentro de `App` y pase el prop del cliente al componente `<ApolloProvider>`.

```javascript
const App = ({ idToken }) => {
  const { loading, logout } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }
+  const [client] = useState(createApolloClient(idToken));
   return (
+    <ApolloProvider client={client}>
       <div>
       </div>
+    </ApolloProvider>
   );
};
```

Vamos a tratar de comprender lo que está pasando aquí.

### HttpLink e InMemoryCache

Estamos creando una `HttpLink` para conectar ApolloClient con el servidor GraphQL. Como ya sabe, nuestro servidor GraphQL se ejecuta en `https://hasura.io/learn/graphql`

Al final, instanciamos ApolloClient pasando nuestro HttpLink y una nueva instancia de `InMemoryCache` (solución de almacenamiento en caché recomendada). Lo rematamos todo con una función que nos devolverá el cliente.

Vamos a aprovechar esta función dentro del componente `App`.
