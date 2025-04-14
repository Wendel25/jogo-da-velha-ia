import { Module } from '@nestjs/common';
import { PlayService } from 'src/play.service';
import { PlayController } from 'src/play.controller';
import { IAService } from 'src/modules/ia/ia.service';

@Module({
  imports: [],
  controllers: [PlayController],
  providers: [PlayService, IAService],
})
export class AppModule {}
