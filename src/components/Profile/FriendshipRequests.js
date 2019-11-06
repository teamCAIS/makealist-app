import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FriendshipCard from '../FriendshipCard';

export default function FriendshipRequests() {
  const usersRequest = [
    {
      name: 'Ulepos do Vopes',
    },
    {
      name: 'Oiac Pones',
    },
  ];

  const users = [
    {
      name: 'Rata Nael',
    },
    {
      name: 'Samuelitos 3D',
    },
    {
      name: 'Lecos Lepos',
    },
    {
      name: 'Seo de Lousa',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>Solicitações</Text>
      <View style={styles.listContainer}>
        {usersRequest.map((item, index) => (
          <View key={`friendship-request-item${index}`}>
            <FriendshipCard
              user={item}
              request={true}
              lastItem={index === usersRequest.length - 1 ? true : false}
            />
          </View>
        ))}
      </View>
      <Text style={styles.sectionLabel}>Lista de amigos</Text>
      <View style={styles.listContainer}>
        {users.map((item, index) => (
          <View key={`friendship-item${index}`}>
            <FriendshipCard
              user={item}
              lastItem={index === users.length - 1 ? true : false}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  sectionLabel: {
    marginVertical: 8,
    color: '#777',
    fontSize: 18,
  },
  listContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
});
