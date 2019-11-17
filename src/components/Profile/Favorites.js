import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Caption} from 'react-native-paper';
import Card from '../Card';

export default function Favorites({navigation}) {
  const data = [
    {
      user: {
        name: 'Samuelitos 3D',
        profile_photo: 'https://api.adorable.io/avatars/285/Samuelitos3D.png',
      },
      title: 'Coisas que eu amo no 3D',
      date: 'Há 5 dias',
      category: '3D',
      likes: 29,
      comments: 10,
      data: [
        {
          order: 1,
          description: 'O dinheiro que dá',
        },
        {
          order: 2,
          description: 'Fazer uns lances maneiros',
        },
        {
          order: 3,
          description: 'Vou ser mt rico',
        },
        {
          order: 4,
          description: 'Acho que é so isso msm',
        },
        {
          order: 5,
          description: 'Flw',
        },
      ],
    },
    {
      user: {
        name: 'Lecos Lepos',
        profile_photo: 'https://api.adorable.io/avatars/285/LecosLepos.png',
      },
      title: 'Fontes preferidas',
      date: 'Há 7 dias',
      category: 'Design',
      likes: 5,
      comments: 10,
      data: [
        {
          order: 1,
          description: 'Monteserrat',
        },
        {
          order: 2,
          description: 'Raleway',
        },
        {
          order: 3,
          description: 'Roboto',
        },
        {
          order: 4,
          description: 'Arial',
        },
        {
          order: 5,
          description: 'Comic Sans',
        },
        {
          order: 6,
          description: 'Montserrat',
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
            favorite={true}
            navigation={navigation}
          />
        ) : (
          <View key={`my-list-card-item${index}`}>
            <Card list={item} favorite={true} navigation={navigation} />
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
