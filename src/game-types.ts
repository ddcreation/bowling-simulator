import { Game } from './models/game';
import { askForPlayers, askForRoll, printCongrats } from './utils';
import { game1 } from './mocks';
import { exit } from 'process';

export const playFrame = async (game: Game) => {
  const lastFrame = game.currentFrame === 10;
  const currentPlayer = game.currentPlayer;

  const bowl1 = await askForRoll(currentPlayer.name, game.currentFrame, 0);

  if (!lastFrame) {
    if (bowl1 === 10) {
      currentPlayer.frames.push([10, 0]);
    } else {
      const bowl2 = await askForRoll(currentPlayer.name, game.currentFrame, 1);
      currentPlayer.frames.push([bowl1, bowl2]);
    }
  } else {
    const bowl2 = await askForRoll(currentPlayer.name, game.currentFrame, 1);

    if (bowl1 + bowl2 >= 10) {
      const bowl3 = await askForRoll(currentPlayer.name, game.currentFrame, 2);
      currentPlayer.frames.push([bowl1, bowl2, bowl3]);
    } else {
      currentPlayer.frames.push([bowl1, bowl2]);
    }
  }
};

export const play = async () => {
  const players = await askForPlayers();

  const game = new Game(
    players.map((name: string) => {
      return { name, frames: [] };
    })
  );

  game.printBoard();

  while (game.currentFrame <= 10) {
    await playFrame(game);

    game.printBoard();
  }

  console.log('Final results of the game:');
  game.printBoard();
  printCongrats(game.bestPlayer);
  exit;
};

export const visualize = async () => {
  const game = new Game(game1);

  console.log('Results of the game:');
  game.printBoard();
  printCongrats(game.bestPlayer);
  exit;
};
