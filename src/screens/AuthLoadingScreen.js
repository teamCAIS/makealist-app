import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import {updateUserInfo} from '../actions/index';

const mapDispatchToProps = dispatch => {
  return {
    updateStore: payload => dispatch(updateUserInfo(payload)),
  };
};

const AuthLoading = ({navigation, updateStore}) => {
  useEffect(() => {
    _bootstrapAsync();
  }, []);

  const _bootstrapAsync = async () => {
    // AsyncStorage.clear()
    const user = await AsyncStorage.getItem('user');

    if (user) {
      updateStore(JSON.parse(user));
      return navigation.navigate('App');
    } else {
      return navigation.navigate('Auth');
    }
  };

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

const AuthLoadingScreen = connect(null, mapDispatchToProps)(AuthLoading);
export default AuthLoadingScreen;
