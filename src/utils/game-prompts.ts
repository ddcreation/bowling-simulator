import prompts from 'prompts';

export const askForPlayers = async () => {
  const playersNameQuestion = await prompts<string>({
    type: 'text',
    name: 'players',
    initial: '',
    message: "What are the player's names? (comma separated): ",
    validate: (names: string) => {
      if (names === '') {
        return `We need at least 1 player!`;
      }

      if (names.split(',').length > 9) {
        return `9 players maximum`;
      }

      return true;
    },
  });

  return playersNameQuestion.players.split(',');
};
