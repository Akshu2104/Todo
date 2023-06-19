import {configureStore, combineReducers} from '@reduxjs/toolkit';
import inputReducer from './reducer';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({task: inputReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configStore = () => {
  return configureStore({reducer: persistedReducer});
};

export default configStore;
