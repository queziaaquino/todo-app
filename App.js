import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryScreen from './screens/CategoryScreen';
import TodoListScreen from './screens/TodoListScreen';
import LoginScreen from './screens/LoginScreen'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Suas Listas" component={CategoryScreen} />
        <Stack.Screen name="Lista" component={TodoListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
