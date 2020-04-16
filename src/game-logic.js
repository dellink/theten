import 'react-native-get-random-values';

import { nanoid } from 'nanoid';
import { BOARD_SIZE } from './config';

export function isHasMove(tiles) {
  const row = [];
  for (let i = 0; i < BOARD_SIZE; ++i) {
    row.push(null);
  }
  const board = [];
  for (let i = 0; i < BOARD_SIZE; ++i) {
    board.push([...row]);
  }
  tiles.forEach(tile => {
    if (tile.mergedInto === null) {
      board[tile.row][tile.column] = tile.value === 10 ? 1 : tile.value;
    }
  });
  let hasMove = false;
  for (let i = 0; i < BOARD_SIZE && !hasMove; ++i) {
    for (let j = 0; j < BOARD_SIZE && !hasMove; ++j) {
      if (i + 1 < BOARD_SIZE) {
        // not last row
        if (board[i][j] + board[i + 1][j] <= 10) {
          hasMove = true;
        }
      }
      if (j + 1 < BOARD_SIZE) {
        // not last column
        if (board[i][j] + board[i][j + 1] <= 10) {
          hasMove = true;
        }
      }
    }
  }
  return hasMove;
}

export function generateTiles() {
  const tiles = [];
  for (let i = 0; i < BOARD_SIZE; ++i) {
    for (let j = 0; j < BOARD_SIZE; ++j) {
      const tile = getRandomTile();
      tile.row = i;
      tile.column = j;
      tiles.push(tile);
    }
  }
  return tiles;
}

let tileStorage = [];

function getRandomTile() {
  if (tileStorage.length === 0) {
    const tiles = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
    tileStorage = tiles.sort(() => 0.5 - Math.random());
  }

  const index = Math.floor(Math.random() * tileStorage.length);
  const value = tileStorage[index];

  tileStorage.splice(index, 1);
  return getTile(value);
}

export function moveCell(storeTiles, direction, tileSource) {
  let tiles = storeTiles.filter(tile => tile.mergedInto === null);
  // 0 -> left, 1 -> up, 2 -> right, 3 -> down
  if (direction === 0) {
    tiles = moveLeft(tiles, tileSource);
  } else if (direction === 1) {
    tiles = moveUp(tiles, tileSource);
  } else if (direction === 2) {
    tiles = moveRight(tiles, tileSource);
  } else if (direction === 3) {
    tiles = moveDown(tiles, tileSource);
  }
  return tiles;
}

function moveLeft(storeTiles, tile) {
  let tiles = [...storeTiles];
  const index1 = getTileIndexByRowColumn(tiles, tile.row, tile.column);
  const index2 = getTileIndexByRowColumn(tiles, tile.row, tile.column - 1);

  if (!isAvailableMoving(tiles, index1, index2)) {
    return tiles;
  }

  tiles = moveTile(tiles, index1, index2);

  for (let index = tile.column; index < BOARD_SIZE; ++index) {
    const row = tile.row;
    const column = index;
    const movedIndex = getTileIndexByRowColumn(tiles, row, index + 1);
    tiles = fillTiles(tiles, row, column, movedIndex);
  }

  return tiles;
}

function moveUp(storeTiles, tile) {
  let tiles = [...storeTiles];
  const index1 = getTileIndexByRowColumn(tiles, tile.row, tile.column);
  const index2 = getTileIndexByRowColumn(tiles, tile.row - 1, tile.column);

  if (!isAvailableMoving(tiles, index1, index2)) {
    return tiles;
  }

  tiles = moveTile(tiles, index1, index2);

  for (let index = tile.row; index < BOARD_SIZE; ++index) {
    const row = index;
    const column = tile.column;
    const movedIndex = getTileIndexByRowColumn(tiles, index + 1, column);
    tiles = fillTiles(tiles, row, column, movedIndex);
  }
  return [...tiles];
}

function moveRight(storeTiles, tile) {
  let tiles = [...storeTiles];
  const index1 = getTileIndexByRowColumn(tiles, tile.row, tile.column);
  const index2 = getTileIndexByRowColumn(tiles, tile.row, tile.column + 1);

  if (!isAvailableMoving(tiles, index1, index2)) {
    return tiles;
  }

  tiles = moveTile(tiles, index1, index2);

  for (let index = tile.column; index >= 0; --index) {
    const row = tile.row;
    const column = index;
    const movedIndex = getTileIndexByRowColumn(tiles, row, index - 1);
    tiles = fillTiles(tiles, row, column, movedIndex);
  }
  return [...tiles];
}

function moveDown(storeTiles, tile) {
  let tiles = [...storeTiles];
  const index1 = getTileIndexByRowColumn(tiles, tile.row, tile.column);
  const index2 = getTileIndexByRowColumn(tiles, tile.row + 1, tile.column);

  if (!isAvailableMoving(tiles, index1, index2)) {
    return tiles;
  }

  tiles = moveTile(tiles, index1, index2);

  for (let index = tile.row; index >= 0; --index) {
    const row = index;
    const column = tile.column;
    const movedIndex = getTileIndexByRowColumn(tiles, index - 1, column);
    tiles = fillTiles(tiles, row, column, movedIndex);
  }
  return [...tiles];
}

function getTileIndexByRowColumn(tiles, row, column) {
  return tiles.findIndex(
    tile => tile.mergedInto === null && tile.row === row && tile.column === column,
  );
}

function isAvailableMoving(tiles, index1, index2) {
  if (index2 === -1) {
    return false;
  }
  const tile1 = tiles[index1];
  const tile2 = tiles[index2];
  if (tile1.value + tile2.value > 10) {
    return false;
  }
  return true;
}

function getTargetTile(tile1, tile2) {
  const targetTile = getTile(tile1.value + tile2.value);
  targetTile.row = tile2.row;
  targetTile.column = tile2.column;
  return targetTile;
}

function moveTile(sourceTiles, index1, index2) {
  const tiles = [...sourceTiles];
  const tile1 = { ...tiles[index1] };
  const tile2 = { ...tiles[index2] };
  const targetTile = getTargetTile(tile1, tile2);

  tile1.mergedInto = targetTile;
  tile2.mergedInto = targetTile;

  tiles.push(targetTile);
  tiles[index1] = tile1;
  tiles[index2] = tile2;

  return tiles;
}

function fillTiles(sourceTiles, row, column, movedIndex) {
  const tiles = [...sourceTiles];
  const movedTile = tiles[movedIndex];
  if (movedTile) {
    const newTile = getTile(movedTile.value);
    newTile.row = row;
    newTile.column = column;
    tiles.push(newTile);
    tiles[movedIndex] = {
      ...movedTile,
      mergedInto: newTile,
    };
  } else {
    tiles.push({
      ...getRandomTile(),
      row,
      column,
    });
  }
  return tiles;
}

function getTile(value) {
  return {
    value,
    row: -1,
    column: -1,
    oldRow: -1,
    mergedInto: null,
    id: nanoid(),
  };
}

export function clear10(storeTiles) {
  const tiles = [...storeTiles];

  tiles.forEach((tile, index) => {
    if (tile.value === 10) {
      const targetTile = getTile(1);
      targetTile.row = tile.row;
      targetTile.column = tile.column;
      tiles[index] = {
        ...tiles[index],
        mergedInto: targetTile,
      };
      tiles.push(targetTile);
    }
  });

  return tiles;
}
