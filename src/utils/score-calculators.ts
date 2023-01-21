import { Frame } from '../models';

export const isFrameClosed = (frame: Frame): boolean => {
  const frameScore = frame[0] + frame[1];
  return frameScore < 10;
};

export const isSpare = (frame: Frame): boolean => {
  const frameScore = frame[0] + frame[1];
  return frameScore === 10 && frame[0] !== 10;
};

export const isStrike = (frame: Frame): boolean => {
  return frame[0] === 10;
};

export const frameScore = (
  frames: Frame[],
  frameIndex: number
): number | undefined => {
  let score = undefined;
  if (frames[frameIndex] !== undefined) {
    const currentScore = frames[frameIndex][0] + frames[frameIndex][1];

    // 10th Frame
    if (frameIndex === 9) {
      score = currentScore + frames[frameIndex][2] || 0;
    }
    // No spare, no strike... Try again!
    else if (isFrameClosed(frames[frameIndex])) {
      score = currentScore;
    }
    // Spare and next roll
    else if (isSpare(frames[frameIndex]) && frames[frameIndex + 1]) {
      score = 10 + frames[frameIndex + 1][0];
    }
    // Strike !!!
    else if (isStrike(frames[frameIndex])) {
      if (frames[frameIndex + 1]) {
        if (!isStrike(frames[frameIndex + 1])) {
          score = 10 + frames[frameIndex + 1][0] + frames[frameIndex + 1][1];
        }
        // Second strike in a row !!!!!
        else if (frames[frameIndex + 2]) {
          score = 10 + 10 + frames[frameIndex + 2][0];
        }
      }
    }
  }

  return score;
};
