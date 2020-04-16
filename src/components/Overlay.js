import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameButton from './GameButton';

export default function Overlay({ buttonText, message, onPress }) {
  return (
    <View style={styles.overlay}>
      <Text style={styles.overlayMessage}>{message}</Text>
      <GameButton title={buttonText} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(221, 221, 221, 0.9)',
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  overlayMessage: {
    color: '#0187D0',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
