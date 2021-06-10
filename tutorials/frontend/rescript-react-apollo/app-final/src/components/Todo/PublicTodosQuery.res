let make = %graphql(`
  query {
    todos(
      where: { is_public: { _eq: true } }
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
