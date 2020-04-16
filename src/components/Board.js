import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BOARD_PADDING } from '../config';
import Cell from './Cell';
import Row from './Row';

export default function Board({ tiles, onMoveCell }) {
  const cells = tiles
    .filter(tile => tile.value)
    .map(tile => <Cell key={tile.id} tile={tile} onMoveCell={onMoveCell} />);

  return (
    <View style={styles.board}>
      <Row />
      <Row />
      <Row />
      <Row />
      {cells}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    backgroundColor: '#03A9F4',
    borderColor: '#0288D1',
    borderRadius: 5,
    borderWidth: 1,
    padding: BOARD_PADDING,
  },
  row: {
    flexDirection: 'row',
  },
});
