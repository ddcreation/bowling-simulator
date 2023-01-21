import { fakePlayers } from '../mocks';
import { Game } from './game';

jest.mock('../utils', () => ({
  printFormated: jest.fn((text) => text),
  frameScore: jest.fn(),
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

    it('Should print header and body', () => {
      const printHeaderSpy = jest.spyOn(game, '_printHeader' as any);
      const printBodySpy = jest.spyOn(game, '_printBody' as any);

      game.printBoard();

      expect(printHeaderSpy).toHaveBeenCalledTimes(1);
      expect(printBodySpy).toHaveBeenCalledTimes(1);
    });
  });
});
