---
title: "Escriba resolvers personalizados"
metaTitle: "Escribir resolvers personalizados | Tutorial de Hasura"
metaDescription: "En esta parte, vamos a ver cómo escribir resolvers personalizados y añadirlo como un esquema remoto en Hasura GraphQL Engine."
---

Ahora vimos cómo se puede ampliar la API de GraphQL mediante Acciones. Mencionamos anteriormente que otra forma de personalizar el gráfico de la API es a través de un servidor GraphQL personalizado.

Tomemos el mismo caso de uso de la información de perfil de Auth0.

Hasura puede combinar esquemas GraphQL remotos y proporcionar una API GraphQL unificada. Para manejar el caso de uso de la obtención de información de perfil Auth0, escribiremos resolvers personalizados en un servidor GraphQL personalizado. Hasura puede combinar este servidor GraphQL personalizado con el esquema generado automáticamente existente.

Este servidor GraphQL personalizado es el `Remote Schema`.

## Escribir un resolver.

Así que escribamos un resolver personalizado que puede fusionarse más tarde en la API GraphQL de Hasura's

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

En el servidor anterior, vamos a desglosar lo que está sucediendo:

- Definimos los tipos GraphQL para `auth0_profile`y .`Query`
- Y luego escribimos un resolver, personalizado para el tipo de `auth0`consulta, donde analizamos los `Authorization`encabezados para obtener el token.
- Descodificamos el token usando el método de la `jsonwebtoken``jwt`biblioteca. Esto da el user_id requerido para obtener información de perfil auth0.
- Solicitamos la [API de administración de Auth0](https://auth0.com/docs/api/management/v2/create-m2m-app), pasando el token y el user_id para obtener detalles sobre este usuario.
- Una vez que recibimos una respuesta, devolvemos el objeto `{email: resp.email, picture: resp.picture}`como respuesta. Otra vez, `null`regresamos.

**¡Nota!** La mayor parte del código escrito es muy similar al código API REST que escribimos en la sección anterior para Acciones. Aquí estamos usando Apollo Server para escribir un servidor GraphQL personalizado desde cero. Si ha creado `auth0`Acción de `Creating Actions`parte, entonces Acción chocará con el esquema auth0 Remoto. Para resolver esto puedes eliminar Action para poder crear esquema remoto o cambiar el nombre `auth0`y `auth0_profile`tipos.

## Despliega

Vamos a implementar el servidor GraphQL personalizado anterior a Glitch. Glitch es una plataforma para crear e implementar aplicaciones (Node.js) y es una forma rápida de probar e iterar código en la nube. Haga clic en el botón de desplegar a Glitch para comenzar.

[![DEPLOY EN GLITCH](https://raw.githubusercontent.com/hasura/graphql-engine/master/community/boilerplates/auth-webhooks/nodejs-express/assets/deploy-glitch.png)](https://glitch.com/~auth0-hasura-remote-schema)

### Variables de medio ambiente

Después de remezclas a tu propio proyecto en Glitch, modifica el `.env`archivo para entrar

- `AUTH0_MANAGEMENT_API_TOKEN`
- `AUTH0_DOMAIN`

valores apropiadamente.

¡Felicidades! Ha escrito y desplegado su primer resolver.
