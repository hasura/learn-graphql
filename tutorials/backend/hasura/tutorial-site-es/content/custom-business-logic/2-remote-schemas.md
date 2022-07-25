---
title: "Escribir resoluciones personalizadas"
metaTitle: "Escribir resoluciones personalizadas | Tutorial de GraphQL de Hasura"
metaDescription: "En esta parte, analizaremos cómo escribir resoluciones personalizadas y agregarlas como esquema remoto en el motor de Hasura GraphQL."
---

Ya vimos cómo se puede extender la API de GraphQL utilizando acciones. Mencionamos anteriormente que otra manera de personalizar el gráfico de la API es a través de un servidor de GraphQL personalizado.

Tomemos el mismo caso de uso de la búsqueda de información de perfil de Auth0.

Hasura puede fusionar esquemas de GraphQL remotos y proporcionar una API de GraphQL unificada. Para manejar el caso de uso de la búsqueda de información de perfil de Auth0, escribiremos resoluciones personalizadas en un servidor de GraphQL personalizado. Hasura puede fusionar este servidor de GraphQL personalizado con el esquema autogenerado existente.

Este servidor de GraphQL personalizado es el `Remote Schema`.

## Escriba resoluciones personalizadas de GraphQL {#write-graphql-custom-resolver}

Así que escribamos una resolución personalizada que pueda fusionarse más adelante en la API de GraphQL de Hasura.

```javascript
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const typeDefs = gql`
  type auth0_profile {
    email: String
    picture: String
  }

  type Query {
    auth0: auth0_profile
  }
`;

function getProfileInfo(user_id) {
  const headers = {
    Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
  };
  console.log(headers);

  return fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${user_id}`, {
    headers,
  });
}

const resolvers = {
  Query: {
    auth0: (parent, args, context) => {
      // read the authorization header sent from the client
      const authHeaders = context.headers.authorization || '';
      const token = authHeaders.replace('Bearer ', '');

      // decode the token to find the user_id
      try {
        if (!token) {
          return 'Authorization token is missing!';
        }

        const decoded = jwt.decode(token);
        const user_id = decoded.sub;

        // make a rest api call to auth0
        return getProfileInfo(user_id)
          .then((resp) => resp.json())
          .then((resp) => {
            console.log(resp);
            if (!resp) {
              return null;
            }

            return { email: resp.email, picture: resp.picture };
          });
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  },
};

const context = ({ req }) => {
  return { headers: req.headers };
};

const schema = new ApolloServer({ typeDefs, resolvers, context });
schema.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`schema ready at ${url}`);
});

```

En el servidor anterior, desglosemos lo que está sucediendo:

- Definimos los tipos de GraphQL para `auth0_profile` y `Query`.
- Y luego escribimos una resolución personalizada para el tipo de consulta `auth0`, en la que analizamos los encabezados de `Authorization` para obtener el token.
- Luego, descodificamos el token mediante el uso del método `jwt` de la biblioteca de `jsonwebtoken`. Esto proporciona el user_id necesario para buscar información de perfil de auth0.
- Solicitamos a la [API de gestión de Auth0](https://auth0.com/docs/api/management/v2/create-m2m-app) que pase el token y el user_id para obtener detalles sobre este usuario.
- Una vez que recibamos una respuesta, devolvemos el objeto `{email: resp.email, picture: resp.picture}` como una respuesta. Si no, devolvemos `null`.

**Nota** La mayoría de los códigos escritos son muy similares al código de API de REST que escribimos en la sección anterior para acciones. Aquí estamos utilizando Apollo Server para escribir un servidor de GraphQL personalizado desde cero. Si ha creado una acción de `auth0` a partir de la parte `Creating Actions`, entonces la acción colisionará con el esquema remoto de auth0. Para resolver esto, puede eliminar la acción para poder crear un esquema remoto o renombrar los tipos `auth0` y `auth0_profile`.

## Despliegue {#deploy}

Despleguemos el servidor de GraphQL personalizado anterior en Glitch. Glitch es una plataforma para crear y desplegar aplicaciones (Node.js) y es una manera rápida de probar e iterar el código en la nube. Haga clic en el botón Desplegar en Glitch a continuación para empezar.

[![DESPLEGAR EN GLITCH](https://raw.githubusercontent.com/hasura/graphql-engine/master/community/boilerplates/auth-webhooks/nodejs-express/assets/deploy-glitch.png)](https://glitch.com/~auth0-hasura-remote-schema)

### Variables del entorno {#environment-variables}

Después de volver a mezclar con su propio proyecto en Glitch, modifique el archivo `.env` para ingresar los valores

- `AUTH0_MANAGEMENT_API_TOKEN`
- `AUTH0_DOMAIN`

adecuadamente.

¡Felicidades! Ha escrito y desplegado su primera resolución personalizada de GraphQL.
