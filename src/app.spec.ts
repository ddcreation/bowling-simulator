import { init } from './app';
import { askForGameType } from './utils';

jest.mock('./utils', () => ({
  askForGameType: jest.fn(),
}));

jest.mock('./game-types', () => ({
  play: jest.fn(),
  visualize: jest.fn(),
}));

describe('Init', () => {
  it('Should ask for game type', async () => {
    await init();

    expect(askForGameType).toHaveBeenCalledTimes(1);
  });
});
