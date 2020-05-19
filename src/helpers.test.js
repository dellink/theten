import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE_KEY } from './config';
import { saveState } from './helpers';

describe('helpers', () => {
  it(`${saveState.name} should save state in AsyncStorage`, async () => {
    const state = {};
    await saveState(state);

    expect(AsyncStorage.setItem).toBeCalledWith(STORAGE_KEY, JSON.stringify(state));
    expect(await AsyncStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(state));
  });
});
