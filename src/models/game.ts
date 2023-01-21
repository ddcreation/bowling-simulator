import * as fs from 'fs';

export class Game {
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
