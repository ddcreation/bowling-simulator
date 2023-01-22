import { Game } from './models';
import { play, playFrame, visualize } from './game-types';
import { askForPlayers, askForRoll } from './utils';

jest.mock('./utils', () => ({
  askForPlayers: jest.fn(() =>
    Promise.resolve([
      { name: 'Test1', frames: [] },
      { name: 'Test2', frames: [] },
    ])
  ),
  askForRoll: jest.fn((number: number) => number),
  frameScore: jest.fn(),
  printCongrats: jest.fn(),
  printTemplate: jest.fn(),
}));

const mockedAskForRoll = jest.mocked(askForRoll);

describe('Play', () => {
  it('Should ask for players', async () => {
    await play();

    expect(askForPlayers).toHaveBeenCalledTimes(1);
  });

  it('Should print game board on each input', async () => {
    const printBoardSpy = jest.spyOn(Game.prototype, 'printBoard');

    await play();

    expect(printBoardSpy).toHaveBeenCalledTimes(22);
  });
});

describe('Visualize', () => {
  it('Should print game board', async () => {
    const printBoardSpy = jest.spyOn(Game.prototype, 'printBoard');

    visualize();

    expect(printBoardSpy).toHaveBeenCalledTimes(1);
  });
});

describe('Play a frame', () => {
  let game: Game;
  beforeEach(() => {
    game = new Game([
      { name: 'Test1', frames: [] },
      { name: 'Test2', frames: [] },
    ]);
  });

  describe('When on a normal frame', () => {
    beforeEach(() => {
      game = new Game([
        { name: 'Test1', frames: [] },
        { name: 'Test2', frames: [] },
      ]);
    });

    it('Should ask only one roll if strike', async () => {
      mockedAskForRoll.mockImplementationOnce(() => Promise.resolve(10));

      await playFrame(game);

      expect(mockedAskForRoll).toHaveBeenCalledTimes(1);
    });

    it('Should ask for two rolls if NO strike', async () => {
      mockedAskForRoll.mockImplementationOnce(() => Promise.resolve(8));

      await playFrame(game);

      expect(mockedAskForRoll).toHaveBeenCalledTimes(2);
    });
  });

  describe('When on the final frame', () => {
    beforeEach(() => {
      game = new Game([
        {
          name: 'Test1',
          frames: [
            [10, 0],
            [10, 0],
            [10, 0],
            [10, 0],
            [10, 0],
            [10, 0],
            [10, 0],
            [10, 0],
            [10, 0],
          ],
        },
        {
          name: 'Test2',
          frames: [
            [8, 0],
            [9, 1],
            [9, 1],
            [9, 1],
            [9, 1],
            [9, 1],
            [9, 1],
            [9, 1],
            [9, 1],
          ],
        },
      ]);
    });

    it('Should ask for 3 rolls if strike', async () => {
      mockedAskForRoll.mockImplementation(() => Promise.resolve(10));

      await playFrame(game);

      expect(mockedAskForRoll).toHaveBeenCalledTimes(3);
    });

    it('Should ask for 3 rolls if SPARE', async () => {
      mockedAskForRoll.mockImplementation(() => Promise.resolve(5));

      await playFrame(game);

      expect(mockedAskForRoll).toHaveBeenCalledTimes(3);
    });

    it('Should ask for 2 rolls if NO STRIKE/SPARE', async () => {
      mockedAskForRoll.mockImplementation(() => Promise.resolve(4));

      await playFrame(game);

      expect(mockedAskForRoll).toHaveBeenCalledTimes(2);
    });
  });

  it('Should add the frame to player', async () => {
    mockedAskForRoll.mockImplementation(() => Promise.resolve(5));

    await playFrame(game);

    expect(game.players[0].frames.length).toBe(1);
  });
});
