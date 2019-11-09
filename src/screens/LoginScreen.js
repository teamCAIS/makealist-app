import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  TextInput,
  Button,
  Checkbox,
  Caption,
  HelperText,
} from 'react-native-paper';

import AsyncStorage from '@react-native-community/async-storage';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [checked, setChecked] = useState(false);

  const validate = () => {
    const EmailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailIsValid = EmailValidation.test(email);
    const passwordIsValid = password.length > 8 ? true : false;
    return {
      email: emailIsValid,
      password: passwordIsValid,
    };
  };

  const handleLogin = async () => {
    const validation = await validate();

    if (!validation.email) {
      return setEmailError(true);
    } else if (!validation.password) {
      return setPasswordError(true);
    }

    let payload = {
      email,
      password,
    };

    await AsyncStorage.setItem('user', JSON.stringify(payload));

    return navigation.navigate('App');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <View style={styles.container}>
        <View>
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: 'https://i.ibb.co/HFYCYrn/24912.jpg',
              }}
              style={styles.logo}
            />
            <Caption style={styles.logoText}>Make A List</Caption>
          </View>
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onFocus={() => setEmailError(false)}
            onChangeText={text => setEmail(text)}
            style={styles.textInput}
          />
          <HelperText type="error" visible={emailError}>
            E-mail inválido!
          </HelperText>
          <TextInput
            label="Senha"
            mode="outlined"
            value={password}
            secureTextEntry={!checked}
            onFocus={() => setPasswordError(false)}
            onChangeText={text => setPassword(text)}
            style={styles.textInput}
          />
          <HelperText type="error" visible={passwordError}>
            Senha inválida!
          </HelperText>
          <View style={styles.checkboxContainer}>
            <Checkbox.Android
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)}
              color="#F05A5B"
            />
            <TouchableOpacity onPress={() => setChecked(!checked)}>
              <Caption style={styles.checkboxText}>Mostrar a senha</Caption>
            </TouchableOpacity>
          </View>
          <Button
            mode="contained"
            onPress={() => handleLogin()}
            labelStyle={{color: 'white'}}
            style={styles.topMargin}>
            Entrar
          </Button>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.registerButton}>
            <Caption>Desejo me cadastrar</Caption>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
    backgroundColor: '#f8f8f8',
    justifyContent: 'space-around',
  },
  logoContainer: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    marginTop: 8,
    fontSize: 16,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  textInput: {
    backgroundColor: 'white',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkboxText: {
    marginLeft: 4,
    fontSize: 14,
  },
  topMargin: {
    marginTop: 16,
  },
  registerButton: {
    alignSelf: 'center',
  },
});
