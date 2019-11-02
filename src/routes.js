import React from 'react';
import {View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import TrendingScreen from './screens/TrendingScreen';
import ProfileScreen from './screens/ProfileScreen';
import FeedScreen from './screens/FeedScreen';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Perfil',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'md-person'} />
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
            <Icon style={[{color: tintColor}]} size={25} name={'md-list-box'} />
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
            <Icon
              style={[{color: tintColor}]}
              size={25}
              name="md-trending-up"
            />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'Feed',
    activeColor: '#6200EE',
    inactiveColor: '#777',
    barStyle: {backgroundColor: '#F8F8F8'},
    shifting: true,
  },
);

const Routes = createAppContainer(TabNavigator);

export default Routes;
