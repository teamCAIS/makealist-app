import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import {Text, Button, Switch, FAB} from 'react-native-paper';

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
      listItems: [''],
      isOrdered: true,
      isPrivate: false,
      selectedCategory: 1,
      categories: [
        {label: 'Educação', value: 1},
        {label: 'Música', value: 2},
        {label: 'Cinema', value: 3},
        {label: 'Literatura', value: 3},
        {label: 'Humor', value: 4},
        {label: 'Jogos', value: 5},
      ],
      optionsOpened: false,
      expandAnimation: new Animated.Value(0),
      expandAnimationButton: new Animated.Value(0),
    };
  }

  openOptions = () => {
    this.setState({optionsOpened: true});
    Animated.spring(this.state.expandAnimation, {toValue: 1}).start();
    Animated.spring(this.state.expandAnimationButton, {toValue: 1}).start();
  };

  closeOptions = () => {
    this.setState({optionsOpened: false});
    Animated.spring(this.state.expandAnimation, {toValue: 0}).start();
    Animated.spring(this.state.expandAnimationButton, {toValue: 0}).start();
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

  handleOrder = () => {
    this.setState(prevState => ({isOrdered: !prevState.isOrdered}));
  };

  handlePrivacy = () => {
    this.setState(prevState => ({isPrivate: !prevState.isPrivate}));
  };

  handleCategory = value => {
    this.setState({selectedCategory: value});
  };

  render() {
    const {
      listItems,
      isOrdered,
      isPrivate,
      categories,
      selectedCategory,
      optionsOpened,
      expandAnimation,
    } = this.state;

    const animationTranslation = expandAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 20],
    });

    const buttonAnimationTranslation = expandAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -165],
    });

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
                    {isOrdered ? (
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
              labelStyle={{color: '#333'}}
              style={styles.buttonAdd}>
              Adicionar novo item
            </Button>
          </ScrollView>
        </View>
        {optionsOpened ? (
          <TouchableWithoutFeedback onPress={this.closeOptions}>
            <View style={styles.overlayContainer} />
          </TouchableWithoutFeedback>
        ) : null}
        <Animated.View
          style={[
            styles.footer,
            {transform: [{translateY: animationTranslation}]},
          ]}>
          <View style={styles.configurationOption}>
            <Text style={styles.configurationOptionLabel}>Ordenada</Text>
            <Switch
              color="#F05A5B"
              value={isOrdered}
              onValueChange={this.handleOrder}
            />
          </View>
          <View style={styles.configurationOption}>
            <Text style={styles.configurationOptionLabel}>Privada</Text>
            <Switch
              color="#F05A5B"
              value={isPrivate}
              onValueChange={this.handlePrivacy}
            />
          </View>
          <View style={{backgroundColor: 'white', elevation: 1}}>
            <RNPickerSelect
              placeholder={{}}
              style={{zIndex: 1}}
              value={selectedCategory}
              onValueChange={this.handleCategory}
              items={categories}
            />
          </View>
        </Animated.View>
        <FAB
          style={[
            styles.fab,
            {transform: [{translateY: buttonAnimationTranslation}]},
          ]}
          color="white"
          icon="settings"
          onPress={optionsOpened ? this.closeOptions : this.openOptions}
        />
      </KeyboardAvoidingView>
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
    backgroundColor: '#777',
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
  configurationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    marginBottom: 4,
    backgroundColor: 'white',
    elevation: 1,
  },
  configurationOptionLabel: {
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    zIndex: 10,
    backgroundColor: '#F05A5B',
    right: 0,
    bottom: 0,
  },
});
