import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Caption, Snackbar} from 'react-native-paper';
import CommentCard from '../components/CommentCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createComment, deleteComment} from '../services/provider';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  user_id: state.id,
  user_name: state.name,
});

const Comment = ({navigation, user_id, user_name}) => {
  const [commentsList, setCommentsList] = useState(
    navigation.getParam('comments', []),
  );
  const id_list = navigation.getParam('id_list', []);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(false);
  const [commentDeleteError, setCommentDeleteError] = useState(false);
  const [commentEmpty, setCommentEmpty] = useState(false);

  const handleSubmit = async () => {
    if (comment === '') return setCommentEmpty(true);

    let payload = {
      id_list: id_list,
      id_user: user_id,
      comment_text: comment,
    };

    const result = await createComment(payload);

    if (result.id) {
      commentsList.push({
        id: result.id,
        comment_text: comment,
        comment_date: new Date(),
        id_user: user_id,
        user: {
          name: user_name,
        },
      });

      return setComment('');
    }

    return setCommentError(true);
  };

  const removeComment = async id => {
    const result = await deleteComment(id);

    if (result === 'Comentário excluído') {
      let temp = commentsList.filter(item => item.id !== id);
      return setCommentsList(temp);
    }

    return setCommentDeleteError(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {commentsList.length === 0 && (
          <Caption style={{textAlign: 'center'}}>
            Não há nenhum comentário
          </Caption>
        )}
        {commentsList.map((comment, index) => (
          <CommentCard
            comment={comment}
            key={`comment-item-${index}`}
            deleteComment={removeComment}
          />
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
        <TouchableOpacity onPress={() => handleSubmit()}>
          <Icon name="send" size={24} color="#212121" />
        </TouchableOpacity>
      </View>
      <Snackbar visible={commentError} onDismiss={() => setCommentError(false)}>
        Erro ao inserir comentário
      </Snackbar>
      <Snackbar
        visible={commentDeleteError}
        onDismiss={() => setCommentDeleteError(false)}>
        Erro ao deletar comentário
      </Snackbar>
      <Snackbar visible={commentEmpty} onDismiss={() => setCommentEmpty(false)}>
        Preencha o campo de comentário
      </Snackbar>
    </View>
  );
};

const CommentScreen = connect(mapStateToProps)(Comment);
export default CommentScreen;

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
