import * as fs from 'fs';
import {
  printCongrats,
  printFormated,
  printTemplate,
  templateReplacement,
  templatesPath,
} from './template-manager';

jest.mock('fs');

const mockedFs = jest.mocked(fs);

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

describe('PrintTemplate', () => {
  const fakeTemplateName = 'fakeName';

  beforeAll(() => {
    mockedFs.readFileSync.mockImplementation(
      (template: fs.PathOrFileDescriptor) => `${template} template`
    );
  });

  it('Should read the template file', () => {
    printTemplate(fakeTemplateName);

    expect(mockedFs.readFileSync).toHaveBeenCalledWith(
      `${templatesPath}/board-${fakeTemplateName}.txt`,
      {
        encoding: 'utf8',
      }
    );
  });

  it('Should print the right template', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    printTemplate(fakeTemplateName);

    expect(consoleSpy).toHaveBeenCalledWith(
      `${templatesPath}/board-${fakeTemplateName}.txt template`
    );
  });

  it('Should print replacements', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const fakeReplacements = [
      { placeholder: '$test', value: 'fake', length: 18 },
    ];

    mockedFs.readFileSync.mockImplementationOnce(
      () => `Replacement |$test| template`
    );

    printTemplate(fakeTemplateName, fakeReplacements);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Replacement |fake              | template'
    );
  });
});

describe('PrintCongrats', () => {
  it('Should print congrats with name', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    printCongrats('Test');

    expect(consoleSpy).toHaveBeenCalledWith('Congrats to the winner "Test" 🎉');
  });
});

describe('Template replacement', () => {
  const stringReplacement = 'Input string with $test2 replacement $test1 ';

  it('Should return the input if no replacement', () => {
    const replace = templateReplacement(stringReplacement);

    expect(replace).toBe(stringReplacement);
  });

  it('Should return input with replaced placeholders', () => {
    const replace = templateReplacement(stringReplacement, [
      { placeholder: '$test1', value: 'fake', length: 4 },
      { placeholder: '$test2', value: 'wrong' },
    ]);

    expect(replace).toBe('Input string with wrong replacement fake ');
  });
});
