import prompts from 'prompts';

export const askForGameType = async () => {
  const gameTypeQuestion = await prompts<string>({
    type: 'text',
    name: 'type',
    initial: '',
    message: 'What do you want to do? (play/visualize): ',
  });

  return gameTypeQuestion.type;
};

export const askForPlayers = async () => {
  let i = 1;
  const players = [];

  while (i < 10) {
    const playerNameQuestion = await prompts<string>({
      type: 'text',
      name: 'name',
      initial: '',
      message: `Enter name of player ${i}:`,
    });

    if (playerNameQuestion.name.length === 0) {
      break;
    }

    players.push(playerNameQuestion.name);
    i++;
  }

  return players;
};
