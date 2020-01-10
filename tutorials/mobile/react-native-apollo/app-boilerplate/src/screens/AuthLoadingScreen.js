import React from 'react';
import {
  AsyncStorage,
  View,
} from 'react-native';
import CenterSpinner from './components/Util/CenterSpinner';
import {setLogout} from '../authActions';

const AuthLoadingScreen = ({ navigation }) =>  {

  // auth init function
  const _bootstrapAsync = async () => {
    // Fetch token from storage
    const session = await AsyncStorage.getItem('@todo-graphql:session');
    // If session exists, validate it, else redirect to login screen
    if (session) {
      const sessionObj = JSON.parse(session);
      var currentTime = Math.floor(new Date().getTime() / 1000);
      if (currentTime < sessionObj.exp) {
        setLogout(() => navigation.navigate('Auth'));
        navigation.navigate('Main');
      } else {
        navigation.navigate('Auth');
      }
    } else {
      navigation.navigate('Auth');
    }
  };

  React.useEffect(() => {
    _bootstrapAsync();
  }, []);

  return (
    <View>
      <CenterSpinner />
    </View>
  );
}

export default AuthLoadingScreen;