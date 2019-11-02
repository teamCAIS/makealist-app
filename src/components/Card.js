import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {Paragraph, Caption, Headline, Text, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default function Card({cardStyle, list}) {
  const [expanded, setExpanded] = useState(false);
  const [expandAnimation, setExpandAnimation] = useState(new Animated.Value(0));
  const [like, setLike] = useState(false);
  const animatedHeight = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      list.data.length > 2 ? 230 : 200,
      list.data.length > 2 ? (list.data.length + 4) * 50 : 260,
    ],
  });

  const expandTransition = () => {
    Animated.spring(expandAnimation, {toValue: 1}).start();
  };

  const closeTransition = () => {
    Animated.spring(expandAnimation, {toValue: 0}).start();
  };

  useEffect(() => {
    if (!expanded) closeTransition();
    else expandTransition();
  }, [expanded]);

  const _handlePress = () => {
    setExpanded(!expanded);
  };

  const _handleLike = () => {
    setLike(!like);
  };

  const _handleComment = () => {
    return;
  };

  return (
    <Animated.View
      style={[styles.container, {height: animatedHeight}, cardStyle]}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={24}
            source={{
              uri: list.user.profile_photo,
            }}
          />
          <Paragraph style={styles.username}>{list.user.name}</Paragraph>
        </View>
        <Caption style={styles.date}>{list.date}</Caption>
      </View>
      <Headline>{list.title}</Headline>
      <Caption>Categoria: {list.category}</Caption>
      <View>
        {list.data.map((item, index) =>
          index > 0 ? (
            expanded ? (
              <Text key={index} numberOfLines={3} style={styles.text}>{`${
                item.order !== null ? item.order + ' - ' : '•'
              } ${item.description}`}</Text>
            ) : null
          ) : (
            <Text key={index} numberOfLines={3} style={styles.text}>{`${
              item.order !== null ? item.order + ' - ' : '•'
            } ${item.description}`}</Text>
          ),
        )}
      </View>
      <View style={styles.actionButtonsContainer}>
        <View style={styles.buttonsBar}>
          <View style={styles.interactionsButtonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => _handleLike()}>
              <Icon
                name="cards-heart"
                size={24}
                color={like ? '#6200EE' : '#777'}
              />
              <Caption>
                {list.likes > 1000
                  ? String(list.likes).substring(0, 1) + 'K'
                  : list.likes}
              </Caption>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => _handleComment()}>
              <Icon name="comment-text" size={24} color="#777" />
              <Caption>
                {list.comments > 1000
                  ? String(list.comments).substring(0, 1) + 'K'
                  : list.comments}
              </Caption>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            hitSlop={{top: 150, left: 150, bottom: 150, right: 150}}
            onPress={() => _handlePress()}>
            <Ionicon name="ios-arrow-down" size={24} color="#777" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    marginTop: 16,
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
    paddingVertical: 8,
  },
  avatarContainer: {
    flexDirection: 'row',
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    backgroundColor: '#FFF',
    width: 320,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  interactionsButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  username: {
    marginLeft: 8,
  },
  button: {
    flexDirection: 'row',
    marginRight: 16,
  },
  text: {
    marginLeft: 16,
    marginVertical: 16,
    color: '#777',
    fontSize: 16,
    lineHeight: 24,
  },
});
