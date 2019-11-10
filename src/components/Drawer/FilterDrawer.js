import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Button} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

export default function FilterDrawer() {
  const [selectedOrder, setSelectedOrder] = useState(0);
  const order = [
    {
      label: 'Selecione uma opção',
      value: 0,
    },
    {
      label: 'Popularidade',
      value: 1,
    },
    {
      label: 'Data de publicação',
      value: 2,
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(0);

  const categories = [
    {label: 'Todas', value: 0},
    {label: 'Educação', value: 1},
    {label: 'Música', value: 2},
    {label: 'Cinema', value: 3},
    {label: 'Literatura', value: 3},
    {label: 'Humor', value: 4},
    {label: 'Jogos', value: 5},
  ];

  const handleOrder = value => {
    setSelectedOrder(value);
  };

  const handleCategory = value => {
    setSelectedCategory(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtrar</Text>
      <View style={{marginLeft: 8}}>
        <Text style={styles.sectionTitle}>Ordenar por:</Text>
        <View
          style={{backgroundColor: 'white', elevation: 1, marginVertical: 8}}>
          <RNPickerSelect
            placeholder={{}}
            style={{zIndex: 1}}
            value={selectedOrder}
            onValueChange={value => handleOrder(value)}
            items={order}
          />
        </View>
        <Text style={styles.sectionTitle}>Categoria:</Text>
        <View
          style={{backgroundColor: 'white', elevation: 1, marginVertical: 8}}>
          <RNPickerSelect
            placeholder={{}}
            style={{zIndex: 1}}
            value={selectedCategory}
            onValueChange={value => handleCategory(value)}
            items={categories}
          />
        </View>
        <Button mode="contained" style={{marginTop: 16}}>
          Aplicar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 16,
    backgroundColor: '#f1f1f1',
  },
  title: {
    color: '#212121',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginVertical: 8,
    color: '#212121',
  },
});
