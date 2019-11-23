import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Caption, Paragraph, IconButton} from 'react-native-paper';
import {connect} from 'react-redux';
//dateHandler
import moment from 'moment';
import localization from 'moment/locale/pt-br';

const mapStateToProps = state => ({
  user_id: state.id,
});

const CommentCardLayout = ({comment, user_id, deleteComment}) => {
  moment.updateLocale('pt-br', localization);

  const nameToUrl = comment.user.name.replace(/\s/g, '');
  const randomUrl = `https://api.adorable.io/avatars/285/${nameToUrl}.png`;

  const commentDate = moment(new Date()).diff(
    moment(new Date(comment.comment_date)),
    'days',
  );

  const handleDeleteComment = () => {
    console.log(comment.id);
    return deleteComment(comment.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerProfile}>
          <Image source={{uri: randomUrl}} style={styles.avatar} />
          <Paragraph style={styles.username}>{comment.user.name}</Paragraph>
        </TouchableOpacity>
        {user_id === comment.id_user && (
          <IconButton
            icon="delete"
            color="#212121"
            size={20}
            onPress={() => handleDeleteComment()}
          />
        )}
      </View>
      <View style={styles.body}>
        <Paragraph>{comment.comment_text}</Paragraph>
      </View>
      <Caption style={{marginTop: 4}}>
        {'Comentado '}
        {commentDate == 0
          ? 'hoje'
          : commentDate == 1
          ? 'ontem'
          : `há ${commentDate} dias`}
      </Caption>
    </View>
  );
};

const CommentCard = connect(mapStateToProps)(CommentCardLayout);
export default CommentCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    elevation: 1,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingBottom: 8,
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.5,
  },
});
