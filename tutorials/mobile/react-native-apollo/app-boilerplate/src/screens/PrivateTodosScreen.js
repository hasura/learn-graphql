import React from 'react';
import TodoScreen from './TodoScreen';
import MenuButton from './components/Util/MenuButton';

const PrivateTodos = () => {
  // return TodoScreen with prop isPublic as false
  return (
    <TodoScreen isPublic={false}/> 
  );
}

PrivateTodos.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Private Todos',
  headerLeft: (
    <MenuButton onPress={navigation.toggleDrawer} /> 
  )
});

export default PrivateTodos;