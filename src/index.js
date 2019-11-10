import React from 'react';
import {
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {Provider} from 'react-redux';
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

export default function App() {
  return (
    <Provider store={userReducer}>
      <PaperProvider theme={theme}>
        <Routes />
      </PaperProvider>
    </Provider>
  );
}
