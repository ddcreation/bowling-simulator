import * as fs from 'fs';
import { printFormated } from '../utils';
import { Player } from './player.interface';

const templatesPath = `${__dirname}/../templates`;

interface TemplateReplace {
  placeholder: string;
  value: string;
  length?: number;
}

export class Game {
  public players: Player[];

  constructor(names: string[]) {
    this.players = names.map((name) => {
      return { name, frames: [] };
    });
  }

  public printBoard(): void {
    this._printHeader();
    this._printBody();
  }

  private _generateFrameReplacement(
    player: Player,
    frameIndex: number
  ): TemplateReplace[] {
    const replaceIndex = frameIndex + 1;
    let total = '';
    let symbol1 = '';
    let symbol2 = '';
    let symbol3 = '';

    const replacements = [
      {
        placeholder: `$frame${replaceIndex}Total`,
        value: total.toString(),
        length: 2,
      },
      {
        placeholder: `$frame${replaceIndex}Symbol1`,
        value: symbol1,
        length: 1,
      },
      {
        placeholder: `$frame${replaceIndex}Symbol2`,
        value: symbol2,
        length: 1,
      },
    ];

    if (replaceIndex === 10) {
      replacements.push({
        placeholder: `$frame${replaceIndex}Symbol3`,
        value: symbol3,
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
