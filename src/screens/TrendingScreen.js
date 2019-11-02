import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text, Searchbar} from 'react-native-paper';
import Card from '../components/Card';

export default function TrendingScreen() {
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
});
