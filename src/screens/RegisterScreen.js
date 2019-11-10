import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import 'moment/locale/pt-br';
import {Text, TextInput, Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterScreen() {
  moment.locale('pt-br');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [birthday, setBirthDay] = useState(new Date('2005/01/01'));
  const [show, setShow] = useState(false);

  const handleDate = (event, date) => {
    date = date || birthday;

    setShow(Platform.OS === 'ios' ? true : false);
    setBirthDay(date);
  };

  const open = () => {
    setShow(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={{color: '#757575', fontSize: 14}}>
          Precisamos de algumas informações para criarmos o seu perfil.
        </Text>
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
          placeholder="Digite seu email"
          placeholderTextColor="#ddd"
          value={email}
          onChangeText={setEmail}
          style={{marginVertical: 8, backgroundColor: 'white'}}
          mode="flat"
        />
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
          onChangeText={setPassword}
          style={{backgroundColor: 'white'}}
          mode="flat"
        />
        <TextInput
          label="Confirmação de senha"
          placeholder="Repita a senha anterior"
          placeholderTextColor="#ddd"
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          style={{marginVertical: 8, backgroundColor: 'white'}}
          mode="flat"
        />
        <Text
          style={{
            color: '#757575',
            fontSize: 14,
            marginVertical: 8,
          }}>
          Insira sua data de nascimento
        </Text>
        <TouchableOpacity
          onPress={() => open()}
          style={{
            backgroundColor: 'white',
            borderBottomColor: '#aaa',
            borderBottomWidth: 1,
            height: 60,
            paddingHorizontal: 16,
            justifyContent: 'center',
          }}>
          <Text style={{color: '#757575', fontSize: 16}}>
            {moment(birthday).format('LL')}
          </Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={birthday}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={handleDate}
            maximumDate={new Date('2005/01/01')}
          />
        )}
        <Button
          mode="contained"
          labelStyle={{color: 'white'}}
          style={{marginTop: 16}}>
          Enviar
        </Button>
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
  },
});
