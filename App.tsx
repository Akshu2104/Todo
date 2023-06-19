// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import MainNavigation from './src/navigations/mainNavigations';
import configStore from './src/redux/store';

function App(): JSX.Element {
  let persistor = persistStore(configStore());
  let store = configStore();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
