import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CELL_MARGIN, CELL_SIZE } from '../config';

export default function Row() {
  return (
    <View style={styles.row}>
      <View style={styles.cell} />
      <View style={styles.cell} />
      <View style={styles.cell} />
      <View style={styles.cell} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  cell: {
    backgroundColor: '#ddccbb',
    borderRadius: 5,
    height: CELL_SIZE,
    margin: CELL_MARGIN,
    width: CELL_SIZE,
  },
});
