import { tiles } from '../mocks';
import { clear10, generateTiles, isHasMove } from './game-logic';

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
});
