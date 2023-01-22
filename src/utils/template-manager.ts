import * as fs from 'fs';

const templatesPath = `${__dirname}/../templates`;

export interface TemplateReplace {
  placeholder: string;
  value: string;
  length?: number;
}

export const printFormated = (text: string, length?: number): string => {
  let formatedText = text;

  if (length) {
    if (text.length < length) {
      formatedText = text.padEnd(length, ' ');
    } else if (text.length > length) {
      formatedText = text.substring(0, length - 3) + '...';
    }
  }

  return formatedText;
};

export const printTemplate = (
  templateName: string,
  replacements: TemplateReplace[] = []
): void => {
  const template = fs.readFileSync(
    `${templatesPath}/board-${templateName}.txt`,
    {
      encoding: 'utf8',
    }
  );

  const output = templateReplacement(template, replacements);
  console.log(output);
};

export const printCongrats = (playerName: string): void => {
  console.log(`Congrats to the winner "${playerName}" 🎉`);
};

const templateReplacement = (
  rawTemplate: string,
  replacements: TemplateReplace[]
): string => {
  return replacements.reduce((output, config) => {
    return output.replace(
      config.placeholder,
      printFormated(config.value, config.length)
    );
  }, rawTemplate);
};
