import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Paragraph, Caption, Headline, Text, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default function Card() {
  const [expanded, setExpanded] = useState(false);
  const [like, setLike] = useState(false);

  const _handlePress = () => {
    setExpanded(!expanded);
  };

  const _handleLike = () => {
    setLike(!like);
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={24}
            source={{
              uri: 'https://api.adorable.io/avatars/285/abott@adorable.png',
            }}
          />
          <Paragraph style={styles.username}>Caio Nunes</Paragraph>
        </View>
        <Caption style={styles.date}>Há 13 dias</Caption>
      </View>
      <View style={styles.container}>
        <Headline>Coisas que não aguento mais no semestre</Headline>
        <Caption>Categoria: Ódio</Caption>
        <Text style={styles.previewText}>10 - Aulas do Paulo...</Text>
        <View style={styles.actionButtonsContainer}>
          <View style={styles.interactionsButtonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => _handleLike()}>
              <Icon
                name="cards-heart"
                size={24}
                color={like ? '#6200EE' : '#777'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => _handleComment()}>
              <Icon name="comment-text" size={24} color="#777" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => null}>
            <Ionicon name="ios-arrow-down" size={24} color="#777" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    marginBottom: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6200EE',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  avatarContainer: {
    flexDirection: 'row',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  interactionsButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: 8,
    color: '#FFF',
  },
  date: {
    color: '#FFF',
  },
  button: {
    marginRight: 16,
  },
  previewText: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    color: '#777',
    fontSize: 16,
  },
});
