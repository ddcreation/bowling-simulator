import { Game } from './models/game';

export const init = () => {
  const game = new Game();

  game.printBoard();
};

init();
