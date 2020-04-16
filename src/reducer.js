import { clear10, generateTiles, isHasMove, moveCell } from './game-logic';

export const CHECK_GAME_OVER = 'CHECK_GAME_OVER';
export const LOAD_GAME = 'LOAD_GAME';
export const MOVE_CELL = 'MOVE_CELL';
export const NEW_GAME = 'NEW_GAME';

export const initialState = {
  isGameOver: false,
  record: 0,
  score: 0,
  tiles: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case CHECK_GAME_OVER:
      return {
        ...state,
        isGameOver: !isHasMove(state.tiles),
        tiles: clear10(state.tiles),
      };

    case LOAD_GAME:
      return {
        ...state,
        ...action.payload,
      };

    case MOVE_CELL: {
      const tiles = moveCell(state.tiles, action.payload.direction, action.payload.tile);
      let score = state.score;

      tiles.forEach(tile => {
        if (tile.value === 10) {
          score += 1;
        }
      });

      return {
        ...state,
        record: score > state.record ? score : state.record,
        score,
        tiles,
      };
    }

    case NEW_GAME:
      return {
        ...state,
        isGameOver: false,
        score: 0,
        tiles: generateTiles(),
      };
  }
}
