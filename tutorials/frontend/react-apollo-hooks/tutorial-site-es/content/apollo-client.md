---
title: "Configurar un cliente GraphQL con Apollo"
metaTitle: "Configuración de Graph de Apollo para clientes de Apollo Ganchos de Apollo"
metaDescription: "Aprenderá cómo configurar Apollo Client en React instalando @apollo/client"
---

import GithubLink from "../src/GithubLink.js";

Apollo da una capa de abstracción limpia y una interfaz a su servidor GraphQL. No necesitas preocuparte por construir tus consultas con el cuerpo, los encabezados y las opciones de la solicitud, con las que podrías haber hecho `axios`o `fetch`decir. Puede escribir directamente consultas y mutaciones en GraphQL y se enviarán automáticamente a su servidor a través de su instancia de cliente de apollo.

### React Apollo Hooks Instalación

Vamos a empezar instalando dependencias de cliente de apollo y de cliente de pares graphql:

```bash
$ npm install @apollo/client graphql
```

### Crear una instancia de cliente de Apollo

Abra `src/components/App.js`y agregue las siguientes importaciones en la parte superior:

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

Estas son las dependencias apollo necesarias para empezar. Ahora vamos a definir una función que devolverá el cliente de apollo con httplink y caché.

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

Cree el cliente apollo dentro `App`y pase el prop del cliente al `<ApolloProvider>`componente.

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

Intentemos entender lo que está pasando aquí.

### HttpLink y InMemoryCache

Estamos creando un `HttpLink`para conectar ApolloClient con el servidor GraphQL. Como ya sabe, nuestro servidor GraphQL se está ejecutando en`https://hasura.io/learn/graphql`

Al final, instanciamos a ApolloClient pasando en nuestro HttpLink y una nueva instancia de (solución de almacenamiento en caché `InMemoryCache`recomendada). Estamos envueltos todo esto en una función que devolverá al cliente.

Vamos a hacer uso de esta función dentro de `App`componente.
