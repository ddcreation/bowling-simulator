import { Game } from './models/game';
import { askForPlayers } from './utils';

export const init = async () => {
  const players = await askForPlayers();

  const game = new Game(players);

  game.printBoard();
};

init();
