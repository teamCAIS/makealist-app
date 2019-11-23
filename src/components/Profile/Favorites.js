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
      date: 'Fri, 15 Nov 2019 00:00:00 GMT',
      category: '3D',
      likes: 29,
      comments: 10,
      items: [
        {
          item_order: 1,
          text: 'O dinheiro que dá',
        },
        {
          item_order: 2,
          text: 'Fazer uns lances maneiros',
        },
        {
          item_order: 3,
          text: 'Vou ser mt rico',
        },
      ],
    },
    {
      user: {
        name: 'Lecos Lepos',
        profile_photo: 'https://api.adorable.io/avatars/285/LecosLepos.png',
      },
      title: 'Fontes preferidas',
      date: 'Fri, 12 Nov 2019 00:00:00 GMT',
      category: 'Design',
      likes: 5,
      comments: 10,
      items: [
        {
          item_order: 1,
          text: 'Monteserrat',
        },
        {
          item_order: 2,
          text: 'Raleway',
        },
        {
          item_order: 3,
          text: 'Roboto',
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
