import { exit } from 'process';
import { askForGameType } from './utils';
import { play, visualize } from './game-types';

export const init = async () => {
  const gameType = await askForGameType();

  switch (gameType) {
    default: {
      console.log('No game type choosed, bye bye...');
      break;
    }
    case 'visualize': {
      visualize();
      break;
    }
    case 'play': {
      play();
      break;
    }
  }

  exit;
};

init();
