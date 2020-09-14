import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Post from '../components/Post'
import axios from 'axios';

export default class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {}, // variavel que armazena o post
      loading: false,
      error: false,
    };
  }


  componentDidMount() {
    this.setState({ loading: true });
    // Usei um banco de dados Fake, JSON PLACEHLDER. https://jsonplaceholder.typicode.com/
    // Axios é um client que faz requisições http
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${this.props.route?.params?.post || -1}`)
      .then(response => {
        // Essa API não retorna erros então eu verifico se veio o item com id
        // Se nào veio o item com id atribuo erro
        if (response.data.id) {
          this.setState({
            post: response.data,
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
              <Text style={styles.error}>Post não encontrado 🙃</Text>
              :
              // Componente de baixo é o post por inteiro
              // os tres pontos é para copiar o conteudo do post como propriedade no componente e chama-se Spread (https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator) 
              // é a mesma coisa que <Post title={this.state.post.title} body={this.state.post.body} />
              <Post {...this.state.post} />
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
    color: 'red',
    alignSelf: 'center'
  }
})