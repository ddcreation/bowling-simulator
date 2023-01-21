import * as fs from 'fs';
import { printFormated } from '../utils';
import { Player } from './player.interface';

const templatesPath = `${__dirname}/../templates`;

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

    const replacements = [
      { placeholder: '$index', value: (index + 1).toString(), length: 1 },
      { placeholder: '$name', value: player.name, length: 27 },
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
