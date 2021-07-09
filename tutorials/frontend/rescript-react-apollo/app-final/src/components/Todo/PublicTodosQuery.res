let make = %graphql(`
  query ($before: Int, $after: Int, $limit: Int) {
    todos(
      where: { is_public: { _eq: true }, id: { _lt: $before, _gt: $after  } }
      limit: $limit
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
