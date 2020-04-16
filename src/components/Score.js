import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Score({ currentValue, record }) {
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Text style={styles.text}>Score:</Text>
        <Text style={styles.value}>{currentValue}</Text>
      </View>
      <View style={styles.line}>
        <Text style={styles.text}>Record:</Text>
        <Text style={styles.value}>{record}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#03A9F4',
    borderColor: '#0288D1',
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'column',
    minWidth: 120,
    padding: 10,
    paddingBottom: 0,
  },
  line: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    color: '#B3E5FC',
    fontFamily: 'Verdana',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    textAlign: 'center',
  },
  value: {
    color: 'white',
    fontFamily: 'Verdana',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
