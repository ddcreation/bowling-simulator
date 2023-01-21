import { Game } from './models';
import { play, visualize } from './game-types';

jest.mock('./utils', () => ({
  askForPlayers: jest.fn(() =>
    Promise.resolve([
      { name: 'Test1', frames: [] },
      { name: 'Test2', frames: [] },
    ])
  ),
  printFormated: jest.fn((text) => text),
  frameScore: jest.fn(),
}));

describe('Play', () => {
  it('Should print game board', async () => {
    const printBoardSpy = jest.spyOn(Game.prototype, 'printBoard');

    await play();

    expect(printBoardSpy).toHaveBeenCalledTimes(1);
  });
});

describe('Visualize', () => {
  it('Should print game board', async () => {
    const printBoardSpy = jest.spyOn(Game.prototype, 'printBoard');

    visualize();

    expect(printBoardSpy).toHaveBeenCalledTimes(1);
  });
});
