import {
  frameScore,
  isFrameOpened,
  isSpare,
  isStrike,
} from './score-calculators';

describe('The isFrameOpened function', () => {
  it('Should return false for spare', () => {
    expect(isFrameOpened([2, 8])).toBe(false);
  });

  it('Should return false for strike', () => {
    expect(isFrameOpened([10, 0])).toBe(false);
  });

  it('Should return true for others', () => {
    expect(isFrameOpened([8, 1])).toBe(true);
  });
});

describe('The isSpare function', () => {
  it('Should return true for spare', () => {
    expect(isSpare([5, 5])).toBe(true);
  });

  it('Should return false for strike', () => {
    expect(isSpare([10, 0])).toBe(false);
  });

  it('Should return false for others', () => {
    expect(isSpare([8, 1])).toBe(false);
  });
});

describe('The isStrike function', () => {
  it('Should return true for strike', () => {
    expect(isStrike([10, 0])).toBe(true);
  });

  it('Should return false for spare', () => {
    expect(isStrike([7, 3])).toBe(false);
  });

  it('Should return false for others', () => {
    expect(isStrike([6, 0])).toBe(false);
  });
});

describe('The frameScore function', () => {
  it('Should return undefined if current frame is not played', () => {
    expect(frameScore([[4, 3]], 1)).toBeUndefined();
  });

  it('Should return undefined if current frame is a strike/spare and the next frame is not played', () => {
    expect(
      frameScore(
        [
          [2, 8],
          [10, 0],
        ],
        1
      )
    ).toBeUndefined();
  });

  it('Should return the score when spare followed by another roll', () => {
    expect(
      frameScore(
        [
          [8, 2],
          [5, 3],
        ],
        0
      )
    ).toBe(15);
  });

  describe('When a strike is done', () => {
    it('Should return undefined when there is no more roll', () => {
      expect(frameScore([[10, 0]], 0)).toBeUndefined();
    });

    it('Should return undefined when there is a new strike', () => {
      expect(
        frameScore(
          [
            [10, 0],
            [10, 0],
          ],
          0
        )
      ).toBeUndefined();
    });

    it('Should return the score when there is a two more strike', () => {
      expect(
        frameScore(
          [
            [10, 0],
            [10, 0],
            [10, 0],
          ],
          0
        )
      ).toBe(30);
    });

    it('Should return the score when there is a two more rolls', () => {
      expect(
        frameScore(
          [
            [10, 0],
            [8, 1],
          ],
          0
        )
      ).toBe(19);
    });

    it('FIX: specific round 9', () => {
      expect(
        frameScore(
          [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [10, 0],
            [10, 5, 3],
          ],
          8
        )
      ).toBe(30);
    });
  });

  describe('When we are on the last frame', () => {
    it('Should return cumulative score', () => {
      expect(
        frameScore(
          [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [5, 5, 3],
          ],
          9
        )
      ).toBe(13);
    });
  });
});
