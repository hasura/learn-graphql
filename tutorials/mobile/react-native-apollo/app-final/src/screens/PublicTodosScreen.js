import React from 'react';
import TodoScreen from './TodoScreen';
import MenuButton from './components/Util/MenuButton';

const PublicTodos = ({ navigation }) => {
  // return TodoScreen with prop isPublic to true
  return (
    <TodoScreen isPublic={true} navigate={navigation.navigate}/> 
  );
}

PublicTodos.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Public Todos',
  headerLeft: (
    <MenuButton onPress={navigation.toggleDrawer} /> 
  )
});

export default PublicTodos;