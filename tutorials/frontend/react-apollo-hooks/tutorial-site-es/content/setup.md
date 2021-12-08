---
title: "Tutorial y configuración de placa de calentamiento"
metaTitle: "Todo aplicación reaccionar la configuración de la placa de caldera | GraphQL React Apollo Hooks Tutorial"
metaDescription: "El backend GraphQL ya está listo. La tarea es convertir la interfaz de usuario estática en una aplicación en tiempo real en React.js"
---

Para este tutorial, el backend GraphQL y la interfaz de usuario de la aplicación básica ya están listos. Nuestra tarea será convertir la interfaz de usuario "estática" en una aplicación en tiempo real de trabajo.

### Clonar y ejecutar la placa de caldera

1. Clonar la [repo.](https://github.com/hasura/learn-graphql) Ejecute los siguientes comandos en su terminal:

```bash
git clone --filter=blob:none --sparse git@github.com:hasura/learn-graphql.git

cd learn-graphql

git sparse-checkout init --cone

git sparse-checkout add tutorials/frontend/react-apollo-hooks/app-boilerplate
```

2. Vaya al `app-boilerplate`directorio.

```bash
cd tutorials/frontend/react-apollo-hooks/app-boilerplate
```

3. Instala dependencias y ejecuta la aplicación "estática"
   - `npm install`
   - `npm start`

4. Registrarse/iniciar sesión como usuario para cargar la página de la aplicación todo

Esto es lo que debes ver después de los pasos anteriores:

![Boilerplate después de iniciar sesión](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/boilerplate-after-login.png)

### Carga GraphiQL para jugar con sus API de GraphQL

1. Dirígete a https://hasura.io/learn/graphql/graphiql
2. Inicie sesión (para que pueda probar las API de GraphQL con un token de usuario válido)

Esto es lo que debes ver después de los pasos anteriores:

![GraphiQL después de iniciar sesión](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql-after-login.png)

### Endpoint de GraphQL

Vamos a hacer uso de `https://hasura.io/learn/graphql`endpoint para hacer nuestras solicitudes GraphQL en el tutorial.

Ahora, si quieres ejecutar tu propia versión del extremo gráfico anterior, puedes hacerlo siguiendo el tutorial de Hasura Backend

- Despliegue Hasura Cloud

<a href="https://cloud.hasura.io/?pg=learn-react&plcmt=body&tech=default" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

- Configurar Hasura Backend

Dirígete a [Hasura Backend Tutorial](https://hasura.io/learn/graphql/hasura/setup/#hasuraconsole) y empieza a crear tu propia versión.
