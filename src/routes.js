import React from 'react';
import 'react-native-gesture-handler';
import {View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

//Auth
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';

//App
import TrendingScreen from './screens/TrendingScreen';
import ConfigurationScreen from './screens/ConfigurationScreen';
import ProfileScreen from './screens/ProfileScreen';
import FeedScreen from './screens/FeedScreen';
import AddListScreen from './screens/AddListScreen';
import CommentScreen from './screens/CommentScreen';

//Drawers
import FilterDrawer from './components/Drawer/FilterDrawer';
import ListConfigurationDrawer from './components/Drawer/ListConfigurationDrawer';

const AddListNavigation = createDrawerNavigator(
  {
    AddList: {
      screen: AddListScreen,
    },
  },
  {
    contentComponent: ListConfigurationDrawer,
    drawerPosition: 'right',
  },
);

const TabNavigation = createMaterialBottomTabNavigator(
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
              name={tintColor === '#512DA8' ? 'person' : 'person-outline'}
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
              name={tintColor === '#512DA8' ? 'home' : 'home-outline'}
            />
          </View>
        ),
      },
    },
    // Trending: {
    //   screen: TrendingScreen,
    //   navigationOptions: {
    //     tabBarLabel: 'Em alta',
    //     tabBarIcon: ({tintColor}) => (
    //       <View>
    //         <MaterialCommunityIcon
    //           style={[{color: tintColor}]}
    //           size={25}
    //           name={tintColor === '#512DA8' ? 'compass' : 'compass-outline'}
    //         />
    //       </View>
    //     ),
    //   },
    // },
    Configuration: {
      screen: ConfigurationScreen,
      navigationOptions: {
        tabBarLabel: 'Configurações',
        tabBarIcon: ({tintColor}) => (
          <View>
            <MaterialCommunityIcon
              style={[{color: tintColor}]}
              size={25}
              name={tintColor === '#512DA8' ? 'settings' : 'settings-outline'}
            />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'Feed',
    activeColor: '#512DA8',
    inactiveColor: '#757575',
    barStyle: {backgroundColor: '#F8F8F8'},
    shifting: true,
  },
);

const MainNavigation = createStackNavigator(
  {
    Main: {
      screen: TabNavigation,
      navigationOptions: {
        header: null,
      },
    },
    AddList: {
      screen: AddListNavigation,
      navigationOptions: {
        header: null,
      },
    },
    Comment: {
      screen: CommentScreen,
      navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#512DA8'},
        title: 'Comentários',
      },
    },
  },
  {
    initialRouteName: 'Main',
  },
);

const AuthNavigation = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      title: 'Cadastro',
      headerStyle: {backgroundColor: '#512DA8'},
      headerTintColor: 'white',
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
