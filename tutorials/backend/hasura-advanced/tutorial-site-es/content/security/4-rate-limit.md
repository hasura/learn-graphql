---
title: "Limitación de tarifas"
metaTitle: "Limit Tutorial avanzado de Hasura GraphQL."
metaDescription: "La limitación de velocidad garantiza que los problemas de rendimiento de la API causados por consultas maliciosas o mal implementadas pueden ser restringidos."
---

Los problemas de rendimiento de la API suelen ser causados por consultas maliciosas o mal implementadas. En el caso de consultas maliciosas, podemos restringir de una manera configurando listas de permisos como lo hicimos en el paso anterior. Pero a veces, es posible que desee configurar restricciones para el acceso a la API.

Esto podría ser aplicado por

- Tarifa de solicitudes de API - Límites de tarifas
- Limitar la profundidad de las solicitudes - Query Depth Limit

## Configurar un límite de API

Hasura Cloud permite configurar los límites de API en la pestaña Pro/Monitoring y vaya a la `API Limits`página de la `Pro`pestaña de la consola. Haga clic en para comenzar `Configure`a especificar una regla.

### Límites de tarifas

Restringe el número de operaciones GraphQL por minuto. Esto utiliza un enfoque de ventana corredera. Esto significa que cuando Hasura recibe una solicitud, contará la tarifa de ese cliente a partir del momento actual hasta durar un minuto.

Puede configurar el número de operaciones para que digamos 100. El siguiente paso es configurarlo en función de algún parámetro único. Esto podría basarse en la dirección IP o variables de sesión como `x-hasura-*`.

La `IP address`forma de limitar la tasa es útil cuando la API está expuesta a un público más amplio y cuando hay acceso público no autenticado a las consultas.

La forma variable de sesión de limitación de velocidad es útil cuando los usuarios de su aplicación tienen una carga igual en su API y base de datos.

![Límite de API basado en roles](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/role-based-api-limit.png)

Los límites de API se pueden configurar por rol o globalmente para todos los roles.

### Límites de profundidad de consulta

Restringe una operación GraphQL basada en su profundidad, evitando consultas profundamente anidadas. Los límites de API se definen por función (anónima, usuario) y pueden restringir la tasa de solicitud, la profundidad o ambos. Los parámetros únicos de la solicitud pueden incluir la dirección IP o las variables de sesión (x-hasura-user-id, x-hasura-org-id, etc.)

En nuestro esquema de falta de información, imagina a un usuario haciendo la siguiente consulta:

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

Hay múltiples profundidades a esta consulta a través de las relaciones. A veces, debido a la naturaleza de las relaciones, puedes seguir bucle a través de ellas en la consulta. Por ejemplo, aquí `channel_members`se está preguntando dos veces junto con la `user`relación dentro de eso. Esto podría continuar y hacer que se genere una consulta SQL realmente larga. Tales consultas afectarían al rendimiento de la base de datos y como estas consultas no agregan ningún valor, deberíamos ser capaces de restringir la profundidad de la consulta hecha a un número razonable.

¿Cómo se determina la profundidad de consulta correcta? En la pestaña Permitir la lista, tienes la lista de `New Operations`que te da una idea justa de cuántas consultas se están haciendo con qué profundidad.

Supongamos que estamos bien con una profundidad de consulta de 5 en este caso para permitir que otras consultas genuinas se pasen. Podemos configurar lo mismo a través de los límites de API.

![Límites de API](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/api-limits.png)
