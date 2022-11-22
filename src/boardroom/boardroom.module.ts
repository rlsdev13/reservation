import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BoardroomController } from './boardroom.controller';
import { Boardrooms } from './boardroom.entity';
import { BoardroomService } from './boardroom.service';

@Module({
  imports : [
    MikroOrmModule.forFeature([
      Boardrooms
    ])
  ],
  controllers: [BoardroomController],
  providers: [BoardroomService]
})
export class BoardroomModule {}
