import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BoardroomController } from './boardroom.controller';
import { Boardrooms } from './boardroom.entity';
import { BoardroomService } from './boardroom.service';
import { Reservations } from '../reservations/reservations.entity';

@Module({
  imports : [
    MikroOrmModule.forFeature([
      Boardrooms,
      Reservations
    ])
  ],
  controllers: [BoardroomController],
  providers: [BoardroomService]
})
export class BoardroomModule {}
