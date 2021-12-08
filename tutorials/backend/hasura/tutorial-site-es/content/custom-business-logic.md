---
title: "Logia de negocios personalizados"
metaTitle: "Logia de negocios personalizada | Tutorial de Hasura"
metaDescription: "La lógica de negocio personalizada se puede manejar de dos maneras usando Hasura. Uno es escribiendo resolvers GraphQL personalizados y agregándolo como esquema remoto y otro es activar un webhook asincrónicamente después de una mutación."
---

Hasura le da CRUD + API GraphQL en tiempo real con autorización y control de acceso. Sin embargo, hay casos en los que desea agregar lógica de aduana / negocio en su aplicación. Por ejemplo, en la aplicación todo que estamos construyendo, antes de insertar todos en el feed público queremos validar el texto para la profanidad.

La lógica de negocios personalizada se puede manejar de algunas maneras flexibles en Hasura:

Acciones (Recomendado)
---------------------

[Las acciones](https://hasura.io/docs/latest/graphql/core/actions/index.html) son una manera de ampliar el esquema de Hasura’s con la lógica de negocio personalizada utilizando consultas y mutaciones personalizadas. Se pueden agregar acciones a Hasura para manejar varios casos de uso, como la validación de datos, el enriquecimiento de datos de fuentes externas y cualquier otra lógica de negocio compleja.

![Arquitectura de Acciones](https://hasura.io/docs/latest/_images/actions-arch1.png)

Las acciones pueden ser una consulta o una mutación.

- `Query Action`- Si está consultando algunos datos de una API externa o haciendo algunas validaciones / transformaciones antes de devolver los datos, puede usar una Acción de consulta.
- `Mutation Action`- Si desea realizar validaciones de datos o hacer alguna lógica personalizada antes de manipular la base de datos, puede usar una Acción de mutación.

Esquemas remotos
--------------

Hasura tiene la capacidad de fusionar esquemas GraphQL remotos y proporcionar una API GraphQL unificada. Piensa en ello como costuras de esquema automatizadas. De esta manera, podemos escribir resolvers GraphQL personalizados y agregarlo como un esquema remoto.

![Arquitectura de esquema remota](https://hasura.io/docs/latest/_images/remote-schema-arch1.png)

Si usted está eligiendo entre Acciones y Esquemas Remotos, aquí hay algo que debe tener en cuenta:

- Utilice esquemas remotos si tiene un servidor GraphQL o si se siente cómodo construyendo uno usted mismo.
- Utilice Acciones si necesita llamar a una API REST

Activadores de eventos
--------------

Hasura se puede utilizar para [crear activadores de eventos en las tablas de la base de datos Postgres](https://hasura.io/learn/database/postgresql/triggers/). Los disparadores de eventos capturan eventos de forma fiable en las tablas especificadas e invocan webhooks para llevar a cabo cualquier lógica personalizada. Después de una operación de mutación, los desencadenantes pueden llamar a un webhook asincrónicamente.

Uso de la aplicación todo
-------------------------

En el backend de la aplicación todo que ha construido, hay ciertas funcionalidades personalizadas que puede agregar a las siguientes funciones:

Si desea obtener información de perfil de Auth0, debe hacer una llamada de API a Auth0 con el token. Auth0 solo expone una API REST y no GraphQL. Esta API debe estar expuesta al cliente GraphQL.

Agregaremos una Acción en Hasura para ampliar la API. También veremos cómo se puede hacer lo mismo con un servidor GraphQL personalizado agregado como un Esquema Remoto.

- Reciba una notificación por correo electrónico cada vez que un nuevo usuario se registre en su aplicación. Esta es una operación asincrónica que puede ser invocada a través de Event trigger webhook.

Veremos cómo estos 2 casos de uso pueden ser manejados en Hasura.
