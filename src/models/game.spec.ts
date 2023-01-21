import { Game } from './game';

describe('Game', () => {
  describe('When initialized', () => {
    it('Should set passed players', () => {
      const game = new Game(['Jon', 'Who', 'Why']);

      expect(game.players.length).toBe(3);
      expect(game.players).toEqual([
        { frames: [], name: 'Jon' },
        { frames: [], name: 'Who' },
        { frames: [], name: 'Why' },
      ]);
    });
  });

  describe('When the board is printed', () => {
    const game = new Game(['Jon', 'Who']);

    it('Should print header and body', () => {
      const printHeaderSpy = jest.spyOn(game, '_printHeader' as any);
      const printBodySpy = jest.spyOn(game, '_printBody' as any);

      game.printBoard();

      expect(printHeaderSpy).toHaveBeenCalledTimes(1);
      expect(printBodySpy).toHaveBeenCalledTimes(1);
    });
  });
});
