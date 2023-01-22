import { init } from './app';
import { play, visualize } from './game-types';
import { askForGameType } from './utils';

jest.mock('./utils', () => ({
  askForGameType: jest.fn(),
}));

jest.mock('./game-types', () => ({
  play: jest.fn(),
  visualize: jest.fn(),
}));

const mockedAskGameType = jest.mocked(askForGameType);
const mockedVisualize = jest.mocked(visualize);
const mockedPlay = jest.mocked(play);

describe('Init', () => {
  it('Should ask for game type', async () => {
    await init();

    expect(mockedAskGameType).toHaveBeenCalledTimes(1);
  });

  describe('When game type is visualize', () => {
    beforeEach(() => {
      mockedAskGameType.mockImplementationOnce(() =>
        Promise.resolve('visualize')
      );
    });

    it('Should call VISUALIZE', async () => {
      await init();

      expect(mockedVisualize).toHaveBeenCalled();
    });
  });

  describe('When game type is PLAY', () => {
    beforeEach(() => {
      mockedAskGameType.mockImplementationOnce(() => Promise.resolve('play'));
    });

    it('Should call play', async () => {
      await init();

      expect(mockedPlay).toHaveBeenCalled();
    });
  });

  describe('When NO game type is choosed', () => {
    beforeEach(() => {
      mockedAskGameType.mockImplementationOnce(() => Promise.resolve('aaaaaa'));
    });

    it('Should NOT call any game type', async () => {
      await init();

      expect(mockedVisualize).not.toHaveBeenCalled();
      expect(mockedPlay).not.toHaveBeenCalled();
    });
  });
});
