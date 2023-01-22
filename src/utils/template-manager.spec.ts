import { printFormated } from './template-manager';

describe('Print formated', () => {
  it('Should return a sting with fix length', () => {
    const emptyString = printFormated('', 5);
    expect(emptyString).toBe('     ');

    const shortString = printFormated('A', 5);
    expect(shortString).toBe('A    ');
  });

  it('Should truncate long string', () => {
    const emptyString = printFormated('123456789', 5);
    expect(emptyString).toBe('12...');
  });

  it('Should return string when no length', () => {
    const emptyString = printFormated('123456789');
    expect(emptyString).toBe('123456789');
  });
});
