import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FriendshipCard({user, request, lastItem}) {
  const nameToUrl = user.name.replace(/\s/g, '');

  return (
    <View style={styles.container}>
      <View
        style={[styles.cardContainer, {borderBottomWidth: lastItem ? 0 : 1}]}>
        <TouchableOpacity
          style={[styles.profile, {width: !request ? '100%' : null}]}>
          <Avatar.Image
            size={48}
            source={{
              uri: `https://api.adorable.io/avatars/285/${nameToUrl}.png`,
            }}
          />
          <Title style={styles.username}>{user.name}</Title>
        </TouchableOpacity>
        {request ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Icon name="add" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Icon name="remove" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
  },
  cardContainer: {
    paddingVertical: 16,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 4,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#512DA8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
});
