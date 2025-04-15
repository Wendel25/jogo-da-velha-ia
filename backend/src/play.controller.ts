import { Controller, Post, Body, Get } from '@nestjs/common';
import { PlayService } from 'src/play.service';

@Controller()
export class PlayController {
  constructor(private readonly playService: PlayService) { }

  @Post('play')
  async playMove(@Body() body: { posicao: number }) {
    const playResult = await this.playService.handlePlayerMove(body.posicao, 'X');
    return playResult;
  }

  @Get('board')
  async getGameBoard(): Promise<(string | null)[]> {
    return this.playService.getBoard();
  }

  @Post('new-game')
  async resetGame(): Promise<{ board: (string | null)[]; starter: string }> {
    const { board, starter } = this.playService.resetGame();
    return {
      board,
      starter,
    };
  }
}
