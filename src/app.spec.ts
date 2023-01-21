import { init } from './app';
import { SayHello } from './utils';

jest.mock('./utils', () => {
  const original = jest.requireActual('./utils');
  return {
    ...original,
    SayHello: jest.fn(),
  };
});

describe('Init', () => {
  it('Should call SayHello', () => {
    init();

    expect(SayHello).toHaveBeenCalledTimes(1);
  });
});
