import { fakePlayers } from '../mocks';
import { printTemplate } from '../utils';
import { Game } from './game';

jest.mock('../utils', () => ({
  frameScore: jest.fn(),
  printTemplate: jest.fn(),
}));

describe('Game', () => {
  describe('When initialized', () => {
    it('Should set passed players', () => {
      const game = new Game(fakePlayers);

      expect(game.players.length).toBe(fakePlayers.length);
      expect(game.players).toEqual(fakePlayers);
    });
  });

  describe('When the board is printed', () => {
    const game = new Game(fakePlayers);

    it('Should print header and a row by player', () => {
      game.printBoard();

      expect(printTemplate).toHaveBeenCalledTimes(1 + fakePlayers.length);
    });
  });
});
