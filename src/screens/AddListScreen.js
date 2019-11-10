import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, Button, FAB} from 'react-native-paper';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  isOrdered: state.addListConfiguration.ordered,
});

class AddList extends React.Component {
  static navigationOptions = {
    title: 'Criar lista',
    headerStyle: {
      backgroundColor: '#512DA8',
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
      listItems: [''],
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
  };

  render() {
    const {listItems} = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <View style={styles.container}>
          <ScrollView>
            {listItems.map((item, index) => (
              <View style={styles.itemContainer} key={`list-item-${index}`}>
                <View style={styles.itemPosition}>
                  <Text style={styles.itemLabelText}>
                    {this.props.isOrdered ? (
                      index + 1
                    ) : (
                      <CommunityIcon name="circle" size={8} color="white" />
                    )}
                  </Text>
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
              labelStyle={{color: '#212121'}}
              style={styles.buttonAdd}>
              Adicionar novo item
            </Button>
          </ScrollView>
        </View>
        <FAB
          style={styles.fab}
          color="white"
          icon="settings"
          onPress={() => this.props.navigation.openDrawer()}
        />
      </KeyboardAvoidingView>
    );
  }
}

const AddListScreen = connect(mapStateToProps)(AddList);

export default AddListScreen;

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
    flex: 1,
    backgroundColor: 'white',
    fontSize: 16,
    elevation: 1,
    width: '95%',
    marginVertical: 4,
    height: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPosition: {
    padding: 8,
    backgroundColor: '#757575',
    marginTop: 4,
    alignSelf: 'flex-start',
    elevation: 1,
  },
  itemLabelText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  overlayContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#f1f1f1',
    height: 192,
    bottom: 0,
    zIndex: 5,
    justifyContent: 'flex-start',
    padding: 16,
  },

  fab: {
    position: 'absolute',
    margin: 16,
    zIndex: 10,
    backgroundColor: '#512DA8',
    right: 0,
    bottom: 0,
  },
});
