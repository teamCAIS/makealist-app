import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Caption, Paragraph} from 'react-native-paper';

export default function CommentCard({data}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerProfile}>
          <Image source={{uri: data.avatar_url}} style={styles.avatar} />
          <Paragraph style={styles.username}>{data.username}</Paragraph>
        </TouchableOpacity>
        <Caption>{data.date}</Caption>
      </View>
      <View style={styles.body}>
        <Paragraph>{data.comment}</Paragraph>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 16,
    elevation: 1,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerProfile: {
    flexDirection: 'row',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  username: {
    marginLeft: 8,
  },
  body: {
    marginTop: 16,
    marginBottom: 8,
  },
});
