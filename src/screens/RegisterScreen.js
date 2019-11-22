import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Snackbar,
  HelperText,
  Checkbox,
  Caption,
} from 'react-native-paper';
import {validate} from '../services/utils';
import {userRegister} from '../actions/index';
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => ({
  register: payload => dispatch(userRegister(payload)),
});

const Register = ({register}) => {
  // moment.locale('pt-br');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [checked, setChecked] = useState(false);

  const [isEmailNotValid, setIsEmailNotValid] = useState(false);
  const [isPasswordNotValid, setIsPasswordNotValid] = useState(false);
  const [
    isPasswordConfirmationNotValid,
    setIsPasswordConfirmationNotValid,
  ] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async () => {
    const validation = await validate(email, password, passwordConfirmation);

    if (!validation.email) {
      return setIsEmailNotValid(true);
    } else if (!validation.password) {
      return setIsPasswordNotValid(true);
    } else if (!validation.passwordConfirmation) {
      return setIsPasswordConfirmationNotValid(true);
    }

    let payload = {
      name,
      email: email.toLowerCase(),
      password,
    };

    const result = await register(payload);

    if (result !== true) {
      return setEmailAlreadyExists(true);
    }

    return setRegistrationSuccess(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Text style={{color: '#757575', fontSize: 14}}>
          Precisamos de algumas informações para criarmos o seu perfil.
        </Text>
        <TextInput
          label="Nome"
          placeholder="Digite seu nome"
          placeholderTextColor="#ddd"
          value={name}
          autoCompleteType="off"
          onChangeText={setName}
          style={{marginVertical: 8, backgroundColor: 'white'}}
          mode="flat"
        />
        <TextInput
          label="Email"
          placeholder="Digite seu email"
          placeholderTextColor="#ddd"
          value={email}
          autoCompleteType="off"
          keyboardType="email-address"
          onFocus={() => setIsEmailNotValid(false)}
          onChangeText={setEmail}
          style={{marginVertical: 8, backgroundColor: 'white'}}
          mode="flat"
        />
        <HelperText type="error" visible={isEmailNotValid}>
          E-mail inválido!
        </HelperText>
        <Text
          style={{
            color: '#757575',
            fontSize: 14,
            marginVertical: 8,
          }}>
          Digite uma senha de 8 dígitos
        </Text>
        <TextInput
          label="Senha"
          placeholder="Digite sua senha"
          placeholderTextColor="#ddd"
          value={password}
          secureTextEntry={!checked}
          onFocus={() => setIsPasswordNotValid(false)}
          onChangeText={setPassword}
          style={{backgroundColor: 'white'}}
          mode="flat"
        />
        {isPasswordNotValid && (
          <HelperText type="error" visible={isPasswordNotValid}>
            A senha deve conter 8 dígitos!
          </HelperText>
        )}
        <TextInput
          label="Confirmação de senha"
          placeholder="Repita a senha anterior"
          placeholderTextColor="#ddd"
          value={passwordConfirmation}
          secureTextEntry={!checked}
          onFocus={() => setIsPasswordConfirmationNotValid(false)}
          onChangeText={setPasswordConfirmation}
          style={{marginVertical: 8, backgroundColor: 'white'}}
          mode="flat"
        />
        {isPasswordConfirmationNotValid && (
          <HelperText type="error" visible={isPasswordConfirmationNotValid}>
            As senhas estão diferentes!
          </HelperText>
        )}
        <View style={styles.checkboxContainer}>
          <Checkbox.Android
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
            color="#512DA8"
          />
          <TouchableOpacity onPress={() => setChecked(!checked)}>
            <Caption style={styles.checkboxText}>Mostrar a senha</Caption>
          </TouchableOpacity>
        </View>

        <Snackbar
          visible={emailAlreadyExists}
          onDismiss={() => setEmailAlreadyExists(false)}>
          Este email já está cadastrado!
        </Snackbar>
        <Snackbar
          visible={registrationSuccess}
          onDismiss={() => setRegistrationSuccess(false)}>
          Cadastro realizado com sucesso! Você já pode logar na sua conta.
        </Snackbar>

        <Button
          mode="contained"
          onPress={() => handleSubmit()}
          labelStyle={{color: 'white'}}
          style={{marginTop: 16}}>
          Enviar
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const RegisterScreen = connect(null, mapDispatchToProps)(Register);
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
    backgroundColor: '#f8f8f8',
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
});
