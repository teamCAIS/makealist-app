import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Card from '../Card';
import {Caption} from 'react-native-paper';

export default function MyLists({navigation}) {
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
  ];

  return (
    <View style={styles.container}>
      {data.map((item, index) =>
        index !== data.length - 1 ? (
          <Card
            key={`my-list-card-item${index}`}
            list={item}
            navigation={navigation}
          />
        ) : (
          <View key={`my-list-card-item${index}`}>
            <Card list={item} navigation={navigation} />
            <Caption style={styles.noMoreListsText}>
              Sem mais atualizações
            </Caption>
          </View>
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noMoreListsText: {
    marginVertical: 32,
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 16,
  },
});
