import React from 'react';
import { AsyncStorage } from 'react-native';
import Drawer from './DrawerNavigator';
import CenterSpinner from '../screens/components/Util/CenterSpinner';
import { ApolloProvider } from 'react-apollo';
import makeApolloClient from '../apollo';
import gql from "graphql-tag";

console.disableYellowBox = true;

// GraphQL mutation to update last_seen
const EMIT_ONLINE_EVENT = gql`
mutation {
 update_users(
   _set: {
     last_seen: "now()"
   },
   where: {}
 ) {
   affected_rows
 }
}
`;

const Main = () => {

  const [client, setClient] = React.useState(null);

  const fetchSession = async () => {
    // fetch session
    const session = await AsyncStorage.getItem('@todo-graphql:session');
    const sessionObj = JSON.parse(session);
    const { token, id } = sessionObj;

    const client = makeApolloClient(token);

    setClient(client);
    setInterval(
      () => {
        client.mutate({
          mutation: EMIT_ONLINE_EVENT,
        })
      },
      30000
    );
  }

  React.useEffect(() => {
    fetchSession();
  }, [])

  if (!client) {
    return <CenterSpinner />
  }

  return (
    <ApolloProvider client={client}>
      <Drawer />
    </ApolloProvider>
  );
}

export default Main;