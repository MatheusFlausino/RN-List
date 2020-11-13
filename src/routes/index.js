import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';

import AutoresPage from '../screens/AutoresPage';
import NewPost from '../screens/NewPost';
import NewAutor from '../screens/NewAutor';
import NewComment from '../screens/NewComment';
import PostPage from '../screens/PostPage';
import PostDetail from '../screens/PostDetail';
import Login from '../screens/Login';

import { connect } from 'react-redux';
import { processLogout } from '../redux/actions';

const Stack = createStackNavigator();

function Route({ processLogout }) {
  return (
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
        component={PostPage}
        // component={AutoresPage}
        options={({ navigation }) => ({
          title: 'Posts',
          // title: 'Autores',

          headerLeft: null, // Removendo o botão de voltar para o Login (https://reactnavigation.org/docs/header-buttons/)
          // Adicionando botão de sair que envia para a tela de login (https://reactnavigation.org/docs/header-buttons/)
          headerRight: () => (
            <Button
              onPress={async () => {
                await processLogout()
                navigation.replace('Login')
              }}
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
        name="NewPost"
        component={NewPost}
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
      <Stack.Screen
        name="NewAutor"
        component={NewAutor}
        options={{
          // Customização do Headers (https://reactnavigation.org/docs/headers/)
          title: 'Autor',
          headerTintColor: '#fff', // Mudando a cor dos titulos
          headerStyle: {
            // Mudando a cor do headers
            backgroundColor: '#f4511e',
          },
        }}
      />
      <Stack.Screen
        name="NewComment"
        component={NewComment}
        options={{
          // Customização do Headers (https://reactnavigation.org/docs/headers/)
          title: 'Comentário',
          headerTintColor: '#fff', // Mudando a cor dos titulos
          headerStyle: {
            // Mudando a cor do headers
            backgroundColor: '#f4511e',
          },
        }}
      />
    </Stack.Navigator>
  )
}

export default connect(null, { processLogout })(Route);