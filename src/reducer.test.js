import { tiles } from '../mocks';
import { CHECK_GAME_OVER, LOAD_GAME, initialState, reducer } from './reducer';

describe(reducer.name, () => {
  it(`${reducer.name} should handle ${CHECK_GAME_OVER}`, () => {
    const state = {
      ...initialState,
      tiles: tiles,
    };
    expect(
      reducer(state, {
        type: CHECK_GAME_OVER,
      }),
    ).toEqual(state);
  });

  it(`${reducer.name} should handle ${CHECK_GAME_OVER} and set isGameOver === true`, () => {
    const state = {
      ...initialState,
      tiles: tiles.map(tile => ({ ...tile, value: 6 })),
    };
    expect(
      reducer(state, {
        type: CHECK_GAME_OVER,
      }).isGameOver,
    ).toBeTruthy();
  });

  it(`${reducer.name} should handle ${CHECK_GAME_OVER} and clear 10's tiles`, () => {
    const state = {
      ...initialState,
      tiles: tiles,
    };
    state.tiles[0].value = 10;
    const res = reducer(state, { type: CHECK_GAME_OVER });

    expect(res.tiles.length).toEqual(tiles.length + 1);
    expect(res.tiles[0].mergedInto).not.toBeNull();
    expect(res.tiles[0].mergedInto).toEqual(res.tiles[tiles.length]);
  });

  it(`${reducer.name} should handle ${LOAD_GAME}`, () => {
    const res = reducer(initialState, {
      type: LOAD_GAME,
      payload: {
        isGameOver: false,
        record: 999,
        score: 10,
        tiles: tiles,
      },
    });

    expect(res.tiles).toEqual(tiles);
    expect(res.record).toEqual(999);
    expect(res.score).toEqual(10);
  });
});
