import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CommentCard from '../components/CommentCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CommentScreen() {
  const [comment, setComment] = useState('');

  const data = [
    {
      username: 'Caio Nunes',
      avatar_url: 'https://api.adorable.io/avatars/285/exemplo.png',
      comment: 'Adorei essa lista!',
      date: 'Há 2 dias',
    },
    {
      username: 'Ulisses Lopes',
      avatar_url: 'https://api.adorable.io/avatars/285/exemplo2.png',
      comment: 'Odiei, 5 estrelas',
      date: 'Há 3 dias',
    },
    {
      username: 'Ulisses Lopes',
      avatar_url: 'https://api.adorable.io/avatars/285/exemplo2.png',
      comment: 'Odiei, 5 estrelas',
      date: 'Há 3 dias',
    },
    {
      username: 'Ulisses Lopes',
      avatar_url: 'https://api.adorable.io/avatars/285/exemplo2.png',
      comment: 'Odiei, 5 estrelas',
      date: 'Há 3 dias',
    },
    {
      username: 'Ulisses Lopes',
      avatar_url: 'https://api.adorable.io/avatars/285/exemplo2.png',
      comment: 'Odiei, 5 estrelas',
      date: 'Há 3 dias',
    },
    {
      username: 'Ulisses Lopes',
      avatar_url: 'https://api.adorable.io/avatars/285/exemplo2.png',
      comment: 'Odiei, 5 estrelas',
      date: 'Há 3 dias',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {data.map((comment, index) => (
          <CommentCard data={comment} key={`comment-item-${index}`} />
        ))}
      </ScrollView>
      <View style={styles.commentContainer}>
        <TextInput
          placeholder="Digite seu comentário"
          placeholderTextColor="#aaa"
          value={comment}
          onChangeText={setComment}
          style={styles.commentBox}
        />
        <TouchableOpacity>
          <Icon name="send" size={24} color="#212121" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    width: '100%',
    padding: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    borderTopColor: '#aaa',
    borderTopWidth: 0.5,
  },
  commentBox: {
    width: '90%',
  },
});
