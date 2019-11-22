import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet} from 'react-native';
import {FAB, Caption} from 'react-native-paper';

import Card from '../components/Card';

export default function FeedScreen({navigation}) {
  const data = [];

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `card${index}`}
          renderItem={({item, index}) =>
            index !== data.length - 1 ? (
              <Card list={item} navigation={navigation} />
            ) : (
              <View>
                <Card list={item} navigation={navigation} />
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
    </SafeAreaView>
  );
}

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
});
