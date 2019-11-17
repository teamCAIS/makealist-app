import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Headline} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../components/Card';

export default function TrendingScreen({navigation}) {
  const [query, setQuery] = useState('');
  const data = [
    {
      user: {
        name: 'Jorjão Suave',
        profile_photo: 'https://api.adorable.io/avatars/285/jorjaosuave.png',
      },
      title: 'Ideias inovadoras',
      date: 'Ontem',
      category: 'Inovação',
      likes: 5210,
      comments: 8008,
      data: [
        {
          order: 1,
          description: 'Volta do Sandy e Júnior',
        },
        {
          order: 2,
          description: 'Aplicação para acabar a fome',
        },
      ],
    },
  ];
  return (
    <View>
      <View style={styles.header}>
        <TextInput
          placeholder="Digite sua pesquisa"
          placeholderTextColor="#f1f1f1"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          multiline={false}
        />
        <TouchableOpacity style={styles.headerMenu}>
          <Icon name="dots-vertical" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Headline style={styles.whatsNew}>Novos usuários</Headline>
        <View style={styles.newUsersContainer}>
          <TouchableOpacity style={styles.newUserButton}>
            <Image
              source={{
                uri: 'https://api.adorable.io/avatars/285/3.png',
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.newUserButton}>
            <Image
              source={{
                uri: 'https://api.adorable.io/avatars/285/2.png',
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.newUserButton}>
            <Image
              source={{
                uri: 'https://api.adorable.io/avatars/285/1.png',
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        <Headline style={styles.whatsNew}>As mais curtidas</Headline>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `card${index}`}
          renderItem={({item, index}) => (
            <Card list={item} navigation={navigation} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    height: '100%',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  whatsNew: {
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    backgroundColor: '#512DA8',
    right: 0,
    bottom: 0,
  },
  header: {
    width: '100%',
    height: 60,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#512DA8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerMenu: {
    marginLeft: 12,
  },
  searchInput: {
    width: '90%',
    backgroundColor: '#512D91',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    color: 'white',
    paddingLeft: 16,
  },
  newUsersContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    backgroundColor: 'white',
    elevation: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  newUserButton: {
    marginRight: 16,
  },
});
