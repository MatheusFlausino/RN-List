import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const Line = ({ title, body }) => {
  // A cima tem uma desestruturação das propiedades
  // Pegando somente os itens necessários
  return (
    // Utilizei uma scrollview  para que posso rolar a página
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {/* Bodys abaixo para ter scroll na página */}
      <Text style={styles.body}>{body}</Text>
      <Text style={styles.body}>{body}</Text>
      <Text style={styles.body}>{body}</Text>
      <Text style={styles.body}>{body}</Text>
    </ScrollView>
  );
}

// Aqui tem o estilo da página, a parte de flex que é pedido
const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'column',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40
  },
  body: {
    fontSize: 18,
    paddingBottom: 15,
    textAlign: "justify"
  }
});

export default Line;