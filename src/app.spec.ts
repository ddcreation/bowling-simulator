import { init } from './app';
import { Game } from './models';

jest.mock('./utils', () => ({
  askForPlayers: jest.fn(() => Promise.resolve(['Player1', 'Player2'])),
  printFormated: jest.fn((text) => text),
}));

describe('Init', () => {
  it('Should print game board', async () => {
    const printBoardSpy = jest.spyOn(Game.prototype, 'printBoard');

    await init();

    expect(printBoardSpy).toHaveBeenCalledTimes(1);
  });
});
