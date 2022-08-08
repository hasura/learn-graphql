---
title: "Limitación de frecuencia"
metaTitle: "Limitación de frecuencia | Tutorial avanzado de Hasura GraphQL"
metaDescription: "La limitación de frecuencia garantiza que se puedan restringir los problemas de rendimiento de la API provocados por consultas malintencionadas o mal implementadas."
---

Los problemas de rendimiento de la API suelen estar provocados por consultas malintencionadas o mal implementadas. En el caso de las consultas malintencionadas, podemos de alguna manera restringirlas configurando listas de permitidos, tal y como hicimos en el paso anterior. Pero hay veces en que quizás queramos configurar restricciones de acceso a la API.

Esto podría implementarse mediante

- La frecuencia de solicitudes de la API - Limitación de frecuencia
- Limitación de la profundidad de las solicitudes - Limitación de profundidad de la consulta

## Configurar un límite para la API {#configuring-api-limit}

Hasura Cloud nos permite configurar los límites para la API en la pestaña Pro/Monitorización. Diríjase a la página `API Limits` en la pestaña `Pro` de la consola. Haga clic en `Configure` para comenzar a definir una regla.

### Limitación de frecuencia {#configuring-rate-limits}

Limita el número de operaciones de GraphQL por minuto. Mediante un enfoque de ventana deslizante. Esto significa que cada vez que Hasura recibe una solicitud, contará la frecuencia de ese cliente durante un minuto desde la hora actual.

Puede configurar el número de operaciones hasta, pongamos, 100. El siguiente paso sería configurarlo en función de algún parámetro único. Podría ser a partir de la dirección IP o bien variables de sesión como `x-hasura-*`.

La forma `IP address` de limitar la frecuencia es útil cuando la API está expuesta a un público más amplio y cuando hay consultas de acceso público no autenticado.

La forma variable de sesión de limitar la frecuencia es útil cuando los usuarios de la aplicación tienen una carga idéntica en la API y la base de datos.

![Limitación de la API basada en roles](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/role-based-api-limit.png)

Los límites de la API pueden configurarse según el rol o de forma global para todos los roles.

### Limitación de profundidad de la consulta {#query-depth-limits}

Limita una operación de GraphQL en función de su profundidad, evitando las consultas profundamente anidadas.
 Los límites de la API se definen según el rol (anónimo, usuario) y pueden restringir la frecuencia de solicitud, su profundidad o ambas cosas. Los parámetros únicos de la solicitud pueden incluir la dirección IP o las variables de sesión (x-hasura-user-id, x-hasura-org-id, etc.)

Imagine que un usuario hace, en nuestro esquema de slack, la siguiente consulta:

```graphql
query userDetails {
  users {
    id
    name
    display_name
    bio
    channel_members {
      id
      user {
        id
        name
      }
      channel {
        id
        name
        channel_members {
          id
          user {
            id
          }
        }
      }
    }
  }
}
```

Esta consulta tiene múltiples profundidades a cuenta de las relaciones. A veces, debido a la naturaleza de las relaciones, la consulta puede entrar en un bucle a través de ellas. Por ejemplo, aquí `channel_members` se consulta dos veces, además de con la relación `user` en su interior. Esto podría prolongarse una y otra vez hasta provocar una consulta SQL realmente larga. Este tipo de consultas afectaría al rendimiento de la base de datos y, dado que este tipo de consulta no añade ningún valor, deberíamos poder restringir la profundidad de la consulta realizada a un número razonable.

¿Cómo se determina la profundidad adecuada de una consulta? En la pestaña Lista de permitidos, tenemos la lista de `New Operations` que nos da una idea bastante ajustada de cuántas consultas se están haciendo y con qué profundidad.

Supongamos que, en este caso, nos parece bien una profundidad de consulta de 5, para permitir el paso de otras consultas genuinas. Podemos configurarlo de igual manera mediante los Límites de la API.

![Límites de la API](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/api-limits.png)
