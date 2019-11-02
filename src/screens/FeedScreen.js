import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

import Card from '../components/Card';

export default function FeedScreen() {
  const data = ['', '', '', ''];

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `card${index}`}
          renderItem={({item}) => <Card />}
          showsVerticalScrollIndicator={false}
        />
        <FAB style={styles.fab} icon="playlist-plus" onPress={() => null} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    height: '100%',
    width: '100%',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
