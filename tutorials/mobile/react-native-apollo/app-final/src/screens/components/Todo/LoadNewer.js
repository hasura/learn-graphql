import React from 'react';
import { TouchableOpacity, Text } from 'react-native'
import CenterSpinner from '../Util/CenterSpinner';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

import { FETCH_TODOS } from './Todos';

const FETCH_NEW_TODOS = gql`
 query ($lastId: Int){
  todos (
    order_by: {
      id: desc
    },
    where: {
      _and: {
        is_public: { _eq: true},
        id: { _gt: $lastId}
      }
    }
  ) {
    id
    title
    is_completed
    created_at
    is_public
    user {
      name
    }
  }
}
`;

const LoadNewerButton = ({ show, styles, isPublic, ...props }) => {

  const [buttonText, setButtonText] = React.useState('New todos have arrived');
  const [loading, setLoading] = React.useState(false);

  const fetchNewerTodos = async () => {
    const { client } = props;
    const data = client.readQuery({
      query: FETCH_TODOS,
      variables: {
        isPublic,
      }
    });
    const lastId = data.todos[0].id;
    setLoading(true);
    const resp = await client.query({
      query: FETCH_NEW_TODOS,
      variables: { lastId }
    });
    setLoading(false);
    if (resp.data) {
      const newData = {
        todos: [ ...resp.data.todos, ...data.todos]
      }
      client.writeQuery({
        query: FETCH_TODOS,
        variables: {
          isPublic,
        },
        data: newData
      });
      props.toggleShow();
    }
  }

  if (!show) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.banner}
      disabled={loading}
      onPress={fetchNewerTodos}
    > 
      {
        loading ?
        <CenterSpinner /> :
        <Text style={styles.buttonText}>
          {buttonText}
        </Text>
      }
    </TouchableOpacity> 
  )
}

export default withApollo(LoadNewerButton);