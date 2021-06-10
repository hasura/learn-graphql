let make = %graphql(`
  query {
    todos(
      where: { is_public: { _eq: false } }
      order_by: [{ created_at: desc }]
    ) {
      id
      title
      created_at
      is_completed
    }
  }
`)
