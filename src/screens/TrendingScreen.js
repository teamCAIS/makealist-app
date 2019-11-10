import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text, Searchbar, FAB} from 'react-native-paper';
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
    <View style={styles.container}>
      <Searchbar
        placeholder="Pesquisar"
        onChangeText={query => setQuery(query)}
        value={query}
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => `card${index}`}
        renderItem={({item, index}) => <Card list={item} />}
        showsVerticalScrollIndicator={false}
      />

      <FAB
        style={styles.fab}
        color="white"
        icon="filter"
        onPress={() => navigation.openDrawer()}
      />
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
  fab: {
    position: 'absolute',
    margin: 16,
    backgroundColor: '#512DA8',
    right: 0,
    bottom: 0,
  },
});
