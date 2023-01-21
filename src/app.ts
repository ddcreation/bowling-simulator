import { game1 } from './mocks';
import { Game } from './models/game';
import { askForPlayers } from './utils';

export const visualize = async () => {
  const game = new Game(game1);

  console.log('Results of the game:');
  game.printBoard();
};

visualize();

export const play = async () => {
  const players = await askForPlayers();

  const game = new Game(
    players.map((name: string) => {
      return { name, frames: [] };
    })
  );

  game.printBoard();
};

// play();
