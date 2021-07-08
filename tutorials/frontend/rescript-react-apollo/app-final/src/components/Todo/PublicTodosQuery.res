let make = %graphql(`
  query ($oldestTodoId: Int, $latestVisibleId: Int ) {
    todos(
      where: { is_public: { _eq: true }, id: { _lt: $oldestTodoId, _gt: $latestVisibleId  } }
      limit: 7
      order_by: [{ created_at: desc }]
    ) {
      id
      title
      created_at
      is_completed
      user {
        name
      }
    }
  }
`)
