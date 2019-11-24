import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import Card from '../Card';
import {Caption} from 'react-native-paper';
import {connect} from 'react-redux';
import {getMyLists} from '../../services/provider';

const mapStateToProps = state => ({
  id: state.id,
});

const Lists = ({navigation, id, isFocused}) => {
  const [data, setData] = useState([]);

  const getLists = async () => {
    const result = await getMyLists(id);
    setData(result);
  };

  useEffect(() => {
    getLists();
  }, []);

  if (!isFocused) {
    if (data.length > 0) setData([]);
  } else {
    if (data.length === 0) {
      getLists();
    }
  }

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        data.map((item, index) =>
          index !== data.length - 1 ? (
            <Card
              key={`my-list-card-item${index}`}
              list={item}
              liked={item.liked}
              user_id={id}
              navigation={navigation}
            />
          ) : (
            <View key={`my-list-card-item${index}`}>
              <Card
                list={item}
                navigation={navigation}
                user_id={id}
                liked={item.liked}
              />
              <Caption style={styles.noMoreListsText}>
                Sem mais atualizações
              </Caption>
            </View>
          ),
        )
      ) : (
        <Caption style={styles.noList}>Você não postou nenhuma lista</Caption>
      )}
    </View>
  );
};

const MyLists = connect(mapStateToProps)(Lists);
export default withNavigationFocus(MyLists);

const styles = StyleSheet.create({
  noMoreListsText: {
    marginVertical: 32,
    textAlign: 'center',
  },
  noList: {
    marginVertical: 32,
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 16,
  },
});
