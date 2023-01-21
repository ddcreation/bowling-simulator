import { SayHello } from './hello';

jest;

describe('SayHello function', () => {
  it('Should log "Hello world"', () => {
    const logSpy = jest.spyOn(console, 'log');

    SayHello();

    expect(logSpy).toHaveBeenNthCalledWith(1, 'Hello world');
  });
});
