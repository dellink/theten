import { tiles } from '../mocks';
import { clear10, generateTiles, isHasMove, moveCell } from './game-logic';

describe('game logic', () => {
  it(`${generateTiles.name} should generate tiles`, () => {
    expect(generateTiles().length).toBe(16);
  });

  it(`${isHasMove.name} should check possibility of move`, () => {
    expect(isHasMove(tiles)).toBeTruthy();
    expect(
      isHasMove(
        tiles.map(tile => ({
          ...tile,
          value: 6,
        })),
      ),
    ).toBeFalsy();
  });

  it(`${clear10.name} should clear 10's tiles`, () => {
    const data = tiles.map(tile => ({ ...tile }));
    data[0].value = 10;
    const res = clear10(data);

    expect(res.length).toBe(tiles.length + 1);
    expect(res[0].mergedInto).not.toBeNull();
  });

  it(`${moveCell.name} should move a tile left`, () => {
    const sourceTiles = tiles.map(tile => ({ ...tile }));
    const res = moveCell(sourceTiles, 0, tiles[3]);

    expect(res[2].mergedInto).not.toBeNull();
    expect(res[2].mergedInto.value).toEqual(sourceTiles[2].value + sourceTiles[3].value);
    expect(res[2].mergedInto).toEqual(res[3].mergedInto);
  });

  it(`${moveCell.name} should move a tile up`, () => {
    const sourceTiles = tiles.map(tile => ({ ...tile }));
    const res = moveCell(sourceTiles, 1, tiles[6]);

    expect(res[2].mergedInto).not.toBeNull();
    expect(res[2].mergedInto.value).toEqual(sourceTiles[2].value + sourceTiles[6].value);
    expect(res[2].mergedInto).toEqual(res[6].mergedInto);
  });

  it(`${moveCell.name} should move a tile right`, () => {
    const sourceTiles = tiles.map(tile => ({ ...tile }));
    const res = moveCell(sourceTiles, 2, tiles[6]);

    expect(res[6].mergedInto).not.toBeNull();
    expect(res[6].mergedInto.value).toEqual(sourceTiles[6].value + sourceTiles[7].value);
    expect(res[6].mergedInto).toEqual(res[7].mergedInto);
  });

  it(`${moveCell.name} should move a tile down`, () => {
    const sourceTiles = tiles.map(tile => ({ ...tile }));
    const res = moveCell(sourceTiles, 3, tiles[6]);

    expect(res[6].mergedInto).not.toBeNull();
    expect(res[6].mergedInto.value).toEqual(sourceTiles[6].value + sourceTiles[10].value);
    expect(res[6].mergedInto).toEqual(res[10].mergedInto);
  });
});
