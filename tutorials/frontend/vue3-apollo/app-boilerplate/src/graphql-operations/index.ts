import { gql } from "graphql-tag"

export const INSERT_TODOS_ONE = gql`
    mutation insert_todos_one($object: todos_insert_input!) {
        insert_todos_one(object: $object) {
            id
            title
            is_completed
            created_at
            is_public
        }
    }
`

export const INSERT_TODOS = gql`
    mutation insert_todos($objects: [todos_insert_input!]!) {
        insert_todos(objects: $objects) {
            affected_rows
            todos {
                id
                title
                is_completed
                created_at
                is_public
            }
        }
    }
`

export const UPDATE_TODO_BY_PK = gql`
    mutation update_todos_by_pk($pk_columns: todos_pk_columns_input!, $_set: todos_set_input!) {
        update_todos_by_pk(pk_columns: $pk_columns, _set: $_set) {
            id
            title
            is_completed
            created_at
            is_public
        }
    }
`

export const UPDATE_TODOS = gql`
    mutation update_todos($objects: [todos_set_input!]!, $where: todos_bool_exp!) {
        update_todos(objects: $objects, where: $where) {
            affected_rows
            todos {
                id
                title
                is_completed
                created_at
                is_public
            }
        }
    }
`

export const DELETE_TODOS_BY_PK = gql`
    mutation delete_todos_by_pk($id: Int!) {
        delete_todos_by_pk(id: $id) {
            id
            title
            is_completed
            created_at
            is_public
        }
    }
`

export const DELETE_TODOS = gql`
    mutation delete_todos($where: todos_bool_exp!) {
        delete_todos(where: $where) {
            affected_rows
        }
    }
`

export const SELECT_TODO_BY_PK = gql`
    query todos_by_pk($pk_columns: todos_pk_columns_input!) {
        todos_by_pk(pk_columns: $pk_columns) {
            id
            title
            is_completed
            created_at
            is_public
        }
    }
`

export const SELECT_TODOS = gql`
    query todos(
        $where: todos_bool_exp!
        $order_by: [todos_order_by!]
        $limit: Int = 10
        $offset: Int
    ) {
        todos(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
            id
            title
            is_completed
            created_at
            is_public
        }
    }
`

export const SELECT_TODOS_WITH_USER = gql`
    query todos_with_user(
        $where: todos_bool_exp!
        $order_by: [todos_order_by!]
        $limit: Int = 10
        $offset: Int
    ) {
        todos(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
            id
            title
            is_completed
            created_at
            is_public
            user {
                id
                name
            }
        }
    }
`

export const NOTIFY_NEW_PUBLIC_TODOS = gql`
    subscription notifyNewPublicTodos($lastId: Int) {
        todos(
            where: { is_public: { _eq: true }, id: { _gt: $lastId } }
            order_by: { created_at: desc }
            limit: 1
        ) {
            id
            title
            created_at
        }
    }
`

export const SUBSCRIPTION_ONLINE_USERS = gql`
    subscription getOnlineUsers {
        online_users(order_by: { user: { name: asc } }) {
            id
            user {
                name
            }
        }
    }
`

export const UPDATE_LASTSEEN_MUTATION = gql`
    mutation updateLastSeen($now: timestamptz!) {
        update_users(where: {}, _set: { last_seen: $now }) {
            affected_rows
        }
    }
`
