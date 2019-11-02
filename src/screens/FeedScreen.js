import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet} from 'react-native';
import {FAB, Caption} from 'react-native-paper';

import Card from '../components/Card';

export default function FeedScreen() {
  const data = [
    {
      user: {
        name: 'Caio Nunes',
        profile_photo: 'https://api.adorable.io/avatars/285/caionunes.png',
      },
      title: 'Coisas que não suporto mais no SMD',
      date: 'Há 12 dias',
      category: 'Educação',
      likes: 5,
      comments: 10,
      data: [
        {
          order: 1,
          description: 'Aula com o Paulo',
        },
        {
          order: 2,
          description: 'Aula com a Ticiana',
        },
        {
          order: 3,
          description: 'Aulas',
        },
      ],
    },
    {
      user: {
        name: 'Ulisses Lopes',
        profile_photo: 'https://api.adorable.io/avatars/285/ulisseslopes.png',
      },
      title: 'Piadas ruins',
      date: 'Há 13 dias',
      category: 'Humor',
      likes: 120,
      comments: 20,
      data: [
        {
          order: 1,
          description: 'Pintas com meu pinto ?',
        },
        {
          order: 2,
          description: 'Gosta de mamão ? Pois toma uma mão',
        },
        {
          order: 3,
          description: 'Conhece a do pintinho ? Não ? Piu',
        },
        {
          order: 4,
          description: 'Trade-Off',
        },
        {
          order: 5,
          description: 'Caneta azul',
        },
      ],
    },
    {
      user: {
        name: 'Natã Raulino',
        profile_photo: 'https://api.adorable.io/avatars/285/nataraulino.png',
      },
      title: 'Soundtracks',
      date: 'Há 14 dias',
      category: 'Música',
      likes: 10,
      comments: 20,
      data: [
        {
          order: null,
          description: 'Soundtrack 1',
        },
        {
          order: null,
          description: 'Soundtrack 2',
        },
      ],
    },
  ];

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `card${index}`}
          renderItem={({item, index}) =>
            index !== data.length - 1 ? (
              <Card list={item} />
            ) : (
              <View>
                <Card list={item} />
                <Caption style={styles.noMoreListsText}>
                  Sem mais atualizações
                </Caption>
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
        />
        <FAB style={styles.fab} icon="playlist-plus" onPress={() => null} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    height: '100%',
    width: '100%',
    paddingHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  noMoreListsText: {
    marginVertical: 32,
    textAlign: 'center',
  },
});
