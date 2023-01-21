import * as fs from 'fs';
import { Player } from './player.interface';

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
    console.log('content');
  }

  private _printHeader(): void {
    const header = fs.readFileSync(
      `${__dirname}/../templates/board-header.txt`,
      { encoding: 'utf8' }
    );
    console.log(header);
  }
}
