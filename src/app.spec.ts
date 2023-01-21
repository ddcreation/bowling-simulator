import { init } from './app';
import { Game } from './models';

describe('Init', () => {
  it('Should print game board', () => {
    const printBoardSpy = jest.spyOn(Game.prototype, 'printBoard');

    init();

    expect(printBoardSpy).toHaveBeenCalledTimes(1);
  });
});
