import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Reservations } from './reservations.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forFeature([
      Reservations
    ])
  ],
  providers: [ReservationsService],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
