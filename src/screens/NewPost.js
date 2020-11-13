import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';

// import { RNCamera } from 'react-native-camera';
// import CameraRollPicker from 'react-native-camera-roll-picker';
// import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-picker';
import FormRow from '../components/FormRow';
import { connect } from 'react-redux';
import { setField, savePost, setAllFields, resetForm } from '../redux/actions';

const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

class NewPost extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isCamera: false,
      isCameraRoll: false,
    }
  }

  componentDidMount() {

    const { route, setAllFields, resetForm } = this.props;
    const { params } = route;
    if (params && params.post) {
      setAllFields(params.post)
    } else {
      resetForm();
    }
  }

  chooseImage = () => {
    let options = {
      title: 'Selecione uma imagem',
      quality: 0.5,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        // console.log('response', JSON.stringify(response));
        this.props.setField('img', response.data);
      }
    });
  }


  viewForm() {
    const { postForm, setField, savePost, navigation } = this.props;

    return (
      <ScrollView>
        <FormRow>
          {
            postForm.img ?
              (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${postForm.img}` }}
                  style={styles.img}
                />
              ) :
              (
                <Image
                  source={require('../assets/noimage.jpg')}
                  style={styles.img}
                />
              )
          }
          <View style={{ paddingTop: 5 }}>
            <Button
              title='Selecionar imagem'
              onPress={() => {
                this.chooseImage()
              }} />
          </View>
        </FormRow>
        <FormRow>
          <TextInput
            style={styles.textinput}
            placeholder="Título"
            value={postForm.title}
            onChangeText={value => setField('title', value)}
          />
        </FormRow>
        <FormRow>
          <TextInput
            style={[styles.textinput, { paddingTop: 15, height: 180 }]}
            placeholder="Corpo"
            value={postForm.body}
            onChangeText={value => setField('body', value)}
            numberOfLines={5}
            multiline={true}
          />
        </FormRow>

        {
          this.state.isLoading ?
            <ActivityIndicator size="small" color="#0000ff" />
            :
            <Button
              title="Salvar"
              onPress={async () => {
                this.setState({ isLoading: true })

                try {
                  await savePost(postForm);
                  navigation.goBack();
                } catch (error) {
                  Alert.alert('Erro', error.message);
                } finally {
                  this.setState({ isLoading: false })
                }

              }} />
        }
      </ScrollView>
    );
  }

  render() {
    return (this.viewForm())
  }
}

const styles = StyleSheet.create({
  textinput: {
    padding: 15,
    borderRadius: 5,
    borderWidth: .5
  },
  img: {
    resizeMode: "cover",
    width: '100%',
    height: 280
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

const mapStateToProps = (state) => {
  return ({
    postForm: state.postForm
  })
}

const mapDispatchToProps = {
  setField,
  savePost,
  setAllFields,
  resetForm
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);