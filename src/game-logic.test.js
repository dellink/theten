import { tiles } from '../mocks';
import { generateTiles, isHasMove } from './game-logic';

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
});
