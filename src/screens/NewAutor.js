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
import { setAutorField, saveAutorPost, setAutorAllFields, resetAutorForm } from '../redux/actions';

const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

class NewAutor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isCamera: false,
      isCameraRoll: false,
    }
  }

  componentDidMount() {

    const { route, setAutorAllFields, resetAutorForm } = this.props;
    const { params } = route;
    if (params && params.autor) {
      setAutorAllFields(params.autor)
    } else {
      resetAutorForm();
    }
  }

  viewForm() {
    const { autorForm, setAutorField, saveAutorPost, navigation } = this.props;

    return (
      <ScrollView>
        <FormRow>
          <TextInput
            style={[styles.textinput]}
            placeholder="Nome"
            value={autorForm.nome}
            onChangeText={value => setAutorField('nome', value)}
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
                  await saveAutorPost(autorForm);
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
    autorForm: state.autorForm
  })
}

const mapDispatchToProps = {
  setAutorField,
  saveAutorPost,
  setAutorAllFields,
  resetAutorForm
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAutor);