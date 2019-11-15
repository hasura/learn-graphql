import React from 'react';
import {
  AsyncStorage,
  View
} from 'react-native';
import CenterSpinner from './components/Util/CenterSpinner';
import { logout } from '../authActions';

const LogoutScreen = () => {

  const _logout = () => {
    AsyncStorage.removeItem('@todo-graphql:session').then(() => {
      logout();
    });
  };

  React.useEffect(_logout, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CenterSpinner />
    </View>
  );
}

LogoutScreen.navigationOptions = {
  drawerLabel: 'Logout',
  title: 'Logging out'
};

export default LogoutScreen;

