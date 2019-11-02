import React from 'react';
import {View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
            <MaterialIcon
              style={[{color: tintColor}]}
              size={25}
              name={tintColor === '#6200EE' ? 'person' : 'person-outline'}
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
              name={tintColor === '#6200EE' ? 'home' : 'home-outline'}
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
              name={tintColor === '#6200EE' ? 'compass' : 'compass-outline'}
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
