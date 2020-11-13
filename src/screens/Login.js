import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  Text,
  Alert
} from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { processLogin } from '../redux/actions';

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
      message: "",
    }
  }

  componentDidMount() {

    // Configurações do Firebase que está disponivel no Projeto Criado no site: https://console.firebase.google.com/

    /** REMOVER ESSE COMENTÁRIO ABAIXO
     * 
     * Você tem que mudar as credenciais abaixo.
     * Entra nesse link: https://console.firebase.google.com/
     * Cria um projeto com um nome qualquer, pode ser lista-blog
     * Na tela de getstart clicar no icone de web </> para criar um projeto de web
     * Ao clicar crie um web app com o mesmo nome do projeto e ele te dará as credenciais para vc colocar abaixo
     * 
     * Criando um usuário de teste:
     * Ir em Authentication > Sign-in Method > Email/Password
     * Colocar enable para tudo e salva
     * Voltar Users > Add User. 
     * Criar um usuário com email e senha para vc entrar no App
     * Nesse lugar que estará todos os usuários criados
     */

    var firebaseConfig = {
      apiKey: "AIzaSyCTJQ8V5dkz6b9tuHrgShz8CgfUxcipqs0",
      authDomain: "lista-blog-fc763.firebaseapp.com",
      databaseURL: "https://lista-blog-fc763.firebaseio.com",
      projectId: "lista-blog-fc763",
      storageBucket: "lista-blog-fc763.appspot.com",
      messagingSenderId: "917219246565",
      appId: "1:917219246565:web:bf5e58119fe5daade8ef0c"
    };

    // Verificação se o App do firebase já foi iniciado assim que o app carrega, senão foi inicia
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Verificação se o usuário já está logado
    const { currentUser } = firebase.auth();
    if (currentUser && currentUser.uid && currentUser.email) {
      this.props.navigation.replace('Main');
    }
  }

  onChangeHandler(field, valor) {
    this.setState({
      [field]: valor
    })
  }

  submitLogin() {
    // Inicia o state de loading para parecer que está carregando
    // Limpa a msg de erro que está aparecendo para o usuário
    this.setState({ isLoading: true, message: '' });

    // Pega o email e senha que foi digitado
    const { email, password } = this.state;

    const loginUserFailed = ({ code }) => {
      // Colocando o código do erro na msg de exibição
      this.setState({ message: code });
    }

    // Função do redux para efetuar o login
    this.props.processLogin({ email, password })
      .then(user => {
        if (user) {
          // Navigation replace para não deixar o usuário voltar para a tela de login
          this.props.navigation.replace('Main');
        } else {
          // Caso aconteça algum erro de não retornar usuário para o loading e não exibe msg
          this.setState({
            isLoading: false,
            message: '',
          })
        }
      })
      .catch(loginUserFailed)
      .finally(() => {
        this.setState({ isLoading: false });
      })
  }

  getMessageByError(code) {
    // Verificação dos nomes dos erros para exibir uma msg que o usuário entenda o que está acontecendo
    switch (code) {
      case "auth/user-not-found":
        return "E-mail inexistente.";
      case "auth/wrong-password":
        return "Senha incorreta."
      default:
        return "Erro desconhecido.";
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <FormRow>
          {/* Caixa de texto para digitar o email */}
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            value={this.state.email}
            onChangeText={valor => {
              this.onChangeHandler('email', valor)
            }}
          />
        </FormRow>

        <FormRow>
          {/* Caixa de texto para digitar a senha */}
          <TextInput
            style={styles.textInput}
            placeholder="Senha"
            secureTextEntry // Para o input ser de senha precisa dessa propriedade para esconder o que está escrevendo 
            value={this.state.password}
            onChangeText={valor => {
              this.onChangeHandler('password', valor)
            }}
          />
        </FormRow>

        {
          // Renderização condicional
          // quando o state de message estiver vazio não aparece nenhuma msg
          // quando o state de message não estiver vazio irá aparecer a msg de erro em vermelho
          !this.state.message ? null :
            <View>
              <Text style={styles.msg}>{this.getMessageByError(this.state.message)}</Text>
            </View>
        }

        {
          // Renderização condicional
          // quando o state de loading estiver TRUE irá aparecer o icone de carregando na tela
          // quando o state de loading estiver FALSE irá aparecer o botão de Entrar no app
          // Quando o botão é clicado ele executa a função de submitLogin
          this.state.isLoading ?
            <ActivityIndicator /> :
            <Button
              title='Entrar'
              onPress={() => this.submitLogin()}
            />
        }
      </View>
    );
  }
}

// Conexão da Action do Login com a tela de Login
export default connect(null, { processLogin })(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 30,
    marginBottom: 20
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 16
  },
  msg: {
    color: 'red'
  }
});