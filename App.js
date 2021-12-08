import React from 'react';
import TodoList from './src/screens/TodoList/TodoList';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddTodo from './src/screens/AddTodo/AddTodo';
import * as Sentry from '@sentry/react-native';
import {Integrations as TracingIntegrations} from '@sentry/tracing';
import EditTodo from './src/screens/EditTodo/EditTodo';

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: 'https://bfbe34ad8b714f1e8ab3c3769af63233:3a29c6d6578211ec96e8aab8e73caebe@o1085866.ingest.sentry.io/6097286',

  integrations: [
    new TracingIntegrations.BrowserTracing(),
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],

  tracesSampleRate: 1,
});

const App = () => {
  const Stack = createNativeStackNavigator();
  const navigation = React.useRef();

  return (
    <NavigationContainer
      ref={navigation}
      onReady={() => {
        // Register the navigation container with the instrumentation
        routingInstrumentation.registerNavigationContainer(navigation);
      }}>
      <Stack.Navigator>
        <Stack.Screen name="TodoList" component={TodoList} />
        <Stack.Screen name="AddTodo" component={AddTodo} />
        <Stack.Screen name="EditTodo" component={EditTodo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Sentry.wrap(App);
