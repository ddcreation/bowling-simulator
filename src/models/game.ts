import * as fs from 'fs';
import { frameScore, printFormated } from '../utils';
import { Frame } from './frame.interface';
import { Player } from './player.interface';

const templatesPath = `${__dirname}/../templates`;

interface TemplateReplace {
  placeholder: string;
  value: string;
  length?: number;
}

export class Game {
  public players: Player[];

  constructor(players: Player[]) {
    this.players = players;
  }

  public printBoard(): void {
    this._printHeader();
    this._printBody();
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

  private _printBody(): void {
    this.players.forEach((player, idx) => this._printRow(player, idx));
  }

  private _printHeader(): void {
    const header = fs.readFileSync(`${templatesPath}/board-header.txt`, {
      encoding: 'utf8',
    });
    console.log(header);
  }

  private _printRow(player: Player, index: number): void {
    const rowRaw = fs.readFileSync(`${templatesPath}/board-row.txt`, {
      encoding: 'utf8',
    });

    const replacements: TemplateReplace[] = [
      { placeholder: '$index', value: (index + 1).toString(), length: 1 },
      { placeholder: '$name', value: player.name, length: 27 },
      ...this._generateFramesReplacements(player),
    ];

    const row = replacements.reduce((output, config) => {
      return output.replace(
        config.placeholder,
        printFormated(config.value, config.length)
      );
    }, rowRaw);

    console.log(row);
  }
}
