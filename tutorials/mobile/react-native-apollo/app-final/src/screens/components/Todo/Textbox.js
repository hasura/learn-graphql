import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {FETCH_TODOS} from './Todos';

const INSERT_TODO = gql`
  mutation ($text: String!, $isPublic: Boolean){
    insert_todos (
      objects: [{
        title: $text,
        is_public: $isPublic
      }]
    ){
      returning {
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
  }
`;

const Textbox = ({ isPublic }) => {

  const [text, setText] = React.useState('');

  const [insertTodo, { loading, error }] = useMutation(INSERT_TODO);

  const updateCache = (client, {data: {insert_todos}}) => {
    const data = client.readQuery({
      query: FETCH_TODOS,
      variables: {
        isPublic,
      }
    });
    const newTodo = insert_todos.returning[0];
    const newData = {
      todos: [ newTodo, ...data.todos]
    }
    client.writeQuery({
      query: FETCH_TODOS,
      variables: {
        isPublic,
      },
      data: newData
    });
  }

  const submit = () => {
    setText('');
    insertTodo({
      variables: { text, isPublic },
      update: updateCache
    });
  }

  return (
    <View style={styles.inputContainer}>
      <View style={styles.textboxContainer}>
        <TextInput
          style={styles.textbox}
          editable = {true}
          onChangeText = {setText}
          value = {text}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={submit} disabled={text === ''}>
          <Text style={styles.buttonText}> Add </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  inputContainer: {
    flex: 0.1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textbox: {
    flex: 1,
    padding: 10,
  },
  textboxContainer: {
    flex: 0.8,
    borderWidth: 0.5,
    paddingRight: 10,
    borderColor: '#d6d7da',
    borderRadius: 5,
  },
  buttonContainer: {
    flex: 0.2,
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39235A',
    borderColor: '#d6d7da',
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white'
  }
});

export default Textbox;