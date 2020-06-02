import React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import CenterSpinner from './components/Util/CenterSpinner';
import MenuButton from './components/Util/MenuButton';
import {useSubscription} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const SUBSCRIBE_TO_ONLINE_USERS = gql`
 subscription {
   online_users(order_by: {user: {name: asc}}) {
     user {
       name
       id
     }
     id
   }
 }
`; 

const OnlineUsers = () => {

  const { data, error, loading } = useSubscription(SUBSCRIBE_TO_ONLINE_USERS)
  if (loading) { return <CenterSpinner />}
  if (error) {
    return <Text> Error </Text>
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
      <FlatList
        data={data.online_users}
        renderItem={({item}) => <UserItem item={item} />}
        keyExtractor={(item) => item.user.name}
      />
      </ScrollView>
    </View>
  );

}

const UserItem = ({item}) => (
  <View style={styles.userContainer}>
    <Text> {item.user.name} </Text>
    <View style={styles.greenDot} />
  </View>
)

OnlineUsers.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Online Users',
  headerLeft: (
    <MenuButton onPress={navigation.toggleDrawer} /> 
  )
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 0.8,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  scrollViewContainer: {
    justifyContent: 'flex-start'
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    paddingLeft: 5,
    paddingRight: 10 
  },
  text: {
    fontSize: 12
  },
  greenDot: {
    backgroundColor: 'green',
    borderRadius: 20,
    height: 15,
    width: 15
  }
});

export default OnlineUsers;