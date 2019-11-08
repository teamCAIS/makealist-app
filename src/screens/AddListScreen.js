import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Text, Button} from 'react-native-paper';

export default class AddListScreen extends React.Component {
  static navigationOptions = {
    title: 'Criar lista',
    headerStyle: {
      backgroundColor: '#F05A5B',
    },
    headerRight: () => (
      <TouchableOpacity>
        <Text style={{marginRight: 16, color: 'white'}}>Postar</Text>
      </TouchableOpacity>
    ),
    headerTintColor: '#FFF',
  };

  constructor(props) {
    super(props);
    this.state = {
      listItems: ['', ''],
    };
  }

  handleOnChangeTextItem = (pos, value) => {
    let tempList = [...this.state.listItems];
    this.state.listItems.map((item, index) => {
      if (index === pos) {
        tempList[index] = value;
      }
    });
    this.setState({listItems: tempList});
  };

  addItemToList = () => {
    let tempList = [...this.state.listItems];
    tempList.push('');
    this.setState({listItems: tempList});
    console.log(this.state.listItems);
  };

  render() {
    const {listItems} = this.state;
    return (
      <SafeAreaView>
        <View style={styles.container}>
          {listItems.map((item, index) => (
            <View style={styles.itemContainer} key={`list-item-${index}`}>
              <View style={styles.itemPosition}>
                <Text style={styles.itemLabelText}>{index + 1}</Text>
              </View>
              <TextInput
                placeholder={`Item ${index + 1}`}
                placeholderTextColor="#aaa"
                value={listItems[index]}
                onChangeText={value =>
                  this.handleOnChangeTextItem(index, value)
                }
                style={styles.input}
                multiline={true}
                numberOfLines={3}
              />
            </View>
          ))}
          <Button
            mode="outlined"
            onPress={() => this.addItemToList()}
            labelStyle={{color: '#333'}}
            style={styles.buttonAdd}>
            Adicionar novo item
          </Button>
          <View style={styles.footer}>
            <Button mode="contained" icon="format-list-numbered" />
            <Text>Categoria</Text>
            <Button mode="contained" icon="lock-outline" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#f8f8f8',
  },
  buttonAdd: {
    marginTop: 16,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 4,
    width: '95%',
    backgroundColor: 'white',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPosition: {
    padding: 8,
    backgroundColor: '#F05A5B',
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  itemLabelText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#f8f8f8',
    height: 60,
    bottom: 0,
    zIndex: 1000,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.8,
  },
});
