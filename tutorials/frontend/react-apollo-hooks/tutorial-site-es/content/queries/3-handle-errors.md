---
title: "Manejar la carga/errores"
metaTitle: "Apollo useQuery React hook Manejo de errores | GraphQL React Apollo Hooks Tutorial"
metaDescription: "Vamos a manejar los estados de carga y error GraphQL en la aplicación React usando las propiedades de gancho de Apollo useQuery React - carga y error"
---

Como vimos en el paso anterior, Apollo devolvió un objeto de resultado con propiedades . Entre ellos `loading`y `error`son los comunes que tendrás que manejar en tu app.

Ahora volvamos al gancho de `useQuery`React que escribió en el paso anterior.

```javascript

  const TodoPrivateListQuery = () => {
  const { loading, error, data } = useQuery(GET_MY_TODOS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  return <TodoPrivateList todos={data.todos} />;
};

```

### Apollo Query Estado de carga
Cuando este componente se monta, es posible que la consulta GraphQL enviada en segundo plano no se haya completado. Pero necesitamos manejar ese estado temporal de ningún dato y por lo tanto devolvemos algún texto útil durante el `loading`estado. En este estado de carga, normalmente puedes hacer cosas elegantes como mostrar un giro de carga.

### Estado de error de consulta de Apollo
Ahora, la consulta también podría terminar en un `error`estado debido a varias razones. A veces la consulta de graphql podría ser incorrecta, o el servidor no está respondiendo. Cualquiera que sea la razón, el usuario que enfrenta la interfaz de usuario debe mostrar algo para transmitir que ha ocurrido un error. En este estado de error, normalmente puede enviar estos mensajes de error a servicios de terceros para rastrear lo que salió mal.

Todos dichos y hechos, estos son dos estados importantes que deben ser manejados dentro de su componente. Lo que has escrito anteriormente es básico, pero suficiente para este tutorial.
