import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {api} from '../../apis';
import TodoItem from './components/TodoItem';
import * as Sentry from '@sentry/react-native';
import {SpanStatus} from '@sentry/tracing';

const TodoList = ({navigation}) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Sentry.nativeCrash(); // TODO: fake issue

    const transaction = Sentry.startTransaction({
      name: 'Get TodoList form server',
    });
    Sentry.getCurrentHub().configureScope(scope => scope.setSpan(transaction));
    const span = transaction.startChild({
      op: 'task',
      description: `processing todo list result`,
    });

    api
      .getTodoList()
      .then(data => {
        setTodos(data.data);
        span.setStatus(SpanStatus.Ok);
        //throw new Error('Test Sentry error!'); // TODO: fake error
      })
      .catch(error => {
        console.log('Api call error', error);
        span.setStatus(SpanStatus.UnknownError);
      })
      .finally(() => {
        span.finish();
        transaction.finish();
      });
  }, []);

  const UpdateTodoItem = todo => {
    todo.done = !todo.done;
    api
      .updateTodo(todo)
      .then(_ => {
        todos.splice(
          todos.findIndex(item => item.id === todo.id),
          1,
        );
        todos.push(todo);
        setTodos([...todos]);
      })
      .catch(error => {
        throw new Error('Api UpdateTodo error: ', error);
      });
  };

  const DeleteTodoItem = idTodo => {
    if (!idTodo) return;
    api
      .deleteTodo(idTodo)
      .then(_ => {
        todos.splice(
          todos.findIndex(item => item.id === idTodo),
          1,
        );
        setTodos([...todos]);
      })
      .catch(error => {
        throw new Error('Api DeleteTodo error: ', error);
      });
  };

  const EditTodoItem = idTodo => {
    navigation.navigate('EditTodo', {idTodo: idTodo});
  };

  return (
    <View style={{flex: 1, marginVertical: 10}}>
      <Button title="Add Todo" onPress={() => navigation.navigate('AddTodo')} />
      <Text style={{textAlign: 'center', fontSize: 20}}>Task</Text>
      <FlatList
        data={todos.filter(item => !item.done)}
        renderItem={item => (
          <TodoItem
            item={item.item}
            onPress={() => UpdateTodoItem(item.item)}
            deleteTodo={() => DeleteTodoItem(item.item?.id)}
            editTodo={() => EditTodoItem(item.item?.id)}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No data</Text>}
      />
      <Text style={{textAlign: 'center', fontSize: 20}}>Done</Text>
      <FlatList
        data={todos.filter(item => item.done)}
        renderItem={item => (
          <TodoItem
            item={item.item}
            onPress={() => UpdateTodoItem(item.item)}
            deleteTodo={() => DeleteTodoItem(item.item?.id)}
            editTodo={() => EditTodoItem(item.item?.id)}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default TodoList;
