import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [birthday, setBirthDay] = useState(new Date());
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
        <TextInput
          label="Nome"
          placeholder="Digite seu nome"
          placeholderTextColor="#ddd"
          value={name}
          onChangeText={setName}
          style={{marginVertical: 8, backgroundColor: 'white'}}
          mode="outlined"
        />
        <TextInput
          label="Email"
          placeholder="Digite seu email"
          placeholderTextColor="#ddd"
          value={email}
          onChangeText={setEmail}
          style={{marginVertical: 8, backgroundColor: 'white'}}
          mode="outlined"
        />
        <TextInput
          label="Senha"
          placeholder="Digite sua senha"
          placeholderTextColor="#ddd"
          value={password}
          onChangeText={setPassword}
          style={{marginVertical: 8, backgroundColor: 'white'}}
          mode="outlined"
        />
        <TextInput
          label="Confirmação de senha"
          placeholder="Repita a senha anterior"
          placeholderTextColor="#ddd"
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          style={{marginVertical: 8, backgroundColor: 'white'}}
          mode="outlined"
        />
        <TouchableOpacity
          onPress={() => open()}
          style={{
            backgroundColor: 'white',
            borderColor: '#777',
            borderWidth: 1,
            height: 60,
            paddingHorizontal: 16,
            marginTop: 16,
            justifyContent: 'center',
          }}>
          <Text style={{color: '#777', fontSize: 14}}>
            {birthday.toLocaleString()}
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
