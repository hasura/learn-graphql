import React from 'react';
import { AsyncStorage } from 'react-native';
import Drawer from './DrawerNavigator';
import CenterSpinner from '../screens/components/Util/CenterSpinner';

console.disableYellowBox = true;

const Main = () => {

  const fetchSession = async () => {
    // fetch session
    const session = await AsyncStorage.getItem('@todo-graphql:session');
    const sessionObj = JSON.parse(session);
    const { token, id } = sessionObj;
  }

  React.useEffect(() => {
    fetchSession();
  }, [])

  return <Drawer />
}

export default Main;