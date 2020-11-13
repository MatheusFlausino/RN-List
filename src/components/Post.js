import React from 'react';
import { ScrollView, Text, StyleSheet, View, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// const Line = ({ title, body }) => {
class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    }
  }

  componentWillUnmount() {
    this.state.isExpanded = false;
  }

  changeIsExpanded() {
    const { isExpanded } = this.state;
    this.setState({
      isExpanded: !isExpanded
    })
  }

  render() {
    const { title = "", body = "-", img = null } = this.props;
    const { isExpanded } = this.state;

    return (
      // Utilizei uma scrollview  para que posso rolar a página
      <ScrollView style={styles.container}>
        {
          img ?
            <Image
              // source={{ uri: post.img }}
              source={{ uri: `data:image/jpeg;base64,${img}` }}
              style={styles.img}
              resizeMode="cover"
            /> :
            <Image
              source={require('../assets/noimage.jpg')}
              style={styles.img}
            />
        }
        <Text style={styles.title}>{title}</Text>
        <TouchableWithoutFeedback onPress={() => this.changeIsExpanded()}>
          <View>
            {/*
              LongText
              Usando implementação de numero de linhas para ser visualizada, quando for clicado passa 0 o que faz exibir todo o texto
              ellipsizeMode=tail é para aparecer no fim do texto os 3 pontos quando necessário 
            */}
            <Text
              numberOfLines={!isExpanded ? 4 : 0}
              ellipsizeMode='tail'
              style={[
                styles.body,
                // isExpanded ? styles.expanded : styles.collapsed
              ]}>
              {body}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
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
  },
  img: {
    width: '100%',
    height: 280
  }
});

export default Post;