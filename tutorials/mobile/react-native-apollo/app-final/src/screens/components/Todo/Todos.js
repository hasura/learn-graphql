import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import TodoItem from './TodoItem';
import LoadOlder from './LoadOlder';
import LoadNewer from './LoadNewer';
import CenterSpinner from '../Util/CenterSpinner';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from 'react-apollo';


export const FETCH_TODOS = gql`
  query ($isPublic: Boolean) {
   todos (
     order_by: {
       created_at: desc
     },
     where: { is_public: { _eq: $isPublic} }
     limit: 20
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

const SUBSCRIBE_TO_NEW_TODOS = gql`
subscription {
  todos (
    order_by: {
      created_at: desc
    }
    limit: 1
    where: { is_public: { _eq: true }}
  ) {
    id
    created_at
  }
}
`;

const Todos = ({ isPublic, ...props }) => {

  const [newTodosExist, setNewTodosExist] = React.useState(false);

  const subscribeToNewTodos = () => {
    const { client } = props;
    if (isPublic) {
      client.subscribe({
        query: SUBSCRIBE_TO_NEW_TODOS,
      }).subscribe({
        next: (event) => {
          if (event.data.todos.length) {
            let localData;
            try {
              localData = client.readQuery({
                query: FETCH_TODOS,
                variables: {
                  isPublic: true,
                }
              });
            } catch (e) {
              return;
            } 
            
            const lastId = localData.todos[0] ? localData.todos[0].id : 0;
            if (event.data.todos[0].id > lastId) {
              setNewTodosExist(true)
            }
          }
        },
        error: (err) => {
          console.error("err", err);
        }
      })
    }
  };
  React.useEffect(subscribeToNewTodos, []);

  const dismissNewTodoBanner = () => {
    setNewTodosExist(false);
  };

  const { data, error, loading } = useQuery(
    FETCH_TODOS,
    {
      variables: { isPublic }
    }
  );

  if (error) {
    console.error(error);
    return <Text>Error</Text>;
  }

  if (loading) {
    return <CenterSpinner />;
  }

  return (
    <View style={styles.container}>
    <LoadNewer show={newTodosExist && isPublic} toggleShow={dismissNewTodoBanner} styles={styles} isPublic={isPublic}/>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
        <FlatList
          data={data.todos}
          renderItem={({item}) => <TodoItem item={item} isPublic={isPublic}/>}
          keyExtractor={(item) => item.id.toString()}
        />
        <LoadOlder
          isPublic={isPublic}
          styles={styles}
        />
      </ScrollView>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 0.8,
    paddingHorizontal: 10,
    backgroundColor: '#F7F7F7'
  },
  scrollViewContainer: {
    justifyContent: 'flex-start'
  },
  banner: {
    flexDirection: 'column',
    backgroundColor: '#39235A',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  pagination: {
    flexDirection: 'row',
    backgroundColor: '#39235A',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 5,
    marginBottom: 20,
    paddingVertical: 5,
  },
  buttonText: {
    color: 'white'
  }
});

export default  withApollo(Todos);