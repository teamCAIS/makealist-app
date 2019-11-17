import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Switch} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import {
  updateAddListOrdered,
  updateAddListPrivacy,
  updateAddListSelectedCategory,
} from '../../actions/index';

const mapStateToProps = state => ({
  isOrdered: state.addListConfiguration.ordered,
  isPrivate: state.addListConfiguration.privacy,
  selectedCategory: state.selectedCategory,
});

const mapDispatchToProps = dispatch => ({
  updateOrdered: payload => dispatch(updateAddListOrdered(payload)),
  updatePrivacy: payload => dispatch(updateAddListPrivacy(payload)),
  updateSelectedCategory: payload =>
    dispatch(updateAddListSelectedCategory(payload)),
});

const ListConfiguration = ({
  isOrdered,
  isPrivate,
  updateOrdered,
  updatePrivacy,
  selectedCategory,
  updateSelectedCategory,
}) => {
  const categories = [
    {label: 'Nenhuma', value: 0},
    {label: 'Educação', value: 1},
    {label: 'Música', value: 2},
    {label: 'Cinema', value: 3},
    {label: 'Literatura', value: 3},
    {label: 'Humor', value: 4},
    {label: 'Jogos', value: 5},
  ];

  const handleOrdered = () => {
    updateOrdered(!isOrdered);
  };

  const handlePrivacy = () => {
    updatePrivacy(!isPrivate);
  };

  const handleCategory = value => {
    updateSelectedCategory(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <View style={{marginLeft: 8}}>
        <View style={styles.configurationOption}>
          <Text style={styles.configurationOptionLabel}>Ordenada</Text>
          <Switch
            color="#512DA8"
            value={isOrdered}
            onValueChange={() => handleOrdered()}
          />
        </View>
        <View style={styles.configurationOption}>
          <Text style={styles.configurationOptionLabel}>Privada</Text>
          <Switch
            color="#512DA8"
            value={isPrivate}
            onValueChange={() => handlePrivacy()}
          />
        </View>
        <Text
          style={[
            styles.configurationOptionLabel,
            {marginVertical: 8, marginLeft: 8},
          ]}>
          Categoria
        </Text>
        <View style={{backgroundColor: 'white', elevation: 1, marginLeft: 16}}>
          <RNPickerSelect
            placeholder={{}}
            value={selectedCategory}
            onValueChange={value => handleCategory(value)}
            items={categories}
          />
        </View>
      </View>
    </View>
  );
};

const ListConfigurationDrawer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListConfiguration);

export default ListConfigurationDrawer;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 16,
    backgroundColor: '#f1f1f1',
  },
  configurationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    marginBottom: 4,
  },
  configurationOptionLabel: {
    fontSize: 16,
    color: '#212121',
  },
  title: {
    color: '#212121',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
