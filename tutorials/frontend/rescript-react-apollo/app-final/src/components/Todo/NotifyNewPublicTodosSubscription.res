let make = %graphql(`
  subscription {
    todos(
      where: { is_public: { _eq: true } }
      limit: 1
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
