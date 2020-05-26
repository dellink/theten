import React from 'react';
import { AppState, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BOARD_PADDING, BOARD_SIZE, CELL_MARGIN, CELL_SIZE, STORAGE_KEY } from '../config';
import { saveState } from '../helpers';
import { CHECK_GAME_OVER, LOAD_GAME, MOVE_CELL, NEW_GAME, initialState, reducer } from '../reducer';
import Board from './Board';
import GameButton from './GameButton';
import Overlay from './Overlay';
import Score from './Score';

export default function Game() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { isGameOver, record, score, tiles } = state;

  const stateRef = React.useRef();
  stateRef.current = state;

  const onPressNewGame = () => dispatch({ type: NEW_GAME });

  const onMoveCell = (direction, tile) => {
    dispatch({ type: MOVE_CELL, payload: { direction, tile } });

    setTimeout(() => {
      dispatch({ type: CHECK_GAME_OVER });
    }, 200);
  };

  React.useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
          dispatch({ type: LOAD_GAME, payload: JSON.parse(data) });
        } else {
          dispatch({ type: NEW_GAME });
        }
      } catch (e) {
        console.log(e);
        dispatch({ type: NEW_GAME });
      }
    })();
  }, []);

  React.useEffect(() => {
    const handleAppStateChange = appState => {
      if (appState.match(/inactive/)) {
        saveState({
          ...stateRef.current,
          tiles: stateRef.current.tiles.filter(tile => tile.mergedInto === null),
        });
      }
    };

    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerColumn}>
          <GameButton title="New game" onPress={onPressNewGame} />
        </View>
        <View style={styles.headerColumn}>
          <Score currentValue={score} record={record} />
        </View>
      </View>
      <View>
        <Board tiles={tiles} onMoveCell={onMoveCell} />
      </View>
      {isGameOver && (
        <Overlay message="Game over" buttonText="Try again" onPress={onPressNewGame} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#B2E5FA',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60,
    width: BOARD_PADDING * 2 + CELL_MARGIN * BOARD_SIZE * 2 + CELL_SIZE * BOARD_SIZE,
  },
  headerColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
