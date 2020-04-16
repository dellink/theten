import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

export default function GameButton({ title, onPress }) {
  return (
    <TouchableHighlight underlayColor="#0288D1" onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#01A9F2',
    borderColor: '#0187D0',
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    maxHeight: 80,
    width: 140,
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});
