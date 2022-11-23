import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { ReflectMetadataProvider } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservations } from './reservations.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      cache : { enabled : false },
      metadataProvider : ReflectMetadataProvider,
      discovery : {
        disableDynamicFileAccess : true
      }
    }),
    MikroOrmModule.forFeature([
      Reservations
    ]),
    PassportModule,
    UsersModule
  ],
  providers: [ReservationsService, JwtStrategy],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
