import { Frame } from '../models';

export const isFrameClosed = (frame: Frame): boolean => {
  const frameScore = frame[0] + frame[1];
  return frameScore < 10;
};

export const frameScore = (
  frames: Frame[],
  frameIndex: number
): number | undefined => {
  let score = undefined;
  if (frames[frameIndex] !== undefined) {
    const currentScore = frames[frameIndex][0] + frames[frameIndex][1];

    if (isFrameClosed(frames[frameIndex])) {
      score = currentScore;
    }
  }

  return score;
};
