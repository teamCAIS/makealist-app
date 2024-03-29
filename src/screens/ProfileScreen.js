import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {Text, Caption, Divider, FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import MyLists from '../components/Profile/MyLists';
import Favorites from '../components/Profile/Favorites';
import FriendshipRequests from '../components/Profile/FriendshipRequests';

const mapStateToProps = state => ({
  name: state.name,
  email: state.email,
  bio: state.bio,
});

const Profile = ({navigation, name, email, bio}) => {
  const [activeComponent, setActiveComponent] = useState(0);
  const nameToUrl = name.replace(/\s/g, '');
  const randomUrl = `https://api.adorable.io/avatars/285/${nameToUrl}.png`;

  const handleComponentToShow = () => {
    switch (activeComponent) {
      case 0:
        return <MyLists navigation={navigation} />;
      case 1:
        return <Favorites navigation={navigation} />;
      case 2:
        return <FriendshipRequests />;
    }
  };

  const handleLogout = () => {
    AsyncStorage.clear();
    return navigation.navigate('Auth');
  };

  const handleTabChange = value => {
    setActiveComponent(value);
  };

  return (
    <View>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerPhotoContainer}>
            <View>
              <TouchableOpacity>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: randomUrl,
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.username}>{name}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => handleLogout()}>
                <Icon name="logout" size={24} color="white" />
                <Caption style={{color: 'white'}}>Sair</Caption>
              </TouchableOpacity>
            </View>
          </View>
          <Divider style={{backgroundColor: 'white'}} />
          <Text
            style={[
              styles.bio,
              {
                color:
                  bio !== null
                    ? bio.replace(/\s/g, '') === ''
                      ? '#f1f1f1'
                      : '#fff'
                    : '#f1f1f1',
              },
            ]}
            numberOfLines={2}>
            {bio !== null
              ? bio.replace(/\s/g, '') === ''
                ? 'Insira sua bio nas configurações'
                : bio
              : 'Insira sua bio nas configurações'}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="calendar-star" size={18} color="#fff" />
            <Text style={styles.birthday}>
              Nascimento 01 de janeiro de 1990
            </Text>
          </View>
          <View style={styles.tabContainer}>
            {/*<TouchableOpacity
              onPress={() => handleTabChange(0)}
              style={[
                styles.tab,
                activeComponent === 0
                  ? {borderBottomWidth: 5, borderBottomColor: 'white'}
                  : null,
              ]}>
              <Text
                style={
                  activeComponent == 0
                    ? styles.activeTabText
                    : styles.inactiveTabText
                }>
                Listas
              </Text>
            </TouchableOpacity>
             <TouchableOpacity
              onPress={() => handleTabChange(1)}
              style={[
                styles.tab,
                activeComponent === 1
                  ? {borderBottomWidth: 5, borderBottomColor: 'white'}
                  : null,
              ]}>
              <Text
                style={
                  activeComponent == 1
                    ? styles.activeTabText
                    : styles.inactiveTabText
                }>
                Favoritos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTabChange(2)}
              style={[
                styles.tab,
                activeComponent === 2
                  ? {borderBottomWidth: 5, borderBottomColor: 'white'}
                  : null,
              ]}>
              <Text
                style={
                  activeComponent == 2
                    ? styles.activeTabText
                    : styles.inactiveTabText
                }>
                Amigos
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View>{handleComponentToShow()}</View>
      </ScrollView>
      {activeComponent === 0 ? (
        <FAB
          style={styles.fab}
          color="white"
          icon="playlist-plus"
          onPress={() => navigation.navigate('AddList')}
        />
      ) : null}
    </View>
  );
};

const ProfileScreen = connect(mapStateToProps)(Profile);
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    height: '100%',
    width: '100%',
  },
  headerPhotoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    height: 250,
    backgroundColor: '#512DA8',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.8,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: 'white',
  },
  username: {
    color: 'white',
    marginVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    lineHeight: 18,
    marginVertical: 16,
    minHeight: 35,
    height: 35,
    maxHeight: 35,
  },
  birthday: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 32,
  },
  activeTabText: {
    color: 'white',
    fontSize: 16,
  },
  inactiveTabText: {
    color: 'white',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    backgroundColor: '#512DA8',
    right: 0,
    bottom: 0,
  },
});
