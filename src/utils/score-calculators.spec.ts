import { Frame } from '../models';
import { frameScore, isFrameClosed } from './score-calculators';

const emptyFrames: Frame[] = [];
const spare: Frame[] = [
  [2, 8],
  [10, 0],
];

const strikes: Frame[] = [
  [10, 0],
  [10, 0],
  [10, 0],
];

const normalPlay: Frame[] = [
  [8, 1],
  [10, 0],
  [10, 0],
];

describe('The isFrameClosed function', () => {
  it('Should return false for spare', () => {
    expect(isFrameClosed(spare[0])).toBe(false);
  });

  it('Should return false for strike', () => {
    expect(isFrameClosed(strikes[0])).toBe(false);
  });

  it('Should return true for others', () => {
    expect(isFrameClosed(normalPlay[0])).toBe(true);
  });
});

describe('The frameScore function', () => {
  it('Should return undefined if current frame is not played', () => {
    expect(frameScore(emptyFrames, 1)).toBeUndefined();
  });

  it('Should return undefined if current frame is a strike/spare and the next frame is not played', () => {
    expect(frameScore(spare, 1)).toBeUndefined();
  });
});
