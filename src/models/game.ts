import { frameScore, printTemplate, TemplateReplace } from '../utils';
import { Frame } from './frame.interface';
import { Player } from './player.interface';

export class Game {
  public players: Player[];

  public get currentFrame(): number {
    return this.players[this.players.length - 1].frames.length + 1;
  }

  public get currentPlayer(): Player {
    return (
      this.players.find(
        (player, i) => player.frames.length < this.players[i - 1]?.frames.length
      ) || this.players[0]
    );
  }

  constructor(players: Player[]) {
    this.players = players;
  }

  public printBoard(): void {
    printTemplate('header');

    this.players.forEach((player, idx) => {
      printTemplate('row', this._generateRowReplacements(player, idx));
    });
  }

  private _frameSymbols(frame: Frame, lastRound = false) {
    const symbols = [];

    // Symbol 1
    symbols.push(this._frameRollToSymbol(frame[0]));

    // Symbol 2
    // Strike case
    if (!lastRound && frame[0] === 10) {
      symbols.push('');
    } else {
      symbols.push(
        frame[0] !== 10 && frame[0] + frame[1] === 10
          ? '/'
          : this._frameRollToSymbol(frame[1])
      );
    }

    // Symbol 3
    if (frame[2] !== undefined) {
      symbols.push(
        frame[1] !== 10 && frame[1] + frame[2] === 10
          ? '/'
          : this._frameRollToSymbol(frame[2])
      );
    }

    return symbols;
  }

  private _frameRollToSymbol(pins: number): string {
    let symbol = '';

    if (pins === 10) {
      symbol = 'X';
    } else if (pins === 0) {
      symbol = '-';
    } else {
      symbol = pins.toString();
    }

    return symbol;
  }

  private _generateFrameReplacement(
    player: Player,
    frameIndex: number
  ): TemplateReplace[] {
    const replaceIndex = frameIndex + 1;
    const total = frameScore(player.frames, frameIndex)?.toString() || '';
    const symbols = player.frames[frameIndex]
      ? this._frameSymbols(player.frames[frameIndex], frameIndex === 9)
      : ['', '', ''];

    const replacements = [
      {
        placeholder: `$frame${replaceIndex}Total`,
        value: total,
        length: 2,
      },
      {
        placeholder: `$frame${replaceIndex}Symbol1`,
        value: symbols[0],
        length: 1,
      },
      {
        placeholder: `$frame${replaceIndex}Symbol2`,
        value: symbols[1],
        length: 1,
      },
    ];

    if (replaceIndex === 10) {
      replacements.push({
        placeholder: `$frame${replaceIndex}Symbol3`,
        value: symbols[2] || '',
        length: 1,
      });
    }

    return replacements;
  }

  private _generateFramesReplacements(player: Player): TemplateReplace[] {
    let replacements: TemplateReplace[] = [];
    let total = 0;

    for (let i = 0; i < 10; i++) {
      replacements = [
        ...replacements,
        ...this._generateFrameReplacement(player, i),
      ];

      total += frameScore(player.frames, i) || 0;
    }

    replacements.push({
      placeholder: '$total',
      value: total.toString(),
      length: 3,
    });

    return replacements;
  }

  private _generateRowReplacements(
    player: Player,
    index: number
  ): TemplateReplace[] {
    return [
      { placeholder: '$index', value: (index + 1).toString(), length: 1 },
      { placeholder: '$name', value: player.name, length: 27 },
      ...this._generateFramesReplacements(player),
    ];
  }
}
