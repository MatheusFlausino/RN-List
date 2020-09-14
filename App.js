import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AutoresPage from './src/screens/AutoresPage';
import PostPage from './src/screens/PostPage';
import PostDetail from './src/screens/PostDetail';

const Stack = createStackNavigator();


function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerTitleStyle={{
          color: 'white',
          fontSize: 30,
          flexGrow: 1,
          textAlign: 'center'
        }}
        headerStyle={{
          backgroundColor: '#6ca2f7',
          borderBottomWidth: 1,
          borderBottomColor: '#C5C5C5'
        }}
      >
        <Stack.Screen
          name="Main"
          component={AutoresPage}
          options={{ title: 'Autores' }}
        />
        <Stack.Screen
          name="PostPage"
          component={PostPage}
          options={{ title: 'Posts' }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetail}
          options={{ title: 'Post' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;