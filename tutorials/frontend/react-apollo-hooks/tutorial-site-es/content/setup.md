---
title: "Configuración del tutorial y la plantilla"
metaTitle: "Configuración de la plantilla de la aplicación de tareas pendientes React | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "El backend GraphQL ya está listo. La tarea consiste en convertir la interfaz de usuario estática en una aplicación funcional en tiempo real en React.js"
---

Para este tutorial, el backend GraphQL y la interfaz de usuario básica de la aplicación ya están listos.
 Nuestra tarea será convertir la interfaz de usuario «estática» en una aplicación funcional en tiempo real.

### Clone y ejecute la plantilla

1. Clone el repositorio de [learn-graphql](https://github.com/hasura/learn-graphql). Ejecute los siguientes comandos en su terminal:

```bash
# make sure git version is >= v2.26

git clone --filter=blob:none --sparse git@github.com:hasura/learn-graphql.git

cd learn-graphql

git sparse-checkout init --cone

git sparse-checkout add tutorials/frontend/react-apollo-hooks/app-boilerplate
```

2. Desplácese hasta el directorio `app-boilerplate`.

```bash
cd tutorials/frontend/react-apollo-hooks/app-boilerplate
```

3. Instale las dependencias y ejecute la aplicación «estática»
   - `npm install`
   - `npm start`

4. Regístrese/inicie sesión como usuario para cargar la página de la aplicación de tareas pendientes

Esto es lo que debería ver tras los pasos anteriores:

![Plantilla tras el inicio de sesión](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/boilerplate-after-login.png)

### Cargue GraphiQL para jugar con sus API de GraphQL

1. Diríjase a https://hasura.io/learn/graphql/graphiql
2. Inicie sesión (para que pueda probar las API de GraphQL con un token de usuario válido)

Esto es lo que debería ver tras los pasos anteriores:

![GraphiQL tras el inicio de sesión](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql-after-login.png)

### Punto de conexión de GraphQL

Vamos a aprovechar el punto de conexión `https://hasura.io/learn/graphql` para hacer nuestras solicitudes de GraphQL en el tutorial.

Ahora, si quiere ejecutar su propia versión del punto de conexión GraphQL anterior, puede hacerlo siguiendo las indicaciones del tutorial Hasura Backend

- Despliegue Hasura Cloud

<a href="https://cloud.hasura.io/?pg=learn-react&plcmt=body&tech=default" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

- Configure Hasura Backend

Diríjase al [Tutorial Hasura Backend](https://hasura.io/learn/graphql/hasura/setup/#hasuraconsole) y comience a crear su propia versión.
