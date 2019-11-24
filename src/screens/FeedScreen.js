import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {FAB, Caption} from 'react-native-paper';

import Card from '../components/Card';
import {connect} from 'react-redux';
import {getFeed} from '../services/provider';

const mapStateToProps = state => ({
  id: state.id,
});

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const Feed = ({navigation, id, isFocused}) => {
  const [data, setData] = useState([]);

  const getLists = async () => {
    const result = await getFeed(id);
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

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getLists();
    wait(500).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <SafeAreaView>
      {isFocused ? (
        data.length > 0 ? (
          <View style={styles.container}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => `card${index}`}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({item, index}) =>
                index !== data.length - 1 ? (
                  <Card
                    list={item}
                    navigation={navigation}
                    user_id={id}
                    liked={item.liked}
                  />
                ) : (
                  <View>
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
                )
              }
              showsVerticalScrollIndicator={false}
            />
            <FAB
              style={styles.fab}
              color="white"
              icon="playlist-plus"
              onPress={() => navigation.navigate('AddList')}
            />
          </View>
        ) : (
          <Caption style={styles.noList}>Nenhuma lista foi postada</Caption>
        )
      ) : null}
    </SafeAreaView>
  );
};

const FeedScreen = connect(mapStateToProps)(Feed);
export default withNavigationFocus(FeedScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    height: '100%',
    width: '100%',
    paddingHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#512DA8',
  },
  noMoreListsText: {
    marginVertical: 32,
    textAlign: 'center',
  },
  noList: {
    marginVertical: 32,
    textAlign: 'center',
  },
});
