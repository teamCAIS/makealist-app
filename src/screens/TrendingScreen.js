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
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Card from '../components/Card';

export default function TrendingScreen({navigation}) {
  const [query, setQuery] = useState('');
  const data = [
    {
      user: {
        name: 'Jorjão Suave',
      },
      title: 'Ideias inovadoras',
      date: 'Sat, 23 Nov 2019 00:00:00 GMT',
      category: 'Inovação',
      likes: 5210,
      comments: [],
      items: [
        {
          item_order: 1,
          text: 'Volta do Sandy e Júnior',
        },
        {
          item_order: 2,
          text: 'Aplicação para acabar a fome',
        },
      ],
    },
  ];
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.searchInputContainer}>
          <MIcon name="search" size={24} color="#212121" />
          <TextInput
            placeholder="Digite sua pesquisa"
            placeholderTextColor="#aaa"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            style={styles.searchInput}
            multiline={false}
          />
        </View>
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
  searchInputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  searchInput: {
    color: '#212121',
    paddingLeft: 8,
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
