import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PeopleListItem = ({ autor, onPress }) => {
  // A cima tem uma desestruturação das propiedades
  // Pegando somente os itens necessários

  // O componente abaixo é 1 item da lista de Autores que exibe o ID, nome, email e possiblita clicar para enviar para outra página
  return (
    // TouchableOpacity é um componente clicavel e assim que clicado executa a função do onPress
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        onPress({ autor: autor.id });
      }}
      style={styles.container}
    >
      <View style={styles.line}>
        <Text style={{ fontSize: 28 }}>{`#${autor.id}`}</Text>
      </View>
      <View style={styles.line}>
        <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 5 }}>{autor.name}</Text>
        <Text style={{ fontSize: 15 }}>{autor.email}</Text>
      </View>
    </TouchableOpacity>
  )
}

// Aqui tem o estilo da página, a parte de flex que é pedido
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
    flexDirection: 'row'
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