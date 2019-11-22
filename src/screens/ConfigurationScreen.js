import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text, Title, Caption, Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const mapStateToProps = state => ({
  id: state.id,
  username: state.name,
  userEmail: state.email,
});

const mapDispatchToProps = dispatch => ({});

const Configuration = ({username, userEmail, id}) => {
  const [name, setName] = useState(username);
  const [email, setEmail] = useState(userEmail);
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
        <Caption>{email}</Caption>
      </View>
      <TextInput
        label="Nome"
        placeholder="Digite seu nome"
        placeholderTextColor="#ddd"
        value={name}
        onChangeText={setName}
        style={{marginVertical: 8, backgroundColor: 'white'}}
        mode="flat"
      />
      <TextInput
        label="Email"
        placeholder="Digite seu nome"
        placeholderTextColor="#ddd"
        value={email}
        onChangeText={setEmail}
        style={{marginVertical: 8, backgroundColor: 'white'}}
        mode="flat"
      />
      <TouchableOpacity style={styles.configurationOption}>
        <Text style={styles.configurationText}>Alterar senha</Text>
        <Icon name="ios-arrow-forward" size={18} color="#212121" />
      </TouchableOpacity>
      <Button mode="contained" style={{marginTop: 16}}>
        Salvar alterações
      </Button>
      <Button mode="text">Apagar conta</Button>
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
    marginTop: 32,
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
