import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const PeopleListItem = ({ post, onPress }) => {
  // A cima tem uma desestruturação das propiedades
  // Pegando somente os itens necessários
  
  // O componente abaixo é 1 item da lista de Poste que exibe o ID e o titulo e possiblita clicar para enviar para outra página
  return (
    // TouchableOpacity é um componente clicavel e assim que clicado executa a função do onPress
    <TouchableOpacity
      onPress={() => {
        onPress({ post: post.id });
      }}
      style={styles.container}
    >
      <View style={styles.line}>
        <Text style={{ fontSize: 25 }}>{`#${post.id}`}</Text>
      </View>
      <View style={[styles.line, { width: '100%' }]}>
        <Text
          style={{ fontSize: 15, fontWeight: '600', width: '80%' }} // Estilo inline
          numberOfLines={1} // Numero de linhas que será exibido, limitando em 1 linha
          ellipsizeMode="tail" // propriedade que coloca reticências no final da frase se acabar espaço da linha
        >
          {post.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

// Aqui tem o estilo da página, a parte de flex que é pedido
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
    flexDirection: 'row',
    flex: 1
  },
  line: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 10
  },

});

export default PeopleListItem;