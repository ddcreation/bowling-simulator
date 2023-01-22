import prompts from 'prompts';
import { askForRoll } from './game-prompts';
import * as gamePrompts from './game-prompts';

jest.mock('prompts');

const mockedPrompts = jest
  .mocked(prompts)
  .mockImplementation(() => Promise.resolve({ roll: '5' }));

describe('AskForRoll', () => {
  it('Should ask prompts with received parameters', async () => {
    await askForRoll('name', 5, 0);
    expect(mockedPrompts).toHaveBeenNthCalledWith(1, {
      type: 'number',
      name: 'roll',
      initial: '',
      message: 'Player name, Frame 5, Roll 1:',
    });
  });

  it('Should return the prompt input', async () => {
    mockedPrompts.mockImplementationOnce(() => Promise.resolve({ roll: '10' }));
    const result = await askForRoll('name', 5, 0);

    expect(result).toBe(10);
  });

  describe('When result is out of bounds', () => {
    beforeEach(() => {
      mockedPrompts.mockImplementationOnce(() =>
        Promise.resolve({ roll: '11' })
      );
    });

    it('Should warn user', async () => {
      const consoleSpy = jest.spyOn(console, 'warn');

      await askForRoll('name', 5, 0);

      expect(consoleSpy).toHaveBeenCalledWith("There's only 10 pins!!!");
    });

    it('Should ask again for the roll', async () => {
      const finalResult = await gamePrompts.askForRoll('name', 5, 0);

      expect(finalResult).toBe(5);
    });
  });

  describe('When second roll is out of bounds', () => {
    beforeEach(() => {
      mockedPrompts.mockImplementationOnce(() =>
        Promise.resolve({ roll: '6' })
      );
    });

    it('Should warn user', async () => {
      const consoleSpy = jest.spyOn(console, 'warn');

      await askForRoll('name', 5, 1, 5);

      expect(consoleSpy).toHaveBeenCalledWith("There's only 10 pins!!!");
    });

    it('Should ask again for the roll', async () => {
      const finalResult = await gamePrompts.askForRoll('name', 5, 1, 5);

      expect(finalResult).toBe(5);
    });
  });
});
