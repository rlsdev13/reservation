import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReflectMetadataProvider } from '@mikro-orm/core';
import { PassportModule } from '@nestjs/passport';
import { BoardroomController } from './boardroom.controller';
import { BoardroomService } from './boardroom.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { Users } from '../users/users.entity';
import { Boardrooms } from './boardroom.entity';
import { Reservations } from '../reservations/reservations.entity';

@Module({
  imports : [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      cache : { 
        enabled : false 
      },
      entities : [
        Boardrooms,
        Reservations,
        Users
      ],
      metadataProvider : ReflectMetadataProvider,
      discovery : {
        disableDynamicFileAccess : true
      }
    }),
    UsersModule,
    PassportModule,
    MikroOrmModule.forFeature([
      Boardrooms,
      Reservations,
      Users
    ])
  ],
  controllers: [BoardroomController],
  providers: [BoardroomService, JwtStrategy],
  exports: [BoardroomService]
})
export class BoardroomModule {}
