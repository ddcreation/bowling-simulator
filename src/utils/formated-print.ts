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
