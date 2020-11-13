import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Post from '../components/Post'
import axios from 'axios';
import { deleteDataPost, deleteDataAutor, deleteDataComment } from '../redux/actions';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

class PostDetail extends Component {
  constructor(props) {
    super(props);

    // state das sanfonas do autor e do comentario
    this.state = {
      openAutor: false,
      openComentario: false,
    };
  }


  render() {
    const { params } = this.props.route;
    const { openAutor, openComentario } = this.state
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button
            title="Excluir"
            color="#FF0004"
            onPress={async () => {
              const hasDeleted = await this.props.deleteDataPost(params.post)
              if (hasDeleted) {
                this.props.navigation.goBack();
              }
            }}
          />
          <Button
            title="Editar"
            onPress={() => {
              this.props.navigation.replace('NewPost', { post: params.post });
            }}
          />
        </View>
        <Post
          title={params.post?.title}
          body={params.post?.body}
          img={params.post?.img}
        />

        <ScrollView style={{ height: 130, backgroundColor: '#bdc3c7', paddingTop: 10 }}>

          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-around" }}
              onPress={() => {
                this.setState({
                  openAutor: !openAutor
                })
              }}>
              <Text>{openAutor ? ' ▼' : ' ▲'} Autores</Text>
              <Button
                title="Adicionar"
                onPress={() => {
                  this.props.navigation.replace('NewAutor', { autor: { postId: params.post.id } });
                }}
              />
            </TouchableOpacity>
            {
              openAutor && params.post?.autor?.map((autor, index) => (
                <View
                  key={index}
                  style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-around", borderTopWidth: (!index ? .5 : 0), borderBottomWidth: .5 }}
                >
                  <Text>{autor.nome}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Button
                      title="Editar"
                      onPress={() => {
                        this.props.navigation.replace('NewAutor', { autor: { ...autor, postId: params.post.id } });
                      }}
                    />
                    <Button
                      title="Excluir"
                      onPress={async () => {
                        await this.props.deleteDataAutor({ ...autor, postId: params.post.id });
                      }}
                    />
                  </View>
                </View>

              ))
            }
          </View>

          <View style={{ marginBottom: 10 }}>

            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-around" }}
              onPress={() => {
                this.setState({
                  openComentario: !openComentario
                })
              }}>
              <Text>{openComentario ? ' ▼' : ' ▲'} Comentários</Text>
              <Button
                title="Adicionar"
                onPress={() => {
                  this.props.navigation.replace('NewComment', { comentario: { postId: params.post.id } });
                }}
              />
            </TouchableOpacity>
            {
              openComentario && params.post?.comentario?.map((comentario, index) => (
                <View
                  key={index}
                  style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-around", borderTopWidth: .5, borderBottomWidth: .5 }}
                >
                  <Text
                    style={{ width: '50%' }}
                    numberOfLines={1} // Numero de linhas que será exibido, limitando em 1 linha
                    ellipsizeMode="tail" // propriedade que coloca reticências no final da frase se acabar espaço da linha
                  >{comentario.comentario}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Button
                      title="Editar"
                      onPress={() => {
                        this.props.navigation.replace('NewComment', { comentario: { ...comentario, postId: params.post.id } });
                      }}
                    />
                    <Button
                      title="Excluir"
                      onPress={async () => {
                        await this.props.deleteDataComment({ ...comentario, postId: params.post.id });
                      }}
                    />
                  </View>
                </View>

              ))
            }
          </View>

        </ScrollView>
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

export default connect(null, { deleteDataPost, deleteDataAutor, deleteDataComment })(PostDetail);
