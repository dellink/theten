import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE_KEY } from './config';

export const saveState = async state => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.log(e);
  }
};
