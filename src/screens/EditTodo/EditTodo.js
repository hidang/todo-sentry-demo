import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {api} from '../../apis';

const EditTodo = ({route, navigation}) => {
  const {idTodo} = route.params;
  const [todo, setTodo] = useState();
  const [nameTodo, setNameTodo] = useState('');

  useEffect(() => {
    api.getTodo(idTodo).then(todo => {
      setTodo(todo.data);
      setNameTodo(todo.data.name);
    });
  }, [idTodo]);

  const handleUpdateTodo = () => {
    todo.name = nameTodo;
    api.updateTodo(todo).then(_ => {
      navigation.navigate('TodoList');
    });
  };

  return (
    <View>
      <Text>EditTodo: {idTodo}</Text>
      <TextInput onChangeText={setNameTodo} value={nameTodo} />
      <Button title="Update Todo" onPress={() => handleUpdateTodo()} />
    </View>
  );
};

export default EditTodo;
