---
title: "Gestión de carga/errores"
metaTitle: "Gestión de errores del hook React useQuery en Apollo | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Vamos a gestionar los estados de carga y error de GraphQL en la aplicación React con las propiedades del hook React useQuery de Apollo - carga y error"
---

Como hemos visto en el paso anterior, Apollo devolvió un objeto como resultado con propiedades . Entre ellas, `loading` y `error` son las más habituales, y necesitará aprender a manejarlas en su aplicación.

Volvamos ahora al hook React `useQuery` que escribimos en el paso anterior.

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

### Estado de carga de la consulta Apollo
Cuando se monta este componente, es posible que la consulta GraphQL enviada en segundo plano no se haya completado. Pero necesitaremos gestionar ese estado temporal sin datos y por lo tanto devolveremos algún texto útil durante el estado `loading`.
 En este estado de carga, por lo general pueden hacerse cosas vistosas como mostrar un spinner de carga.

### Estado de error de la consulta Apollo
La consulta también podría, llegado el caso, terminar en un estado `error` por varias razones. A veces, la consulta graphql podría ser errónea, o que el servidor no responda. Sea cual sea la razón, la interfaz de usuario que mira a este debería mostrar algo para comunicar que se ha producido un error.
 En este estado de error, lo habitual es enviar estos mensajes de error a un servicio de terceros para que se haga un seguimiento de lo que ha salido mal.

Al fin y al cabo, son dos estados importantes que necesitan ser gestionados dentro de su componente. Lo que haya escrito antes será básico, pero suficiente para este tutorial.
