import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Componente padrão para todos os inputs de text do login
const FormRow = (props) => {
  // Children - tudo os componentes que vem dentro da tag de FormRow no Login
  const { children } = props;

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    elevation: 1,
  }
});

export default FormRow;