import React from 'react';
import {View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from './screens/LoginScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import TrendingScreen from './screens/TrendingScreen';
import ProfileScreen from './screens/ProfileScreen';
import FeedScreen from './screens/FeedScreen';

const MainNavigation = createMaterialBottomTabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Perfil',
        tabBarIcon: ({tintColor}) => (
          <View>
            <MaterialIcon
              style={[{color: tintColor}]}
              size={25}
              name={tintColor === '#F05A5B' ? 'person' : 'person-outline'}
            />
          </View>
        ),
      },
    },
    Feed: {
      screen: FeedScreen,
      navigationOptions: {
        tabBarLabel: 'Feed',
        tabBarIcon: ({tintColor}) => (
          <View>
            <MaterialCommunityIcon
              style={[{color: tintColor}]}
              size={25}
              name={tintColor === '#F05A5B' ? 'home' : 'home-outline'}
            />
          </View>
        ),
      },
    },
    Trending: {
      screen: TrendingScreen,
      navigationOptions: {
        tabBarLabel: 'Em alta',
        tabBarIcon: ({tintColor}) => (
          <View>
            <MaterialCommunityIcon
              style={[{color: tintColor}]}
              size={25}
              name={tintColor === '#F05A5B' ? 'compass' : 'compass-outline'}
            />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'Feed',
    activeColor: '#F05A5B',
    inactiveColor: '#777',
    barStyle: {backgroundColor: '#F8F8F8'},
    shifting: true,
  },
);

const AuthNavigation = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      App: MainNavigation,
      Auth: AuthNavigation,
      AuthLoading: AuthLoadingScreen,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default Routes;
