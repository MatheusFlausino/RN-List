import * as React from 'react';
import 'react-native-gesture-handler';

import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AutoresPage from './src/screens/AutoresPage';
import PostPage from './src/screens/PostPage';
import PostDetail from './src/screens/PostDetail';
import Login from './src/screens/Login';

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
          name="Login"
          component={Login}
          options={{
            // Customização do Headers (https://reactnavigation.org/docs/stack-navigator/#headershown)
            // removendo o headers na tela de login
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Main"
          component={AutoresPage}
          options={({ navigation }) => ({
            title: 'Autores',
            headerLeft: null, // Removendo o botão de voltar para o Login (https://reactnavigation.org/docs/header-buttons/)
            // Adicionando botão de sair que envia para a tela de login (https://reactnavigation.org/docs/header-buttons/)
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Login')}
                title="Sair"
                color="#fff"
              />
            ),
            // Customização do Headers (https://reactnavigation.org/docs/headers/)
            headerTintColor: '#fff', // Mudando a cor dos titulos
            headerStyle: {
              // Mudando a cor do headers
              backgroundColor: '#003994',
            },
          })}
        />
        <Stack.Screen
          name="PostPage"
          component={PostPage}
          options={{
            // Customização do Headers (https://reactnavigation.org/docs/headers/)
            title: 'Posts',
            headerTintColor: '#fff', // Mudando a cor dos titulos
            headerStyle: {
              // Mudando a cor do headers
              backgroundColor: '#f4511e',
            },
          }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetail}
          options={{
            // Customização do Headers (https://reactnavigation.org/docs/headers/)
            title: 'Post',
            headerTintColor: '#fff', // Mudando a cor dos titulos
            headerStyle: {
              // Mudando a cor do headers
              backgroundColor: '#f4511e',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;