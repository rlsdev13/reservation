import { ReflectMetadataProvider } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Boardrooms } from '../boardroom/boardroom.entity';
import { Reservations } from '../reservations/reservations.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports : [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      cache : { enabled : false },
      metadataProvider : ReflectMetadataProvider,
      discovery : {
        disableDynamicFileAccess : true
      },
      entities : [
        Boardrooms,
        Reservations,
        Users
      ]
    }),
    PassportModule,
    MikroOrmModule.forFeature([
      Boardrooms,
      Reservations,
      Users
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService]
})
export class UsersModule {}
