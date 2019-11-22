import React from 'react';
import {
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import userReducer from './reducers/reducer';

import Routes from './routes';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#512DA8',
    accent: '#757575',
  },
  fonts: configureFonts(fontConfig),
};

const store = createStore(userReducer, applyMiddleware(ReduxPromise, thunk));

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Routes />
      </PaperProvider>
    </Provider>
  );
}
