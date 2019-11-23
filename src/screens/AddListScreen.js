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
import Icon from 'react-native-vector-icons/Ionicons';
import {Text, Button, FAB, Caption, Snackbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {createList} from '../services/provider';

const mapStateToProps = state => ({
  id: state.id,
  isOrdered: state.addListConfiguration.ordered,
  isPrivate: state.addListConfiguration.privacy,
});

class AddList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: ['', ''],
      listTitle: '',
      itemNotFilledError: false,
      titleNotFilledError: false,
    };
  }

  validateFields = () => {
    const {listItems, listTitle} = this.state;

    let itemNotFilled = false;

    for (let i = 0; i < listItems.length; i++) {
      let temp = listItems[i].replace(/\s/g, '');
      if (temp === '') {
        itemNotFilled = true;
        break;
      }
    }

    let titleNotFilled = false;
    let titleNoSpace = listTitle.replace(/\s/g, '');
    if (titleNoSpace === '') titleNotFilled = true;

    return {
      itemNotFilled,
      titleNotFilled,
    };
  };

  handleSubmit = async () => {
    const validation = await this.validateFields();

    if (validation.titleNotFilled)
      return this.setState({titleNotFilledError: true});
    if (validation.itemNotFilled)
      return this.setState({itemNotFilledError: true});

    const {listTitle} = this.state;
    const {id, isOrdered, isPrivate} = this.props;

    let payload = {
      id_user: id,
      title: listTitle,
      private: isPrivate,
      ordered: isOrdered,
      items: this.treatItems(),
    };

    await createList(payload);

    return this.props.navigation.navigate('Main');
  };

  treatItems = () => {
    let itemsList = [];
    const {listItems} = this.state;
    const {isOrdered} = this.props;

    listItems.map((item, index) => {
      if (item !== '') {
        let temp = {};
        temp.text = item;
        if (isOrdered) {
          temp.item_order = index + 1;
        }

        itemsList.push(temp);
      }
    });

    return itemsList;
  };

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
    const {
      listItems,
      listTitle,
      itemNotFilledError,
      titleNotFilledError,
    } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Main')}
              style={{zIndex: 2}}>
              <Icon
                name={
                  Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'
                }
                size={Platform.OS === 'ios' ? 32 : 24}
                color="white"
              />
            </TouchableOpacity>
            <Text style={{color: 'white', marginLeft: 16, fontSize: 20}}>
              Criar lista
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.handleSubmit()}>
            <Text style={{color: 'white', fontSize: 16}}>Postar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Caption>Título da lista</Caption>
          <View style={{backgroundColor: 'white', elevation: 2, height: 60}}>
            <TextInput
              placeholder="Digite o título da lista"
              placeholderTextColor="#aaa"
              value={listTitle}
              onChangeText={text => this.setState({listTitle: text})}
              style={{
                paddingHorizontal: 16,
              }}
              multiline={true}
              numberOfLines={3}
            />
          </View>
          <Caption style={{marginTop: 16}}>Itens da lista</Caption>
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
        <Snackbar
          visible={titleNotFilledError}
          onDismiss={() => this.setState({titleNotFilledError: false})}>
          Insira o título da lista
        </Snackbar>
        <Snackbar
          visible={itemNotFilledError}
          onDismiss={() => this.setState({itemNotFilledError: false})}>
          Preencha todos os items da lista
        </Snackbar>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#512DA8',
    height: 60,
    paddingHorizontal: 16,
    elevation: 2,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
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
