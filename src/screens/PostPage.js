import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import PostListItem from '../components/PostListItem';
import axios from 'axios';

export default class PostPage extends Component {
  constructor(props) {
    super(props);

    // state - são as variáveis que essa tela tem
    this.state = {
      posts: [], // variavel da lista de posts
      loading: false,
      error: false,
    };
  }


  componentDidMount() {
    // Colocando a variavel loading como true para iniciar a requisição
    this.setState({ loading: true });
    // Usei um banco de dados Fake, JSON PLACEHLDER. https://jsonplaceholder.typicode.com/
    // Axios é um client que faz requisições http
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${this.props.route?.params?.autor || -1}/posts`)
      .then(response => {
        // Essa API não retorna erros então eu verifico se veio algum item e coloco nas variaveis
        // Se nào veio nenhum item atribuo erro
        if (response.data?.length) {
          // os tres pontos é para copiar a array para dentro de outro chama-se Spread https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
          // Coloquei uma condição de erro para ele ver a parte condicional
          this.setState({
            posts: [...response.data, { id: -1, title: 'Forçar o erro' }],
            loading: false,
          })
        } else {
          // Quando der erro cancela o loading e atribui erro
          this.setState({
            error: true,
            loading: false,
          })
        }
      }).catch(error => {
        // Quando der erro cancela o loading e atribui erro
        this.setState({
          error: true,
          loading: false,
        })
      });
  }


  render() {
    return (
      <View style={styles.container}>
        {
          // Enquanto o loading for TRUE esse ActivityIndicator fica rodando na tela
          this.state.loading ?
            <ActivityIndicator size="large" color="#CBCBCB" />
            :
            // Quando o loading for cancelado e for atribuido erro aparece essa msg
            this.state.error ?
              <View>
                <Text style={[styles.error, { fontSize: 22 }]}>Posts roubados</Text>
                <Text style={styles.error}>estamos verificando o que aconteceu ...</Text>
              </View>
              :
              // Quando o loading for cancelado e não deu erro aparece essa lista
              // FlatList é um item que renderiza uma lista de elementos
              // No data está a lista dos posts do autor
              // No renderItem do FlatList está o componente de cada item que será exibido
              // Componente esse que contem o ID nome do autor e email
              // O onPress é para quando o item for pressionado enviar para outra tela no caso Ir para o Post
              // O keyExtractor é importante pois o react precisa saber qual item está sendo renderizado então ele serve para colocar um numero e marcar o item
              <FlatList
                data={this.state.posts}
                renderItem={({ item }) => (
                  <PostListItem
                    post={item}
                    onPress={(params) => this.props.navigation.navigate('PostDetail', params)}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
        }
      </View>
    );
  }
}

// Aqui tem o estilo da página, a parte de flex que é pedido
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    fontSize: 18,
    paddingVertical: 10,
    color: 'red',
    alignSelf: 'center',
    textAlign: 'center'
  }
});
