import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  Text,
  Title,
  Caption,
  Button,
  TextInput,
  Snackbar,
  HelperText,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {userUpdate} from '../actions/index';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const mapStateToProps = state => ({
  id: state.id,
  username: state.name,
  userBio: state.bio,
  userEmail: state.email,
});

const mapDispatchToProps = dispatch => ({
  updateUserAccount: payload => dispatch(userUpdate(payload)),
});

const Configuration = ({
  username,
  userBio,
  userEmail,
  id,
  updateUserAccount,
}) => {
  const [name, setName] = useState(username);
  const [bio, setBio] = useState(userBio);

  const [errorAtUpdate, setErrorAtUpdate] = useState(false);
  const [updateCompleted, setUpdateCompleted] = useState(false);
  const [emptyNameError, setEmptyNameError] = useState(false);

  const [image, setImage] = useState(null);

  const nameToUrl = name.replace(/\s/g, '');

  const randomUrl = `https://api.adorable.io/avatars/285/${nameToUrl}.png`;

  const openImagePicker = () => {
    ImagePicker.openCamera({
      width: 600,
      height: 600,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setImage(image);
    });
  };

  const handleSubmit = async () => {
    let nameNoSpace = name.replace(/\s/g, '');
    if (nameNoSpace === '') return setEmptyNameError(true);

    let payload = {
      id,
      name,
      bio,
    };

    const result = await updateUserAccount(payload);

    if (result.error) return setErrorAtUpdate(true);

    return setUpdateCompleted(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <TouchableOpacity
          style={styles.pictureContainer}
          onPress={() => openImagePicker()}>
          <Image
            source={{
              uri: image
                ? `data:${image.mime};base64,${image.data}`
                : randomUrl,
            }}
            style={styles.picture}
          />
        </TouchableOpacity>
        <Title>{name}</Title>
        <Caption>{userEmail}</Caption>
      </View>
      <TextInput
        label="Nome"
        placeholder="Digite seu nome"
        placeholderTextColor="#ddd"
        value={name}
        onChangeText={setName}
        style={{marginVertical: 8, backgroundColor: 'white'}}
        onFocus={() => setEmptyNameError(false)}
        mode="flat"
      />
      {emptyNameError && (
        <HelperText type="error" visible={emptyNameError}>
          Preencha o campo nome
        </HelperText>
      )}
      <TextInput
        label="Bio"
        placeholder="Digite sua bio"
        placeholderTextColor="#ddd"
        value={bio}
        onChangeText={setBio}
        style={{marginVertical: 8, backgroundColor: 'white'}}
        mode="flat"
      />
      <TouchableOpacity style={styles.configurationOption}>
        <Text style={styles.configurationText}>Alterar senha</Text>
        <Icon name="ios-arrow-forward" size={18} color="#212121" />
      </TouchableOpacity>
      <Button
        mode="contained"
        style={{marginTop: 16}}
        onPress={() => handleSubmit()}>
        Salvar alterações
      </Button>
      <Button mode="text">Apagar conta</Button>
      <Snackbar
        visible={errorAtUpdate}
        onDismiss={() => setErrorAtUpdate(false)}>
        Erro ao salvar suas informações
      </Snackbar>
      <Snackbar
        visible={updateCompleted}
        onDismiss={() => setUpdateCompleted(false)}>
        Informações salvas com sucesso
      </Snackbar>
    </View>
  );
};

const ConfigurationScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Configuration);
export default ConfigurationScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 16,
    backgroundColor: '#f1f1f1',
  },
  containerHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pictureContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#512DA8',
    marginBottom: 8,
    marginTop: 8,
  },
  picture: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },
  configurationOption: {
    backgroundColor: 'white',
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  configurationText: {
    fontSize: 16,
    color: '#212121',
  },
});
