import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BoardroomController } from './boardroom.controller';
import { Boardrooms } from './boardroom.entity';
import { BoardroomService } from './boardroom.service';
import { Reservations } from '../reservations/reservations.entity';
import { ReflectMetadataProvider } from '@mikro-orm/core';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports : [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      cache : { enabled : false },
      metadataProvider : ReflectMetadataProvider,
      discovery : {
        disableDynamicFileAccess : true
      }
    }),
    MikroOrmModule.forFeature([
      Boardrooms,
      Reservations
    ]),
    PassportModule,
    UsersModule
  ],
  controllers: [BoardroomController],
  providers: [BoardroomService, JwtStrategy]
})
export class BoardroomModule {}
