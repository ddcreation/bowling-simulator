import { Game } from './game';

describe('Game', () => {
  describe('When the board is printed', () => {
    const game = new Game();

    it('Should print header and body', () => {
      const printHeaderSpy = jest.spyOn(game, '_printHeader' as any);
      const printBodySpy = jest.spyOn(game, '_printBody' as any);

      game.printBoard();

      expect(printHeaderSpy).toHaveBeenCalledTimes(1);
      expect(printBodySpy).toHaveBeenCalledTimes(1);
    });
  });
});
