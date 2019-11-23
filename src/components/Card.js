import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {
  Paragraph,
  Caption,
  Headline,
  Text,
  Avatar,
  Chip,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import localization from 'moment/locale/pt-br';
import {createLike, deleteLike} from '../services/provider';

export default function Card({cardStyle, list, user_id, favorite, navigation}) {
  moment.updateLocale('pt-br', localization);

  const nameToUrl = list.user.name.replace(/\s/g, '');
  const randomUrl = `https://api.adorable.io/avatars/285/${nameToUrl}.png`;

  const listDate = moment(new Date()).diff(moment(new Date(list.date)), 'days');

  const [expanded, setExpanded] = useState(false);
  const [expandAnimation, setExpandAnimation] = useState(new Animated.Value(0));
  const [like, setLike] = useState(list.liked);
  const [likeNumber, setLikeNumber] = useState(list.likes);
  const [componentHeight, setComponentHeight] = useState(270);
  const animatedHeight = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      list.items.length > 2 ? 250 : 220,
      list.items.length > 2 ? (list.items.length + 4) * 48 : 270,
    ],
  });

  useEffect(() => setLike(list.liked), [list]);

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

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const handleLike = async () => {
    let payload = {
      id_user: user_id,
      id_list: list.id,
    };

    if (like) {
      await deleteLike(payload);
      setLikeNumber(likeNumber - 1);
      return setLike(false);
    } else {
      await createLike(payload);
      setLikeNumber(likeNumber + 1);
      return setLike(true);
    }
  };

  const handleComment = () => {
    return navigation.navigate('Comment', {
      id_list: list.id,
      comments: list.comments,
    });
  };

  const handleFavorite = () => {
    return;
  };

  return (
    <Animated.View
      onLayout={event => {
        let {height} = event.nativeEvent.layout;
        setComponentHeight(height);
      }}
      style={[styles.container, {height: animatedHeight}, cardStyle]}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={24}
            source={{
              uri: randomUrl,
            }}
          />
          <Paragraph style={styles.username}>{list.user.name}</Paragraph>
        </View>
        <Caption style={styles.date}>
          {listDate == 0
            ? 'Hoje'
            : listDate == 1
            ? 'Ontem'
            : `Há ${listDate} dias`}
        </Caption>
      </View>
      <Headline>{list.title}</Headline>
      <View style={{flexDirection: 'row'}}>
        <Chip
          icon={({size}) => <Icon name="label" size={size} color="#FFF" />}
          onPress={() => null}
          style={styles.chip}
          textStyle={styles.chipText}>
          Nenhuma Categoria
        </Chip>
        <View />
      </View>
      <View>
        {list.items.map((item, index) =>
          index > 0 ? (
            expanded ? (
              <Text key={index} numberOfLines={3} style={styles.text}>{`${
                item.item_order ? item.item_order + ' - ' : '• '
              } ${item.text}`}</Text>
            ) : null
          ) : (
            <Text key={index} numberOfLines={3} style={styles.text}>{`${
              item.item_order ? item.item_order + ' - ' : '• '
            } ${item.text}`}</Text>
          ),
        )}
      </View>
      <View style={styles.actionButtonsContainer}>
        <View style={styles.buttonsBar}>
          <View style={styles.interactionsButtonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLike()}>
              <Icon
                name="cards-heart"
                size={22}
                color={like ? '#512DA8' : '#757575'}
              />
              <Caption style={styles.buttonNumber}>
                {likeNumber > 1000
                  ? String(likeNumber).substring(0, 1) + 'K'
                  : likeNumber}
              </Caption>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleComment()}>
              <Icon name="comment-text" size={22} color="#777" />
              <Caption style={styles.buttonNumber}>
                {list.comments.length > 1000
                  ? String(list.comments.length).substring(0, 1) + 'K'
                  : list.comments.length}
              </Caption>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleFavorite()}>
              <Icon
                name="star"
                size={22}
                color={favorite ? '#512DA8' : '#757575'}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            hitSlop={{top: 150, left: 150, bottom: 150, right: 150}}
            onPress={() => handlePress()}>
            <Ionicon name="ios-arrow-down" size={22} color="#777" />
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
  chip: {
    backgroundColor: '#512DA8',
    marginVertical: 8,
  },
  chipText: {
    color: '#FFF',
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
    marginRight: 4,
  },
  buttonNumber: {
    marginHorizontal: 4,
  },
  text: {
    marginLeft: 16,
    color: '#212121',
    fontSize: 16,
    lineHeight: 40,
  },
});
