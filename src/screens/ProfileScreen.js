import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
// import { Container } from './styles';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    height: '100%',
    width: '100%',
    paddingHorizontal: 16,
  },
});
