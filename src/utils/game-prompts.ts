import prompts from 'prompts';

export const askForRoll = async (
  playerName: string,
  frame: number,
  roll: 0 | 1 | 2,
  previousRoll = 0
): Promise<number> => {
  const rollQuestion = await prompts<string>({
    type: 'number',
    name: 'roll',
    initial: '',
    message: `Player ${playerName}, Frame ${frame}, Roll ${roll + 1}:`,
  });

  const result = Number(rollQuestion.roll);

  if (
    result > 10 ||
    (roll === 1 && previousRoll < 10 && previousRoll + result > 10)
  ) {
    console.warn("There's only 10 pins!!!");
    return askForRoll(playerName, frame, roll, previousRoll);
  } else if (result < 0) {
    console.warn('How you could fall a negative number of pins?');
    return askForRoll(playerName, frame, roll, previousRoll);
  }

  return result;
};

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
