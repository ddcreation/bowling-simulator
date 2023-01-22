import { Game } from './models';
import { play, visualize } from './game-types';
import { askForPlayers } from './utils';

jest.mock('./utils', () => ({
  askForPlayers: jest.fn(() =>
    Promise.resolve([
      { name: 'Test1', frames: [] },
      { name: 'Test2', frames: [] },
    ])
  ),
  askForRoll: jest.fn((number: number) => number.toString()),
  frameScore: jest.fn(),
  printTemplate: jest.fn(),
}));

describe('Play', () => {
  it('Should ask for players', async () => {
    await play();

    expect(askForPlayers).toHaveBeenCalledTimes(1);
  });

  it('Should print game board on each input', async () => {
    const printBoardSpy = jest.spyOn(Game.prototype, 'printBoard');

    await play();

    expect(printBoardSpy).toHaveBeenCalledTimes(22);
  });
});

describe('Visualize', () => {
  it('Should print game board', async () => {
    const printBoardSpy = jest.spyOn(Game.prototype, 'printBoard');

    visualize();

    expect(printBoardSpy).toHaveBeenCalledTimes(1);
  });
});
