import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { BOARD_PADDING, CELL_MARGIN, CELL_SIZE } from '../config';

function getPosition(index) {
  return BOARD_PADDING + (index * (CELL_SIZE + CELL_MARGIN * 2) + CELL_MARGIN);
}

function getRowFromTile(tile) {
  return tile.mergedInto ? tile.mergedInto.row : tile.row;
}

function getColumnFromTile(tile) {
  return tile.mergedInto ? tile.mergedInto.column : tile.column;
}

function calculateOffset(tile, state) {
  const offset = {
    left: state.left,
    opacity: state.opacity,
    top: state.top,
  };

  if (tile.oldRow === -1 && !tile.mergedInto) {
    // is new tile
    Animated.timing(state.opacity, {
      duration: 100,
      toValue: 1,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.parallel([
      Animated.timing(offset.top, {
        duration: 100,
        toValue: getPosition(getRowFromTile(tile)),
        useNativeDriver: false,
      }),
      Animated.timing(offset.left, {
        duration: 100,
        toValue: getPosition(getColumnFromTile(tile)),
        useNativeDriver: false,
      }),
    ]).start();
  }
  return offset;
}

export default function Cell({ tile, onMoveCell }) {
  const [state, setState] = useState({
    left: new Animated.Value(getPosition(getColumnFromTile(tile))),
    opacity: new Animated.Value(0),
    startX: 0,
    startY: 0,
    top: new Animated.Value(getPosition(getRowFromTile(tile))),
  });

  function handleTouchStart(event) {
    setState({
      ...state,
      startX: event.nativeEvent.pageX,
      startY: event.nativeEvent.pageY,
    });
  }

  function handleTouchEnd(event) {
    const deltaX = event.nativeEvent.pageX - state.startX;
    const deltaY = event.nativeEvent.pageY - state.startY;

    // 0 -> left, 1 -> up, 2 -> right, 3 -> down

    let direction = -1;
    if (Math.abs(deltaX) > 3 * Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      direction = deltaX > 0 ? 2 : 0;
    } else if (Math.abs(deltaY) > 3 * Math.abs(deltaX) && Math.abs(deltaY) > 30) {
      direction = deltaY > 0 ? 3 : 1;
    }

    if (direction !== -1) {
      onMoveCell(direction, tile);
    }
  }

  const tileStyles = [styles.tile, styles[`tile${tile.value}`], calculateOffset(tile, state)];
  const highlightColor = highlightColors[tile.value];

  return (
    <Animated.View style={tileStyles} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <TouchableHighlight
        style={styles.touchStyle}
        underlayColor={highlightColor}
        onPress={() => {}}
      >
        <Text style={styles.value}>{tile.value}</Text>
      </TouchableHighlight>
    </Animated.View>
  );
}

const highlightColors = {
  1: 'rgba(235, 233, 211, 0.6)',
  2: 'rgba(235, 229, 176, 0.6)',
  3: 'rgba(235, 225, 137, 0.6)',
  4: 'rgba(235, 221, 98, 0.6)',
  5: 'rgba(235, 218, 68, 0.6)',
  6: 'rgba(235, 215, 39, 0.6)',
  7: 'rgba(233, 196, 33, 0.6)',
  8: 'rgba(231, 172, 25, 0.6)',
  9: 'rgba(229, 148, 17, 0.6)',
  10: 'rgba(245, 127, 23, 0.6)',
};

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    backgroundColor: '#0288D1',
    borderColor: '#0288D1',
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    height: CELL_SIZE,
    justifyContent: 'center',
    position: 'absolute',
    width: CELL_SIZE,
  },
  touchStyle: {
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    width: CELL_SIZE,
  },
  value: {
    borderRadius: 5,
    color: '#757575',
    fontFamily: 'Verdana',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  tile1: {
    backgroundColor: 'rgba(255, 253, 231, 1)',
  },
  tile2: {
    backgroundColor: 'rgba(255, 249, 196, 1)',
  },
  tile3: {
    backgroundColor: 'rgba(255, 245, 157, 1)',
  },
  tile4: {
    backgroundColor: 'rgba(255, 241, 118, 1)',
  },
  tile5: {
    backgroundColor: 'rgba(255, 238, 88, 1)',
  },
  tile6: {
    backgroundColor: 'rgba(255, 235, 59, 1)',
  },
  tile7: {
    backgroundColor: 'rgba(253, 216, 53, 1)',
  },
  tile8: {
    backgroundColor: 'rgba(251, 192, 45, 1)',
  },
  tile9: {
    backgroundColor: 'rgba(249, 168, 37, 1)',
  },
  tile10: {
    backgroundColor: 'rgba(245, 127, 23, 1)',
  },
});
